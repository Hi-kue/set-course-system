import mongoose from "mongoose";
import { compose } from "../utils/compose.js";
import logger from "../utils/logger.js";

const getMongoURI = (): string => {
    let mongoURI: string = "";
    if (process.env.NODE_ENV === "development") {
        mongoURI = process.env.DEV_MONGO_URI as string;

    } else {
        mongoURI = process.env.PROD_MONGO_URI as string;
    }

    return mongoURI;
}

const connectToMongoDb = async (uri: string) => {
    try {
        const conn = await mongoose.connect(uri);
        logger.info(`MongoDB Connection Established: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        if (error instanceof Error) {
            logger.error("Error connecting to MongoDB: ", error.message);
            process.exit(1);
        }
    }
}

const logConnection = (conn: mongoose.Connection) => {
    conn.once("open", () => {
        logger.info(`Connection to Database: ${conn.name} is open`);
    });

    conn.once("close", () => {
        logger.info(`Connection to Database: ${conn.name} is closed`);
    });

    return conn;
}

export const db = compose (
    logConnection,
    connectToMongoDb,
    getMongoURI
);