const { format, createLogger, transports } = require("winston");
const winston = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";
const files = new winston.transports.File({ filename: 'combined.log' });

const logger = createLogger({
    level: "debug",
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        prettyPrint()
    ),
    transports: [
        new transports.File({
            level: 'warn',
            filename: './logger/saves/logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: './logger/saves/logsErrors.log'
        }),
        new transports.File({
            level: 'info',
            filename: './logger/saves/logsInfo.log'
        }),
        new transports.File({
            level: 'debug',
            filename: './logger/saves/logsDebug.log'
        }),
        new transports.Console()
    ],
});

logger.add(files)

module.exports = logger;