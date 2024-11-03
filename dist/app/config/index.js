"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// import path from 'path';
// Load environment variables from a .env file located at the root of the project
// dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv_1.default.config();
// Export configuration values sourced from environment variables
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
};
