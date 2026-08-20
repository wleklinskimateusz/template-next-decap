import Link from "next/link";
import styles from "./footer.module.css";

export const Footer = () => (
  <footer className={`${styles.footer} container`}>
    <div className={styles.footerCentered}>
      <p>© e-zin, {new Date().getFullYear()}</p>
      <p>
        <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
      </p>
    </div>
  </footer>
);
