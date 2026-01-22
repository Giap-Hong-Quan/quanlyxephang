import express from 'express';
import authRouter from './authRotes.js';
import userRouter from './userRotes.js';
import deviceRouter from './deviceRoutes.js';
import serviceRouter from './serviceRoutes.js';

const router= express.Router();
router.use('/auth',authRouter)
router.use('/user',userRouter)
router.use('/device',deviceRouter)
router.use('/service',serviceRouter)
export default router;