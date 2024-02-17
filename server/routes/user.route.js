import { Router } from "express";
import { changePassword, checkVerfication, resendVerfication, login, register, updateUser, verify, deleteUser } from "../controllers/user.controller.js";
import RegisterValidatorMW from "../middlewares/register.validator.mw.js";
import LoginValidatorMW from "../middlewares/login.validator.mw.js";
import UpdateUserValidatorMW from "../middlewares/updateUser.validator.mw.js";
import ChangePasswordValidatorMW from "../middlewares/changePassword.validator.mw.js";
import AuthMW from "../middlewares/auth.mw.js";

const router = Router();

router.post('/register', RegisterValidatorMW, register)

router.get('/verify/:id/:token', verify)

router.get('/verfication/check/:id', checkVerfication)

router.get('/verfication/resend/:id', resendVerfication)

router.post('/login', LoginValidatorMW, login)

router.post('/update', [AuthMW, UpdateUserValidatorMW], updateUser)

router.post('/changePassword', [AuthMW, ChangePasswordValidatorMW], changePassword)

router.delete('/delete', AuthMW, deleteUser)

export default router;