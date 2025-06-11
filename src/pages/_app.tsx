import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/main" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
