import messageModel from "../model/message.model.js";

class MessageController{
    async createMessage(req, res){
        try {
            const {chatId, senderId, text} = req.body;
            let message = new messageModel({chatId, senderId, text});
            message = await message.save();
            res.status(200).json(message);
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }

    async getMessage(req,res){
        try {
            const {chatId} = req.params;
            const message = await messageModel.find({chatId});
            res.status(200).json(message);
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }
}

export default new MessageController();