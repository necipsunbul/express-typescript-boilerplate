import { Router } from 'express';
import AppDefaultController from '../controllers/AppDefaultController';
import JoiValidatorMid from '../middlewares/JoiValidatorMid';
import ImageUploadMid from '../middlewares/ImageUploadMid';
import SuccessResponse from '../../core/response/SuccessResponse';
const router = Router();

router.get('/', AppDefaultController.index);

export default router;
