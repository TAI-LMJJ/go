import { google } from "googleapis";
import getOAuthClient from "./authorize";
import { z } from "zod";

const routeEntrySchema = z.tuple([z.string(), z.string()]).array();

// Routes that cannot be overridden
const reservedRoutes = ["/", "/favicon.ico"];

/**
 * Get route entries from the spreadsheet
 */
export default async function getRoutes() {
  const client = getOAuthClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.spreadsheet_id,
    range: "Routes!A2:B",
  });
  const routePairs = routeEntrySchema.parse(response.data.values);

  // Filter out reserved routes
  const filtered = routePairs.filter(
    ([path]) => !reservedRoutes.includes(path)
  );
  return filtered;
}
