import { getDestination } from "@/util/getDestination";
import { produceAnalyticsMessage } from "@/util/kafka";
import { getAnalyticsRedisClient } from "@/util/redis";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { pathname: path } = new URL(req.url);
  const route = await getDestination(path);

  if (route != null) {
    // Increment analytics counter
    const analyticsClient = getAnalyticsRedisClient();
    await analyticsClient.incr(path);

    // Track analytics
    const message = {
      country: req.geo?.country,
      city: req.geo?.city,
      region: req.geo?.region,
      url: req.url,
      ip: req.headers.get("x-real-ip"),
      mobile: req.headers.get("sec-ch-ua-mobile"),
      platform: req.headers.get("sec-ch-ua-platform"),
      useragent: req.headers.get("user-agent"),
    };

    const headers: [string, string][] = [];
    for (const header of req.headers) {
      headers.push(header);
    }
    console.log(headers);
    console.log(req.geo);

    // Publish to kafka
    const analyticsMessage = JSON.stringify(message);
    await produceAnalyticsMessage(analyticsMessage);

    return Response.redirect(route);
  } else {
    return new Response(JSON.stringify({ message: `Unknown route: ${path}` }), {
      status: 404,
    });
  }
}
