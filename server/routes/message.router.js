import { Router } from "express";
import AuthMW from "../middlewares/auth.mw.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = Router();

router.get("/:id", AuthMW, getMessages)
router.post("/send/:id", AuthMW, sendMessage)

export default router;
