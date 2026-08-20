import { getNewsfeedData } from "@/cms/get-newsfeed-data";
import homepage from "@/content/homepage.json";
import { NewsfeedItems } from "@/components/newsfeed-item";
import Image from "next/image";
import styles from "./page.module.css";



const { heroTitle, seoTitle, seoDescription, seoTags } = homepage;

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: seoTags,
};

export default async function Home() {
  const newsfeedData = await getNewsfeedData();

  return (
    <>
      <section className="inverted">
        <div className={`${styles.cardRow} container`}>
          <div>
            <Image
              src="https://picsum.photos/200/300"
              alt="Lorem Picsum"
              width={200}
              height={300}
            />
          </div>
          <div className={styles.titles}>
            <h1>{heroTitle}</h1>
          </div>
        </div>
      </section>
      <section className="container">
        <h2>Aktualności</h2>
        <NewsfeedItems newsfeedData={newsfeedData.slice(0, 3)} />
      </section>
    </>
  );
}
