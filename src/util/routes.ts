import { google } from "googleapis";
import getOAuthClient from "./authorize";
import { z } from "zod";
import { Redis } from "@upstash/redis";
import getRedisClient from "./redis";

const { SPREADSHEET_ID } = process.env;
const routeEntrySchema = z.tuple([z.string(), z.string()]).array();

// Routes that cannot be overridden
const reservedRoutes = ["/", "/refresh", "/favicon.ico"];

/**
 * Get the destination route for a given path
 */
export async function getDestination(path: string): Promise<string | null> {
  const redis = await getRedisClient();
  return await redis.get<string>(path);
}

/**
 * Regenerate routes on Redis
 */
export async function regenerateRoutes(): Promise<void> {
  const redis = await getRedisClient();

  // Clear all routes
  await redis.flushall();

  // Pull routes from Sheets
  const client = getOAuthClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Routes!A2:B",
  });
  const routePairs = routeEntrySchema.parse(response.data.values);

  // Filter out reserved routes
  const filtered = routePairs.filter(
    ([path]) => !reservedRoutes.includes(path)
  );

  // Update redis
  for (const [path, destination] of filtered) {
    console.log("Setting route", path, destination);
    const value = await redis.set(path, destination);
    console.log("Value", value);
  }
}
