import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ANALYTICS_REDIS_TOKEN: z.string(),
    ANALYTICS_REDIS_URL: z.string().url(),
    REDIS_TOKEN: z.string(),
    REDIS_URL: z.string().url(),
    SERVICE_ACCOUNT_EMAIL: z.string().email(),
    SERVICE_ACCOUNT_PRIVATE_KEY: z.string(),
    SPREADSHEET_ID: z.string(),
    KAFKA_URL: z.string().url(),
    KAFKA_USERNAME: z.string(),
    KAFKA_PASSWORD: z.string(),
  },
  client: {},
  runtimeEnv: {
    ANALYTICS_REDIS_TOKEN: process.env.ANALYTICS_REDIS_TOKEN,
    ANALYTICS_REDIS_URL: process.env.ANALYTICS_REDIS_URL,
    REDIS_TOKEN: process.env.REDIS_TOKEN,
    REDIS_URL: process.env.REDIS_URL,
    SERVICE_ACCOUNT_EMAIL: process.env.SERVICE_ACCOUNT_EMAIL,
    SERVICE_ACCOUNT_PRIVATE_KEY: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    KAFKA_URL: process.env.KAFKA_URL,
    KAFKA_USERNAME: process.env.KAFKA_USERNAME,
    KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
  },
});
