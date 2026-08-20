import { getNewsfeedData } from "@/cms/get-newsfeed-data";
import { NewsfeedItems } from "@/components/newsfeed-item";


export const metadata = {
  title: "Aktualności",
  description: "",
};

export default async function Aktualnosci() {
  const newsfeedData = await getNewsfeedData();

  return (
    <div>
      <h1>Aktualności</h1>
      <NewsfeedItems newsfeedData={newsfeedData} />
    </div>
  );
}
