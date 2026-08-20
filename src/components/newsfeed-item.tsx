import styles from "./newsfeed-items.module.css";
import { PostCard, PostCardProps } from "./post-card";

export const NewsfeedItems = ({
  newsfeedData,
}: {
  newsfeedData: PostCardProps[];
}) => {
  return (
    <div className={styles.newsfeedItems}>
      {newsfeedData.map((item) => (
        <PostCard key={item.path} {...item} />
      ))}
    </div>
  );
};
