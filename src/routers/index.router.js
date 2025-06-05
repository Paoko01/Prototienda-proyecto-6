import { Router } from 'express';
import authRouter from './auth.routes.js';
import tattoosRouter from './tattoos.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/tattoos', tattoosRouter);

export default router;