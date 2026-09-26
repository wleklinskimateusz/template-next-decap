import Link from "next/link";
import styles from "./nav.module.css";

export const Nav = () => (
  <header className={`${styles.header} inverted`}>
    <nav className={`${styles.nav} container`}>
      <Link className={styles.headerButton} href="/">
        <div className={styles.logo}>
          <div>E-zin</div>
        </div>
      </Link>
      <div className={styles.navLinks}>
        <Link className={styles.headerButton} href="/">
          Strona główna
        </Link>
        <Link className={styles.headerButton} href="/aktualnosci">
          Artykuły
        </Link>
      </div>
    </nav>
  </header>
);
