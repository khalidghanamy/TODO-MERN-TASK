import express from "express";

import { signup,login,forgetPassword ,resetPassword,validateResetPassword} from "../Controller/Auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


//reset password
router.post("/forget-password", forgetPassword);
router.route("/reset-password/:id/:token")
    .get(validateResetPassword)
    .post(resetPassword);



export default router;
