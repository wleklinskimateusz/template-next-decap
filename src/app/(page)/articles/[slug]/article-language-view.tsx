"use client";

import { useState, type ReactNode } from "react";
import styles from "./page.module.css";

type ArticleVersion = {
  content: ReactNode;
};

export function ArticleLanguageView({
  original,
  polish,
  originalLanguage,
  image,
  category,
  date,
}: {
  original: ArticleVersion;
  polish?: ArticleVersion;
  originalLanguage?: string;
  image: ReactNode;
  category?: string;
  date: Date;
}) {
  const [showPolish, setShowPolish] = useState(Boolean(polish));
  const current = showPolish && polish ? polish : original;

  return (
    <>
      <header className={styles.articleHeader}>
        {image}
        <p className={styles.eyebrow}>{category || "Czytaj szerzej"}</p>
        {polish && (
          <div className={styles.languageSwitch}>
            <span>Wersja artykułu:</span>
            <button
              type="button"
              aria-pressed={showPolish}
              onClick={() => setShowPolish(true)}
            >
              Polski
            </button>
            <button
              type="button"
              aria-pressed={!showPolish}
              onClick={() => setShowPolish(false)}
            >
              Oryginał{originalLanguage ? ` (${originalLanguage.toUpperCase()})` : ""}
            </button>
          </div>
        )}
        <div className={styles.meta}>
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </header>
      <div className={styles.content}>{current.content}</div>
    </>
  );
}
