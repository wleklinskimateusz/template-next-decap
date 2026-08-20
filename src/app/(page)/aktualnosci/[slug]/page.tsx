import {
  getNewsfeedData,
  getNewsfeedFileMetadata,
} from "@/cms/get-newsfeed-data";


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
  const { default: Post } = await import(`@/content/newsfeed/${slug}.md`);

  return <Post />;
}

export async function generateStaticParams() {
  const newsfeedData = await getNewsfeedData();
  return newsfeedData.map(({ path }) => ({ slug: path }));
}
