"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authlogin = void 0;
const db_1 = __importDefault(require("../database/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authlogin(req, res, next) {
    const token = req.headers["authorization"] || req.query.authorization;
    if (!token) {
        return res.status(403).send("You have to login to continue");
    }
    const tokenBody = token.slice(7);
    jsonwebtoken_1.default.verify(tokenBody, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log("error", err);
            return res.status(403).send({ Error: "Access denied" });
        }
        else {
            const { userId } = decoded;
            const user = await (0, db_1.default)("users").where("id", userId).first();
            if (!user) {
                return res.send({ login: `No User exists with this ${userId}` });
            }
            req.user = user;
            next();
        }
    });
}
exports.authlogin = authlogin;
//# sourceMappingURL=authlogin%20copy.js.map