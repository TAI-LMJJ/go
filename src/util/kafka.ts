import { env } from "@/env";
import { Kafka } from "@upstash/kafka";

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
