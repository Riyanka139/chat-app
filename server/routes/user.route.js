import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/:id', userController.findUser);
router.get('/', userController.getUsers);

export default router;