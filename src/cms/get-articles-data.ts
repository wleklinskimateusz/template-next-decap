import fs from "fs/promises";
import { z } from "zod";
import path from "path";
import matter from "gray-matter";

const translationSchema = z.object({
  language: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
});

const articleSchema = z.object({
  frontmatter: z.object({
    layout: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.date(),
    language: z.string().optional(),
    translations: z.array(translationSchema).optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoTags: z.array(z.string()).optional(),
  }),
});

export const getArticleImageSrc = (image: string) => {
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
  const uploadsPathIndex = image.indexOf("/images/uploads/");
  const normalizedPath =
    uploadsPathIndex >= 0
      ? image.slice(uploadsPathIndex)
      : `/${image.replace(/^\/+/, "")}`;

  return `${basePath}${normalizedPath}`;
};

export const getArticleFileMetadata = async (file: string) => {
  const filePath = path.join(
    process.cwd(),
    "src/content/articles",
    `${file}.md`,
  );

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);
    const result = articleSchema.parse({ frontmatter });
    return result.frontmatter;
  } catch (error) {
    console.error(`Failed to read article file: ${file}`, error);
    throw error;
  }
};
export const getArticleData = async () => {
  let files: string[];
  try {
    files = await fs.readdir("src/content/articles");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const newsfeedData = files
    .filter((file) => file.endsWith(".md"))
    .map(async (file) => {
      const articlePath = file.replace(/\.md$/, "");
      const {
        layout,
        title,
        description,
        date,
        image,
        category,
        translations,
      } = await getArticleFileMetadata(articlePath);
      const polishTranslation = translations?.find(
        ({ language }) => language === "pl",
      );

      return {
        path: articlePath,
        layout,
        title: polishTranslation?.title ?? title,
        description: polishTranslation?.description ?? description,
        date,
        image,
        category,
      };
    });
  return Promise.all(newsfeedData);
};
