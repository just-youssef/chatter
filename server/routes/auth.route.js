import { Router } from "express";
import { checkVerfication, resendVerfication, login, register, verify, logout } from "../controllers/auth.controller.js";
import RegisterValidatorMW from "../middlewares/register.validator.mw.js";
import LoginValidatorMW from "../middlewares/login.validator.mw.js";
import AuthMW from "../middlewares/auth.mw.js";

const router = Router();

router.post('/register', RegisterValidatorMW, register)

router.get('/verify/:id/:token', verify)

router.get('/verfication/check/:id', checkVerfication)

router.get('/verfication/resend/:id', resendVerfication)

router.post('/login', LoginValidatorMW, login)

router.get('/logout', AuthMW, logout)

export default router;