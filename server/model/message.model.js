import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        chatId: String,
        senderId: String,
        text: String
    },
    {timestamps: true}
);

const messageModel = model('Message', messageSchema);

export default messageModel;