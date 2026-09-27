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
import styles from "./page.module.css";

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
  const { title, description, date, category, image } =
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
      <Link className={styles.backLink} href="/articles">
        <span aria-hidden="true">←</span> Wszystkie artykuły
      </Link>
      <header className={styles.articleHeader}>
        {image && (
          <Image
            className={styles.coverImage}
            src={getArticleImageSrc(image)}
            alt={title}
            width={1200}
            height={675}
            sizes="(max-width: 680px) calc(100vw - 32px), 800px"
            priority
          />
        )}
        <p className={styles.eyebrow}>{category || "Czytaj szerzej"}</p>
        <h1 className={styles.title}>{title}</h1>
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
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const articleData = await getArticleData();
  return articleData.map(({ path }) => ({ slug: path }));
}
