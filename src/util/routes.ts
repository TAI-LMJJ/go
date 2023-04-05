import { google } from "googleapis";
import getOAuthClient from "./authorize";
import { z } from "zod";
import { Redis } from "@upstash/redis";

const { SPREADSHEET_ID } = process.env;
const routeEntrySchema = z.tuple([z.string(), z.string()]).array();

// Routes that cannot be overridden
const reservedRoutes = ["/", "/refresh", "/favicon.ico"];

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_tOKEN,
});

/**
 * Get the destination route for a given path
 */
export async function getDestination(path: string): Promise<string | null> {
  return await redis.get<string>(path);
}

/**
 * Regenerate routes on Redis
 */
export async function regenerateRoutes(): Promise<void> {
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
  const promises = [];
  for (const [path, destination] of filtered) {
    promises.push(redis.set(path, destination));
  }
  await Promise.all(promises);
}
