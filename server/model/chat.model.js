import { Schema, model } from "mongoose";

const chatSChema = new Schema(
    {
    members: Array
    },
    {timestamps: true}
);

const chatModel = model('Chat', chatSChema);

export default chatModel;