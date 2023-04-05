import { Redis } from "@upstash/redis";
import { z } from "zod";

/**
 * Get an instantiated Redis client
 */
export default function getRedisClient() {
  const url = z.string().parse(process.env.REDIS_URL);
  return new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
  });
}
