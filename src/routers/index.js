import { Router } from 'express';
import authRouter from './auth.js';
import workRouter from './operationalWork.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/work', workRouter);

export default router;
