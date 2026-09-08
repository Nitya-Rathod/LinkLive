import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  deleteFromHistory,
  login,
  signup,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);
router.route("/delete_from_activity").delete(deleteFromHistory);

export default router;
