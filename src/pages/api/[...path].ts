import getRoutes from "@/util/getRoutes";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path: basePath } = req.query;
  // Get first path
  const path = z.string().array().parse(basePath)[0];

  const routeEntries = await getRoutes();

  const match = routeEntries.find(
    ([entryPath]) => path === entryPath.substring(1) // Remove leading slash
  );
  if (match) {
    return res.redirect(match[1]);
  } else {
    return res.status(404).json({
      message: "Unknown route: " + path,
    });
  }
}
