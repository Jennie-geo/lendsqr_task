import express from "express";
const router = express.Router();

import {
  landPage,
  allusers,
  singleUserAcct,
  createUser,
  loginUser,
  addMoneyToAcct,
  sendMoneyToAnotherAccount,
  withdrawAmount,
  seePersonalProfile,
} from "../controllers/user";
import { authlogin } from "../middleware/authlogin";

router.get("/", landPage);
router.get("/account/allusers", allusers);
router.get("/account/singleuser/:id", authlogin, singleUserAcct);
router.get("/account/personalprofile", authlogin, seePersonalProfile);
router.post("/account/create-acct", createUser);
router.post("/account/login", loginUser);
router.post("/account/credit-user-account", authlogin, addMoneyToAcct);
router.post("/account/cash-transfer/:id", authlogin, sendMoneyToAnotherAccount);
router.post("/account/cash-withdraw", authlogin, withdrawAmount);

export default router;
