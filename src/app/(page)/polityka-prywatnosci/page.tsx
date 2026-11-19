import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Polityka prywatności | Teksty Oporu",
  description:
    "Informacje o prywatności podczas korzystania z publicznej, statycznej strony Teksty Oporu.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Teksty Oporu</p>
        <h1 className={styles.title}>Polityka prywatności</h1>
        <p className={styles.updated}>Ostatnia aktualizacja: 19 listopada 2026 r.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.section} aria-labelledby="zakres">
          <h2 id="zakres">1. Publiczna część serwisu</h2>
          <p>
            Publiczna część serwisu udostępnia statyczne artykuły. Nie zawiera
            formularza kontaktowego, kont użytkowników ani newslettera oraz nie
            uruchamia narzędzi analitycznych, reklamowych ani skryptów
            śledzących. Nie prosimy odwiedzających o podanie danych i nie
            udostępniamy kanału kontaktowego przez tę stronę.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="hosting">
          <h2 id="hosting">2. Hosting i usługi zewnętrzne</h2>
          <p>
            Serwis jest publikowany jako statyczna strona przez GitHub Pages.
            Podczas połączenia GitHub może przetwarzać dane techniczne, takie
            jak adres IP, czas i adres żądanej strony oraz informacje o
            przeglądarce, zgodnie ze swoimi zasadami. Opisuje je{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              oświadczenie o prywatności GitHub
            </a>
            . Operator tej strony nie otrzymuje dostępu do wewnętrznych logów
            serwera GitHub.
          </p>
          <p>
            Panel administracyjny pod adresem <code>/admin</code> jest odrębną
            częścią serwisu. Po jego otwarciu przeglądarka pobiera aplikację
            Sveltia CMS z zewnętrznego CDN{" "}
            <a href="https://unpkg.com/">unpkg</a>; logowanie i dostęp
            redakcyjny korzystają z GitHub. W związku z tym unpkg i GitHub mogą
            otrzymać dane techniczne połączenia, a GitHub — dane konta użytego
            do logowania. Ta część nie jest potrzebna do czytania publicznych
            artykułów. Obowiązują tam także zasady prywatności tych dostawców.
          </p>
          <p>
            Informacje o okresach przechowywania, lokalizacji przetwarzania i
            stosowanych zabezpieczeniach należy sprawdzić w aktualnych
            informacjach o prywatności tych dostawców.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="cookies">
          <h2 id="cookies">3. Pliki cookies i podobne technologie</h2>
          <p>
            Publiczna część serwisu nie zapisuje własnych plików cookies ani nie
            uruchamia skryptów śledzących, analitycznych lub reklamowych. Sam
            hosting może stosować własne mechanizmy techniczne zgodnie z
            zasadami GitHub. Logowanie do panelu administracyjnego może
            korzystać z mechanizmów GitHub. W razie dodania przez nas
            niekoniecznych cookies lub podobnych technologii zaktualizujemy tę
            informację i — jeśli będzie to wymagane — uzyskamy zgodę przed ich
            użyciem.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="prawa">
          <h2 id="prawa">4. Prywatność i prawa użytkowników</h2>
          <p>
            Ta strona nie oferuje sposobu kontaktu z jej operatorem. W zakresie
            danych przetwarzanych przez GitHub lub unpkg należy kierować pytania
            i żądania do właściwego dostawcy, zgodnie z jego polityką
            prywatności. Jeżeli uważasz, że Twoje prawa wynikające z RODO zostały
            naruszone, możesz złożyć skargę do właściwego organu nadzorczego,
            w Polsce do{" "}
            <a href="https://uodo.gov.pl/">
              Prezesa Urzędu Ochrony Danych Osobowych
            </a>
            .
          </p>
        </section>

        <section className={styles.section} aria-labelledby="decyzje">
          <h2 id="decyzje">5. Zautomatyzowane decyzje i zmiany polityki</h2>
          <p>
            Nie podejmujemy wobec odwiedzających decyzji wywołujących skutki
            prawne lub podobnie istotne wyłącznie w sposób zautomatyzowany i nie
            prowadzimy profilowania. Politykę zaktualizujemy, jeśli zmieni się
            sposób działania serwisu lub przetwarzania danych.
          </p>
        </section>
      </div>
    </article>
  );
}
