import express from "express";
import { followUnFollowUser, loginUser, logoutUser, signupUser, updateProfile } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();


router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id",protectRoute,followUnFollowUser);
router.post("/upadte/:id",protectRoute,updateProfile);

export default router;
