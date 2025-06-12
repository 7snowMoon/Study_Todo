import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import styles from "@/styles/Main.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/TodosPage" className={styles.navLink}>
          TODOリスト
        </Link>
        <Link href="/CompletedTodosPage" className={styles.navLink}>
          完了TODO一覧
        </Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
