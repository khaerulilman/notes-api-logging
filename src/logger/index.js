import WinstonCloudWatch from "winston-cloudwatch";
import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
});

if (process.env.NODE_ENV === "production") {
  const cloudwatchConfig = {
    logGroupName: process.env.LOG_GROUP_NAME,
    logStreamName: process.env.LOG_STREAM_NAME,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    messageFormatter: ({ level, message }) => `[${level}] : ${message}}}`,
  };
  logger.add(new WinstonCloudWatch(cloudwatchConfig));
}

export default logger;
