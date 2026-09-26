import { getArticleData } from "@/cms/get-articles-data";
import homepage from "@/content/homepage.json";
import { ArticlesItems } from "@/components/articles-items";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";


const { heroTitle, heroSubtitle, seoTitle, seoDescription, seoTags } = homepage;

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: seoTags,
};

export default async function Home() {
  const articlesData = await getArticleData();

  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> E-zin · magazyn idei</p>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <p className={styles.heroSubtitle}>{heroSubtitle}</p>
            <Link className={styles.heroLink} href="/articles">
              Odkryj artykuły <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.heroVisual}>
            <Image
              className={styles.heroImage}
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
              alt="Przytulna biblioteka pełna książek"
              fill
              priority
              sizes="(max-width: 560px) 66vw, (max-width: 760px) 40vw, 410px"
            />
            <div className={styles.imageShade} aria-hidden="true" />
            <p className={styles.imageCaption}>MIEJSCE NA NOWE PERSPEKTYWY</p>
          </div>
        </div>
      </section>
      <section className={`${styles.latest} container`}>
        <div className={styles.latestHeading}>
          <div>
            <p className={styles.latestEyebrow}>Na dobry początek</p>
            <h2>Artykuły</h2>
          </div>
          <Link className={styles.allArticles} href="/articles">
            Wszystkie teksty <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ArticlesItems articlesData={articlesData.slice(0, 3)} />
      </section>
    </>
  );
}
