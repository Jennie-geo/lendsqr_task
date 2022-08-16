import knex from "knex";
import configs from "./knexfile";
import dotenv from "dotenv";
dotenv.config();

console.log(">>> process.env.NODE_ENV::", process.env.NODE_ENV);
const config = configs[process.env.NODE_ENV || "development"];
console.log(config);
const db = knex(config);

export default db;
