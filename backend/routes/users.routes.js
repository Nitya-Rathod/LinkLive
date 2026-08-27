import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  signup,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);

export default router;
