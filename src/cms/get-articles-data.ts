import fs from "fs/promises";
import { z } from "zod";
import path from "path";
import matter from "gray-matter";

const articleSchema = z.object({
  frontmatter: z.object({
    layout: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoTags: z.array(z.string()).optional(),
  }),
});

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
  const files = await fs.readdir("src/content/articles");
  const newsfeedData = files.map(async (file) => {
    const path = file.replace(".md", "");
    const { layout, title, description, date, image } =
      await getArticleFileMetadata(path);

    return { path, layout, title, description, date, image };
  });
  return Promise.all(newsfeedData);
};
