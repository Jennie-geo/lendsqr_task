import knex from "knex";
import configs from "./knexfile";
import dotenv from "dotenv";
dotenv.config();

const config = configs[process.env.NODE_ENV || "development"];
console.log(config);
const db = knex(config);

export default db;
