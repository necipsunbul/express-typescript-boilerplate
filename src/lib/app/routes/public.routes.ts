import { Router } from 'express';
import AppDefaultController from '../controllers/AppDefaultController';
import JoiValidatorMid from '../middlewares/JoiValidatorMid';
const router = Router();

router.get('/', AppDefaultController.index);

export default router;
