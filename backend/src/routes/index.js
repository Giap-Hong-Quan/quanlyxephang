import express from 'express';
import authRouter from './authRotes.js';
import userRouter from './userRotes.js';

const router= express.Router();
router.use('/auth',authRouter)
router.use('/user',userRouter)
export default router;