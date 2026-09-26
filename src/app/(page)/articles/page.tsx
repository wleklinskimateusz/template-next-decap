import { getArticleData } from "@/cms/get-articles-data";
import { ArticlesItems } from "@/components/articles-items";
import styles from "./page.module.css";


export const metadata = {
  title: "Articles",
  description: "",
};

export default async function Articles() {
  const articlesData = await getArticleData();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>E-zin · magazyn idei</p>
          <h1 className={styles.title}>Czytaj szerzej.</h1>
        </div>
        <p className={styles.description}>
          Historie, obserwacje i inspiracje z różnych stron świata. Wybierz
          temat, który dziś Cię ciekawi.
        </p>
      </header>
      <div className={styles.feedHeader}>
        <p className={styles.sectionLabel}>Najnowsze artykuły</p>
        <span className={styles.count}>
          {String(articlesData.length).padStart(2, "0")} tekstów
        </span>
      </div>
      <ArticlesItems articlesData={articlesData} />
    </div>
  );
}
