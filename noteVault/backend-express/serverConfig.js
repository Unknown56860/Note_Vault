import dotenv from "dotenv";

dotenv.config();
// dotenv.config({path: "../.env"});

export default {
    PORT: process.env.PORT || process.env.EXPRESS_PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL
}
