import { regenerateRoutes } from "@/util/routes";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Regenerate the Redis route store
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await regenerateRoutes();
  return res.status(200).json({ message: "Success" });
}
