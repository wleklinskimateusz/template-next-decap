import fs from "fs/promises";
import { z } from "zod";
import path from "path";
import matter from "gray-matter";

const newsfeedSchema = z.object({
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

export const getNewsfeedFileMetadata = async (file: string) => {
  const filePath = path.join(
    process.cwd(),
    "src/content/newsfeed",
    `${file}.md`,
  );

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);
    const result = newsfeedSchema.parse({ frontmatter });
    return result.frontmatter;
  } catch (error) {
    console.error(`Failed to read newsfeed file: ${file}`, error);
    throw error;
  }
};
export const getNewsfeedData = async () => {
  const files = await fs.readdir("src/content/newsfeed");
  const newsfeedData = files.map(async (file) => {
    const path = file.replace(".md", "");
    const { layout, title, description, date, image } =
      await getNewsfeedFileMetadata(path);

    return { path, layout, title, description, date, image };
  });
  return Promise.all(newsfeedData);
};
