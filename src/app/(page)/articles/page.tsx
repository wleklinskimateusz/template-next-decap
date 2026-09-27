import { getArticleData } from "@/cms/get-articles-data";
import { ArticlesItems } from "@/components/articles-items";
import articlesPage from "@/content/articles-page.json";
import styles from "./page.module.css";

const {
  eyebrow,
  title,
  description,
  sectionLabel,
  articleCountLabel,
  seoTitle,
  seoDescription,
  seoTags,
} = articlesPage;

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: seoTags,
};

export default async function Articles() {
  const articlesData = await getArticleData();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <p className={styles.description}>{description}</p>
      </header>
      <div className={styles.feedHeader}>
        <p className={styles.sectionLabel}>{sectionLabel}</p>
        <span className={styles.count}>
          {String(articlesData.length).padStart(2, "0")} {articleCountLabel}
        </span>
      </div>
      <ArticlesItems articlesData={articlesData} />
    </div>
  );
}
