import { Router } from "express";
import { getContacts, changePassword, updateUser, deleteUser } from "../controllers/user.controller.js";
import UpdateUserValidatorMW from "../middlewares/updateUser.validator.mw.js";
import ChangePasswordValidatorMW from "../middlewares/changePassword.validator.mw.js";
import AuthMW from "../middlewares/auth.mw.js";

const router = Router();

router.get('/contacts', AuthMW, getContacts)

router.put('/update', [AuthMW, UpdateUserValidatorMW], updateUser)

router.post('/changePassword', [AuthMW, ChangePasswordValidatorMW], changePassword)

router.delete('/delete', AuthMW, deleteUser)

export default router;