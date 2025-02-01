import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;

const loggerFormat = printf(({ level, message, timestamp}) => {
    return `[${level}] ${timestamp}: ${message}`;
});

const logger = winston.createLogger({
    level: "debug",
    format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        loggerFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

// ANCHOR: Basic Logging Functions
export const logInfo = (message: string) => { logger.info(message); }
export const logError = (message: string) => { logger.error(message); }
export const logWarning = (message: string) => { logger.warn(message); }
export const logDebug = (message: string) => { logger.debug(message); }

export default logger;