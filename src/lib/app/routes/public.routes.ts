import { Router } from "express";
import AppDefaultController from "../controllers/AppDefaultController";
const router = Router();

router.get("/", AppDefaultController.index);

export default router;