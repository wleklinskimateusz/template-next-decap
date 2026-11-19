"use client";

import { useEffect } from "react";
import { ColorEditor } from "@/components/color-editor";
import { useColorSession } from "@/components/color-session";
import styles from "./page.module.css";

export default function ColorsPage() {
  const { activate } = useColorSession();

  useEffect(() => {
    activate();
  }, [activate]);

  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>Personalizacja strony</p>
      <h1 className={styles.title}>Kolory</h1>
      <p className={styles.intro}>
        Przypisz kolory z palety do elementów strony. Wybór pozostanie aktywny do końca bieżącej
        sesji przeglądarki.
      </p>
      <ColorEditor />
    </section>
  );
}
