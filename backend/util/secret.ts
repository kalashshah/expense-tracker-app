import * as dotenv from "dotenv";

dotenv.config();

export const PORT = parseInt(process.env.PORT as string) || 8000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";
export const SECRET_KEY = (process.env.SECRET_KEY as string) || "dev-test-key";
