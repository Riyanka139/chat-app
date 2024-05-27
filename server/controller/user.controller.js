import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import validator from "validator";
import * as dotenv from 'dotenv';

dotenv.config();

const createToken = async (id) => {
    const key = process.env.SECRET;

    return jwt.sign({ id }, key, { expiresIn: '3d' });
}

class UserController{
    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
    
            let user = await userModel.findOne({ email });
    
            if (user) return res.status(400).json("User already register");
    
            if (!name || !email || !password) return res.status(400).json('All fields are requred!');
    
            if (!validator.isEmail(email)) return res.status(400).json('Email must be valid!');
    
            // if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong!");
    
            const salt = await bcrypt.genSalt(10);
    
            user = new userModel({ name, email, password });
            user.password = await bcrypt.hash(password, salt);
            await user.save();
    
            const token = await createToken(user._id);
    
            res.status(200).json({ _id: user._id, name, email, token });
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }

    async login(req, res){
        try {
            const {email,password} = req.body;

            const user = await userModel.findOne({ email });
            if(!user) return res.status(400).json("Invalid email!");

            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid) return res.status(400).json("Invalid password");

            const token = await createToken(user._id);
    
            res.status(200).json({email, name: user.name,_id: user._id, token });
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }

    async findUser(req, res){
        try {
            const userId = req.params.id;
            const user = await userModel.findById(userId);

            if(!user) return res.status(404).json('User not found');

            res.status(200).json({_id: user._id, name: user.name, email: user.email});
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }

    async getUsers(_req, res){
        try {
            const users = await userModel.find();

            res.status(200).json(users);
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }
}



export default new UserController();