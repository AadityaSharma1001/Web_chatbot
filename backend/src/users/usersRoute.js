import express from "express";
import { getUsers, createUser, googleLogin } from "./userController.js";
import  authenticateJWT  from "../middlewares/jwt.middleware.js";
const router = express.Router();


router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", googleLogin);
router.get("/verify", authenticateJWT, (req, res) => {
  res.sendStatus(200);
});

export default router;
