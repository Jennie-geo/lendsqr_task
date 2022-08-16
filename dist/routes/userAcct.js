"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controllers/user");
const authlogin_1 = require("../middleware/authlogin");
router.get("/account/allusers", user_1.allusers);
router.get("/account/singleuser/:id", authlogin_1.authlogin, user_1.singleUserAcct);
router.get("/account/personalprofile", authlogin_1.authlogin, user_1.seePersonalProfile);
router.post("/account/create-acct", user_1.createUser);
router.post("/account/login", user_1.loginUser);
router.post("/account/credit-user-account", authlogin_1.authlogin, user_1.addMoneyToAcct);
router.post("/account/cash-transfer/:id", authlogin_1.authlogin, user_1.sendMoneyToAnotherAccount);
router.post("/account/cash-withdraw", authlogin_1.authlogin, user_1.withdrawAmount);
exports.default = router;
//# sourceMappingURL=userAcct.js.map