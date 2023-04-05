import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>t-ai Go Routes</title>
        <meta name="description" content="t-AI URL shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p className={clsx(inter.className, styles.heading)}>
          t-ai URL Shortener
        </p>
        <p className={clsx(inter.className, styles.subheading)}>
          You probably shouldn&apos;t be here...
        </p>
      </main>
    </>
  );
}
