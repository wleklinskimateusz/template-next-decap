import { getArticleData } from "@/cms/get-articles-data";
import { ArticlesItems } from "@/components/articles-items";


export const metadata = {
  title: "Aktualności",
  description: "",
};

export default async function Aktualnosci() {
  const articlesData = await getArticleData();

  return (
    <div>
      <h1>Aktualności</h1>
      <ArticlesItems articlesData={articlesData} />
    </div>
  );
}
