import {
  getArticleData,
  getArticleFileMetadata,
  getArticleImageSrc,
} from "@/cms/get-articles-data";
import path from "path";
import fs from "fs/promises"
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleLanguageView } from "./article-language-view";
import styles from "./page.module.css";

const EMPTY_ARTICLES_SLUG = "__no_articles__";

const mdxComponents = {
  img: ({ src, alt, width, height, ...props }: ComponentProps<"img">) => {
    if (typeof src !== "string") {
      return null;
    }

    const imageWidth = Number(width) || 1200;
    const imageHeight = Number(height) || 675;

    return (
      <Image
        {...props}
        src={getArticleImageSrc(src)}
        alt={alt ?? ""}
        width={imageWidth}
        height={imageHeight}
        style={{ ...props.style, width: "100%", height: "auto" }}
      />
    );
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === EMPTY_ARTICLES_SLUG) {
    notFound();
  }
  const {
    title,
    description,
    keywords,
    seoTitle,
    seoDescription,
    seoTags,
    translations,
  } = await getArticleFileMetadata(slug);
  const polishTranslation = translations?.find(
    ({ language }) => language === "pl",
  );
  const metadataKeywords = [...(keywords ?? []), ...(seoTags ?? [])]
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return {
    title: `${polishTranslation?.title || seoTitle || title} - teksty oporu`,
    description:
      polishTranslation?.description || seoDescription || description,
    keywords: [...new Set(metadataKeywords)],
    // metadataBase: new URL(""),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === EMPTY_ARTICLES_SLUG) {
    notFound();
  }
  const {
    title,
    date,
    category,
    image,
    keywords,
    language,
    translations,
  } =
    await getArticleFileMetadata(slug);
  const polishTranslation = translations?.find(
    ({ language }) => language === "pl",
  );

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
      <Link className={styles.backLink} href="/articles">
        <span aria-hidden="true">←</span> Wszystkie artykuły
      </Link>
      <ArticleLanguageView
        original={{
          content: <MDXRemote source={content} components={mdxComponents} />,
        }}
        polish={
          polishTranslation
            ? {
                content: (
                  <MDXRemote
                    source={polishTranslation.body}
                    components={mdxComponents}
                  />
                ),
              }
            : undefined
        }
        originalLanguage={language}
        image={
          image ? (
            <Image
              className={styles.coverImage}
              src={getArticleImageSrc(image)}
              alt={polishTranslation?.title ?? title}
              width={1200}
              height={675}
              sizes="(max-width: 680px) calc(100vw - 32px), 800px"
              priority
            />
          ) : null
        }
        category={category}
        date={date}
      />
      {keywords && keywords.length > 0 && (
        <section className={styles.keywords} aria-labelledby="article-keywords">
          <h2 className={styles.keywordsTitle} id="article-keywords">
            Słowa kluczowe
          </h2>
          <ul className={styles.keywordList}>
            {[...new Set(keywords.map((keyword) => keyword.trim()).filter(Boolean))].map(
              (keyword) => (
                <li className={styles.keyword} key={keyword}>
                  {keyword}
                </li>
              ),
            )}
          </ul>
        </section>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  const articleData = await getArticleData();
  return articleData.length
    ? articleData.map(({ path }) => ({ slug: path }))
    : [{ slug: EMPTY_ARTICLES_SLUG }];
}
