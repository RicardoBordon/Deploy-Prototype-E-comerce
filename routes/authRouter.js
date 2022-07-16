import { Router } from "express";
import {login, register, logout, refreshToken, inicial} from "../controllers/authController.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validationAdm.js";
import { confirmEmail } from "../middlewares/ValidationMail.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";


const router = Router();


 router.get("/", inicial);

 router.post("/register", bodyRegisterValidator, register);

 router.get("/confirm/:token", confirmEmail);

 router.post("/login", bodyLoginValidator, login);

  router.get("/refresh", requireRefreshToken, refreshToken);

 router.get("/logout", logout);



export default router;