import express from "express";
import userRouter from './user.route.js';
import chatRouter from './chat.route.js';
import messageRouter from './message.route.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);

export default router;