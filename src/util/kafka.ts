import { env } from "@/env";
import { Kafka } from "@upstash/kafka";

export const ANALYTICS_TOPIC = "route_analytics";

/**
 * Get the instantiated kafka client
 */
export function getKafkaClient() {
  return new Kafka({
    url: env.KAFKA_URL,
    username: env.KAFKA_USERNAME,
    password: env.KAFKA_PASSWORD,
  });
}

/**
 * Produce a message on the analytics topic
 */
export async function produceAnalyticsMessage(message: string) {
  const client = getKafkaClient();
  const producer = client.producer();

  await producer.produce(ANALYTICS_TOPIC, message);
}
