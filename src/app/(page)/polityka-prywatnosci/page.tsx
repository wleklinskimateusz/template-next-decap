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
        <p className={styles.updated}>Ostatnia aktualizacja: 20 listopada 2026 r.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.section} aria-labelledby="zakres">
          <h2 id="zakres">1. Publiczna część serwisu</h2>
          <p>
            Publiczna część serwisu udostępnia statyczne artykuły. Nie zawiera
            formularza kontaktowego, kont użytkowników ani newslettera oraz nie
            uruchamia narzędzi analitycznych, reklamowych ani skryptów
            śledzących. Nie prosimy odwiedzających o podanie danych w celu
            samego czytania artykułów. Jedynym kanałem kontaktowym
            udostępnionym w serwisie jest adres e-mail wskazany w sekcji 2,
            służący do przesyłania tekstów proponowanych do publikacji.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="teksty">
          <h2 id="teksty">2. Administrator danych i kontakt</h2>
          <p>
            Administratorem danych osobowych przetwarzanych w związku z
            serwisem jest <strong>Aleksandra Ambrożewicz</strong>, osoba
            fizyczna prowadząca niniejszą stronę internetową. Kontakt we
            wszystkich sprawach dotyczących danych osobowych, w tym w celu
            przesłania tekstu do publikacji:{" "}
            <a href="mailto:teksty.oporu@proton.me">teksty.oporu@proton.me</a>.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="publikacje">
          <h2 id="publikacje">3. Przesyłanie tekstów do publikacji</h2>
          <p>
            Teksty proponowane do publikacji przesyłane są wyłącznie na
            wskazany powyżej adres e-mail.
          </p>
          <ul>
            <li>
              <strong>Zakres danych:</strong> adres e-mail nadawcy, treść
              wiadomości oraz dane zawarte w przesłanym tekście (np. imię i
              nazwisko autora, dane kontaktowe, jeżeli zostaną podane).
            </li>
            <li>
              <strong>Cel przetwarzania:</strong> obsługa zgłoszenia, kontakt w
              sprawie tekstu, ocena i ewentualna publikacja treści.
            </li>
            <li>
              <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO —
              prawnie uzasadniony interes administratora polegający na obsłudze
              zgłoszeń i publikacji nadesłanych treści; w zakresie, w jakim
              dochodzi do dalszej komunikacji lub publikacji danych autora w
              sposób wykraczający poza samo zgłoszenie — art. 6 ust. 1 lit. a
              RODO (zgoda).
            </li>
            <li>
              <strong>Okres przechowywania:</strong> do czasu zakończenia
              rozpatrywania zgłoszenia, a w przypadku publikacji — do czasu
              wycofania zgody lub wniesienia skutecznego sprzeciwu; nie dłużej
              niż jest to niezbędne do realizacji celu.
            </li>
            <li>
              <strong>Dobrowolność:</strong> podanie danych jest dobrowolne,
              lecz niezbędne do rozpatrzenia zgłoszenia i ewentualnej
              publikacji tekstu.
            </li>
            <li>
              <strong>Odpowiedzialność nadawcy:</strong> przesyłając tekst,
              potwierdzasz, że posiadasz odpowiednie uprawnienia do przekazania
              zawartych w nim danych osobowych osób trzecich.
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="hosting">
          <h2 id="hosting">4. Hosting i usługi zewnętrzne</h2>
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
            Informacje o okresach przechowywania, lokalizacji przetwarzania i
            stosowanych zabezpieczeniach należy sprawdzić w aktualnych
            informacjach o prywatności GitHub.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="cookies">
          <h2 id="cookies">5. Pliki cookies i podobne technologie</h2>
          <p>
            Publiczna część serwisu nie zapisuje własnych plików cookies ani nie
            uruchamia skryptów śledzących, analitycznych lub reklamowych. Sam
            hosting może stosować własne mechanizmy techniczne zgodnie z
            zasadami GitHub. W razie dodania przez nas niekoniecznych cookies
            lub podobnych technologii zaktualizujemy tę informację i — jeśli
            będzie to wymagane — uzyskamy zgodę przed ich użyciem.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="odbiorcy">
          <h2 id="odbiorcy">6. Odbiorcy danych</h2>
          <p>
            Dane przesyłane e-mailem mogą być przetwarzane przez dostawcę usług
            poczty elektronicznej administratora, wyłącznie w zakresie
            niezbędnym do świadczenia tej usługi. Dane techniczne związane z
            korzystaniem z serwisu przetwarza GitHub, zgodnie ze swoimi
            zasadami prywatności.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="prawa">
          <h2 id="prawa">7. Prawa użytkowników</h2>
          <p>
            W zakresie danych, których administratorem jest osoba wskazana w
            sekcji 2, przysługuje Ci prawo dostępu do danych, ich sprostowania,
            usunięcia, ograniczenia przetwarzania, przenoszenia danych,
            wniesienia sprzeciwu wobec przetwarzania opartego na prawnie
            uzasadnionym interesie oraz wycofania zgody w dowolnym momencie
            (bez wpływu na zgodność z prawem przetwarzania dokonanego przed
            wycofaniem). Wnioski należy kierować na adres e-mail wskazany w
            sekcji 2.
          </p>
          <p>
            W zakresie danych przetwarzanych przez GitHub pytania i żądania
            należy kierować do tego dostawcy, zgodnie z jego polityką
            prywatności. Jeżeli uważasz, że Twoje prawa wynikające z RODO
            zostały naruszone, możesz złożyć skargę do właściwego organu
            nadzorczego, w Polsce do{" "}
            <a href="https://uodo.gov.pl/">
              Prezesa Urzędu Ochrony Danych Osobowych
            </a>
            .
          </p>
        </section>

        <section className={styles.section} aria-labelledby="decyzje">
          <h2 id="decyzje">8. Zautomatyzowane decyzje i zmiany polityki</h2>
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
