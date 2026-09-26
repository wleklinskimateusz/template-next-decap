import styles from "./articles-items.module.css";
import { PostCard, PostCardProps } from "./post-card";

export const ArticlesItems = ({
  articlesData,
}: {
  articlesData: PostCardProps[];
}) => {
  return (
    <div className={styles.newsfeedItems}>
      {articlesData.map((item) => (
        <PostCard key={item.path} {...item} />
      ))}
    </div>
  );
};
