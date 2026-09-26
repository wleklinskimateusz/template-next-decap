import {
  getArticleData,
  getArticleFileMetadata,
} from "@/cms/get-articles-data";
import path from "path";
import fs from "fs/promises"
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { title, description, seoTitle, seoDescription, seoTags } =
    await getArticleFileMetadata(slug);

  return {
    title: `${seoTitle || title} - e-zin`,
    description: seoDescription || description,
    keywords: seoTags || [],
    // metadataBase: new URL(""),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { description, date, category } =
    await getArticleFileMetadata(slug);

  const safeSlug = path.basename(slug);
  const filePath = path.join(process.cwd(), "src/content/articles", `${safeSlug}.md`);

  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf8");
  } catch {
    throw new Error(`Article not found: ${slug}`);
  }


  const { content } = matter(fileContent);
  return (
    <article className={styles.page}>
      <Link className={styles.backLink} href="/aktualnosci">
        <span aria-hidden="true">←</span> Wszystkie artykuły
      </Link>
      <header className={styles.articleHeader}>
        <p className={styles.eyebrow}>{category || "Czytaj szerzej"}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </header>
      <div className={styles.content}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const articleData = await getArticleData();
  return articleData.map(({ path }) => ({ slug: path }));
}
