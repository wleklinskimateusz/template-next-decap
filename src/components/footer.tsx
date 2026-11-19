import Link from "next/link";
import styles from "./footer.module.css";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.footerInner}`}>
      <p className={styles.copyright}>© Teksty Oporu, {new Date().getFullYear()}</p>
      <Link className={styles.privacyLink} href="/polityka-prywatnosci">
        Polityka prywatności
      </Link>
    </div>
  </footer>
);
