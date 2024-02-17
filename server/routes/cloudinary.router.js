import { Router } from "express";
import AuthMW from "../middlewares/auth.mw.js";
import { uploadFile, uploadMultiple } from "../controllers/cloudinary.controller.js";
import multer from "multer";

const multerUploadMW = multer({ dest: 'multer/' })
const router = Router();

router.post('/uploadFile', [AuthMW, multerUploadMW.single('file')], uploadFile)

router.post('/uploadMultiple', [AuthMW, multerUploadMW.array('files')], uploadMultiple)

export default router;