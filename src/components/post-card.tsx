import Link from "next/link";
import Image from "next/image";
import styles from "./post-card.module.css";

export type PostCardProps = {
  path: string;
  image?: string;
  title: string;
  description: string;
  date: Date;
  category?: string;
};

export const PostCard = ({
  path,
  image,
  title,
  description,
  date,
  category,
}: PostCardProps) => {
  return (
    <div className={styles.postCard}>
      <Link className={styles.cardLink} href={`/aktualnosci/${path}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            width={400}
            height={225}
            className={styles.imago}
          />
        )}
        {!image && (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span>{category || "E-zin"}</span>
            <i />
          </div>
        )}
        <div className={styles.postTexts}>
          <div className={styles.postMeta}>
            <span className={styles.category}>{category || "Artykuł"}</span>
            <time dateTime={date.toISOString()} className={styles.postDate}>
              {date.toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>
          <h2 className={styles.postTitle}>{title}</h2>
          <p className={styles.postDescription}>{description}</p>
          <span className={styles.readMore}>Czytaj artykuł <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </div>
  );
};
