import Link from "next/link";
import Image from "next/image";
import styles from "./post-card.module.css";

export type PostCardProps = {
  path: string;
  image?: string;
  title: string;
  description: string;
  date: Date;
};

export const PostCard = ({
  path,
  image,
  title,
  description,
  date,
}: PostCardProps) => {
  return (
    <div className={styles.postCard}>
      <Link href={`/aktualnosci/${path}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            width={400}
            height={225}
            className={styles.imago}
          />
        )}
        <div className={styles.postTexts}>
          <h3>{title}</h3>
          <p>{description}</p>
          <p className={styles.postDate}>
            {date.toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
};
