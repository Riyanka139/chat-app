import chatModel from "../model/chat.model.js";

class ChatController{
    async createChat(req, res){
        try {
            const {firstId, secondId} = req.body;

            let chat = await chatModel.findOne({
                members: {$all : [firstId, secondId]}
            });

            const newChat = new chatModel({members: [firstId, secondId]});

            chat = await newChat.save();

            res.status(200).json(chat);
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        } 
    }

    async findUserChats(req, res){
        const userId = req.params.id;
        try {
            const chats = await chatModel.find({
                members: {$in: [userId]}
            });

            res.status(200).json(chats);
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }

    async findChat(req, res){
        const {firstId, secondId} = req.params;

        try {
            const chat = await chatModel.findOne({
                members: {$all: [firstId, secondId]}
            });

            res.status(200).json(chat);
        } catch (error) {
            console.log(error, 'error');
            res.status(500).json(error);
        }
    }
}

export default new ChatController();