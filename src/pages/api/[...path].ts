import { getAnalyticsRedisClient } from "@/util/redis";
import { getDestination } from "@/util/routes";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path: basePath } = req.query;
  // Get first path
  const path = "/" + z.string().array().parse(basePath)[0];
  const route = await getDestination(path);

  if (route != null) {
    // Increment analytics counter
    const analyticsClient = getAnalyticsRedisClient();
    await analyticsClient.incr(path);

    res.redirect(route);
  } else {
    return res.status(404).json({
      message: "Unknown route: " + path,
    });
  }
}
