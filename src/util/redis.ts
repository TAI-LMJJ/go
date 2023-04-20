import { Redis } from "@upstash/redis";
import { z } from "zod";

/**
 * Get an instantiated Redis client
 */
export function getRedisClient() {
  const url = z.string().parse(process.env.REDIS_URL);
  return new Redis({
    url,
    token: process.env.REDIS_TOKEN,
  });
}

/**
 * Get the instantiated Redis client for analytics
 */
export function getAnalyticsRedisClient() {
  const url = z.string().parse(process.env.ANALYTICS_REDIS_URL);
  return new Redis({
    url,
    token: process.env.ANALYTICS_REDIS_TOKEN,
  });
}
