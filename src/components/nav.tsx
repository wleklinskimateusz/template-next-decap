import Link from "next/link";
import Image from "next/image";
import styles from "./nav.module.css";

export const Nav = () => (
  <header className={`${styles.header} inverted`}>
    <nav className={`${styles.nav} $container`}>
      <Link className={styles.headerButton} href="/">
        <div className={styles.logo}>
          <div>E-zin</div>
          <Image src="https://picsum.photos/50/50" alt="Logo" width="50" height="50" />
        </div>
      </Link>
      <div className={styles.navLinks}>
        <Link className={styles.headerButton} href="/">
          Strona główna
        </Link>
        <Link className={styles.headerButton} href="/aktualnosci">
          Aktualności
        </Link>
      </div>
    </nav>
  </header>
);
