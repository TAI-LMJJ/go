import type { NextApiRequest, NextApiResponse } from "next";

// Routes that cannot be overridden
const reservedRoutes = ["/", "/favicon.ico"];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  console.log("Path", path);
  res.status(200).json({ name: "John Doe" });
}
