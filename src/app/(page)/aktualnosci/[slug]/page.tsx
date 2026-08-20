import {
  getNewsfeedData,
  getNewsfeedFileMetadata,
} from "@/cms/get-newsfeed-data";
import path from "path";
import fs from "fs/promises"
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { title, description, seoTitle, seoDescription, seoTags } =
    await getNewsfeedFileMetadata(slug);

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

  const safeSlug = path.basename(slug);
  const filePath = path.join(process.cwd(), "src/content/newsfeed", `${safeSlug}.md`);

  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf8");
  } catch {
    throw new Error(`Newsfeed post not found: ${slug}`);
  }


  const { content } = matter(fileContent);
  return <MDXRemote source={content} />
}

export async function generateStaticParams() {
  const newsfeedData = await getNewsfeedData();
  return newsfeedData.map(({ path }) => ({ slug: path }));
}
