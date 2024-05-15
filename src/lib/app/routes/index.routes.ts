import { Router } from "express";
const router = Router();
import publicRoutes from "./public.routes";

router.use('/', publicRoutes);

export default router;