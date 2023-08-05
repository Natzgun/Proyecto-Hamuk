import { config } from "dotenv";
config();
export const PORT = process.env.PORT || 4000;
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1/merndb';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret';
