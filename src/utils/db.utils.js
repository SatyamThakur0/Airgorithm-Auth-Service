import {
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    DB_NAME,
} from "../config/env.config.js";

export const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
};
