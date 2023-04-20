import { GoogleSpreadsheet } from "google-spreadsheet";
import { z } from "zod";
import getRedisClient from "./redis";

const { SPREADSHEET_ID } = process.env;
const routeEntrySchema = z
  .object({
    Route: z.string(),
    Location: z.string(),
  })
  .array();

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

  // Initialize sheet
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  // Initialize auth
  await doc.useServiceAccountAuth({
    client_email: process.env.SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY!,
  });

  // Load routes from sheet
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["Routes"];
  await sheet.loadCells("A2:B");
  const rows = await sheet.getRows();
  const routePairs = routeEntrySchema.parse(rows);

  // Filter out reserved routes
  const filtered = routePairs.filter(
    ({ Route }) => !reservedRoutes.includes(Route)
  );

  // Update redis
  for (const { Route, Location } of filtered) {
    await redis.set(Route, Location);
  }
}
