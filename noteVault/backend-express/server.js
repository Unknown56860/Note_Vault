import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import mongoConnect from "./src/database/mongo/Mongo.js";

import authRouter from "./src/routes/auth.js";
import notesRouter from "./src/routes/notes.js";

import serverConfig from "./serverConfig.js";

const PORT = serverConfig.PORT;
const MONGO_URL = serverConfig.MONGO_URL;

const FRONTEND_URL = serverConfig.FRONTEND_URL;

const server = express();

server.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

server.use(express.json());
server.use(cookieParser());

server.get('/', (req, res) => {
    return res.status(200).send("Hello from express backend :)");
});

server.use("/auth", authRouter);
server.use("/note", notesRouter);

server.listen(PORT, async () => {
    const mongodb = await mongoConnect(MONGO_URL);
    console.log(`[Server]: listening on port ${PORT}`)
});
