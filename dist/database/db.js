"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = knexfile_1.default[process.env.NODE_ENV || "development"];
console.log(config);
const db = (0, knex_1.default)(config);
exports.default = db;
//# sourceMappingURL=db.js.map