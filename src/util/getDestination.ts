import { getRedisClient } from "./redis";

/**
 * Separated from regenerateRoutes.ts to remove additional dependencies
 * on edge runtime
 */

/**
 * Get the destination route for a given path
 */
export async function getDestination(path: string): Promise<string | null> {
  const redis = await getRedisClient();
  return await redis.get<string>(path);
}
