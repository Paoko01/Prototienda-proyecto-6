import { Router } from 'express';
import { getAllTattoos, getTattoosById, createReservaTattoo, updateReservaTattoo, deleteReservaTattoo} from '../controllers/Tattoos.controller.js';

const router = Router();

router.get('/', getAllTattoos);
router.get('/:id', getTattoosById);
router.post('/', createReservaTattoo);
router.put('/:id', updateReservaTattoo);
router.delete('/:id', deleteReservaTattoo);


export default router;