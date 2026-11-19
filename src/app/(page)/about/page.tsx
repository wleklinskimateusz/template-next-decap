import aboutPage from "@/content/about-page.json";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: aboutPage.seoTitle,
  description: aboutPage.seoDescription,
  keywords: aboutPage.seoTags,
};

export default function AboutPage() {
  return (
    <article className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{aboutPage.eyebrow}</p>
          <h1 className={styles.title}>{aboutPage.title}</h1>
        </div>
        <p className={styles.lead}>{aboutPage.lead}</p>
      </header>

      <div className={styles.content}>
        {aboutPage.sections.map((section, index) => (
          <section
            className={styles.section}
            aria-labelledby={`about-section-${index}`}
            key={`${section.title}-${index}`}
          >
            <h2 id={`about-section-${index}`}>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <section className={styles.section} aria-labelledby="about-read">
          <h2 id="about-read">{aboutPage.readingTitle}</h2>
          <p>{aboutPage.readingText}</p>
          <Link className={styles.link} href="/articles">
            {aboutPage.readingLinkText} <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </article>
  );
}
