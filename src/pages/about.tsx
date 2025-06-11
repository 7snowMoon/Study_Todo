import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About This App</title>
        <meta name="description" content="About the simple TODO application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>About This TODO App</h1> 
          <Link href="/" className={styles.button}>
            TODOリストに戻る
          </Link>
        </main>
      </div>
    </>
  );
}