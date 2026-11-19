"use client";

import { useMemo, useState } from "react";
import {
  colorPalette,
  colorRoles,
  getColorValue,
  isHexColor,
  useColorSession,
} from "./color-session";
import styles from "./color-editor.module.css";

export function ColorEditor({ compact = false }: { compact?: boolean }) {
  const {
    assignments,
    setAssignment,
    heroImageEnabled,
    setHeroImageEnabled,
    resetAssignments,
    storageError,
  } = useColorSession();
  const [copyStatus, setCopyStatus] = useState("");

  const exportCss = useMemo(() => {
    const valueForRole = (roleId: (typeof colorRoles)[number]["id"], defaultValue: string) => {
      const selectedColor = assignments[roleId];
      if (!selectedColor) {
        return defaultValue;
      }
      if (selectedColor.startsWith("#")) {
        return selectedColor;
      }
      const paletteColor = colorPalette.find((color) => color.id === selectedColor);
      return paletteColor ? `var(${paletteColor.variable})` : defaultValue;
    };

    const declarations = [
      `  --color-accent: ${valueForRole("accent", "var(--palette-burnt-orange)")};`,
      `  --color-accent-dark: ${valueForRole("accent-dark", "var(--palette-rust)")};`,
      `  --color-gold: ${valueForRole("gold", "var(--palette-ochre)")};`,
      `  --color-blue: ${valueForRole("blue", "var(--palette-electric-blue)")};`,
      "  --primary-color: var(--color-accent);",
      `  --color-ink: ${valueForRole("ink", "#111111")};`,
      `  --color-muted: ${valueForRole("muted", "#5a514f")};`,
      `  --color-paper: ${valueForRole("paper", "var(--palette-warm-white)")};`,
      `  --color-surface: ${valueForRole("surface", "#f8f3ee")};`,
      `  --color-line: ${valueForRole("line", "#d9c8bd")};`,
      `  --color-code: ${valueForRole("code", "#f4efe8")};`,
      `  --color-hero-background: ${valueForRole("hero-background", "transparent")};`,
      `  --color-hero-text: ${valueForRole("hero-text", "var(--palette-rust)")};`,
      '  --font-body: "Lato", "Helvetica Neue", Arial, sans-serif;',
      '  --font-display: "Figtree", "Helvetica Neue", Arial, sans-serif;',
      "  --content-width: 1200px;",
      "  --reading-width: 760px;",
      "  --radius-card: 1.15rem;",
      "  color-scheme: light;",
    ];

    if (!heroImageEnabled) declarations.push("  --hero-background-image: none;");

    return [
      "/* Paste at the end of globals.css to make these the defaults. */",
      ":root {",
      ...declarations,
      "}",
    ].join("\n");
  }, [assignments, heroImageEnabled]);

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportCss);
      setCopyStatus("CSS skopiowano do schowka.");
    } catch (error) {
      console.error("Unable to copy the color CSS export.", error);
      setCopyStatus("Nie udało się skopiować. Zaznacz i skopiuj kod z pola poniżej.");
    }
  };

  return (
    <div className={`${styles.editor} ${compact ? styles.compact : ""}`}>
      <div className={styles.heading}>
        <p className={styles.description}>
          Wybierz kolor z palety albo ustaw własny. Zmiany pozostaną aktywne do końca bieżącej sesji
          przeglądarki.
        </p>
        <button className={styles.reset} type="button" onClick={resetAssignments}>
          Przywróć domyślne kolory
        </button>
      </div>
      <div className={styles.roles}>
        {colorRoles.map((role) => {
          const selectedColor = assignments[role.id];
          const isHeroBackground = role.id === "hero-background";
          const customColor =
            selectedColor && selectedColor.startsWith("#")
              ? selectedColor
              : role.defaultColor;

          return (
            <section className={styles.role} key={role.id} aria-label={role.label}>
              <div className={styles.roleHeader}>
                <span className={styles.roleName}>{role.label}</span>
                {isHeroBackground && (
                  <div className={styles.backgroundOptions}>
                    <button
                      className={`${styles.imageOption} ${heroImageEnabled ? styles.selectedOption : ""}`}
                      type="button"
                      aria-pressed={heroImageEnabled}
                      onClick={() => setHeroImageEnabled(true)}
                    >
                      Obraz włączony
                    </button>
                    <button
                      className={`${styles.imageOption} ${!heroImageEnabled ? styles.selectedOption : ""}`}
                      type="button"
                      aria-pressed={!heroImageEnabled}
                      onClick={() => setHeroImageEnabled(false)}
                    >
                      Usuń obraz
                    </button>
                    <button
                      className={styles.imageOption}
                      type="button"
                      aria-label="Przywróć domyślny obraz bez zmiany koloru tła"
                      onClick={() => {
                        setAssignment(role.id, null);
                        setHeroImageEnabled(true);
                      }}
                    >
                      Tylko obraz
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.picker}>
                <div className={styles.swatches} aria-label={`Paleta: ${role.label}`}>
                  {colorPalette.map((color) => (
                    <button
                      className={`${styles.swatch} ${selectedColor === color.id ? styles.selectedSwatch : ""}`}
                      key={color.id}
                      type="button"
                      aria-label={color.name}
                      aria-pressed={selectedColor === color.id}
                      title={color.name}
                      style={{ backgroundColor: `var(${color.variable})` }}
                      onClick={() => setAssignment(role.id, color.id)}
                    />
                  ))}
                </div>
                <label className={styles.customColor}>
                  <span>Własny kolor</span>
                  <input
                    aria-label={`Wybierz własny kolor: ${role.label}`}
                    type="color"
                    value={customColor}
                    onChange={(event) => {
                      if (isHexColor(event.target.value)) {
                        setAssignment(role.id, event.target.value);
                      }
                    }}
                  />
                </label>
                {selectedColor && (
                  <span className={styles.currentValue}>
                    {selectedColor.startsWith("#")
                      ? selectedColor.toUpperCase()
                      : colorPalette.find((color) => color.id === selectedColor)?.name}
                  </span>
                )}
                {!selectedColor && !isHeroBackground && (
                  <span className={styles.currentValue}>Domyślny</span>
                )}
                {selectedColor && (
                  <span
                    aria-hidden="true"
                    className={styles.preview}
                    style={{ backgroundColor: getColorValue(selectedColor) }}
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>
      {!compact && (
        <section className={styles.export} aria-labelledby="color-export-title">
          <div className={styles.exportHeader}>
            <div>
              <h2 className={styles.exportTitle} id="color-export-title">
                Eksportuj kolory
              </h2>
              <p className={styles.exportDescription}>
                Wklej wygenerowane zmienne na końcu <code>src/app/globals.css</code>, aby zachować
                te ustawienia jako domyślne.
              </p>
            </div>
            <button
              className={styles.reset}
              type="button"
              onClick={copyExport}
              disabled={!exportCss}
            >
              Kopiuj CSS
            </button>
          </div>
          <textarea
            className={styles.exportCode}
            aria-label="Wygenerowany CSS dla wybranych kolorów"
            readOnly
            value={exportCss}
            placeholder="Wybierz kolory lub zmień ustawienie obrazu, aby wygenerować CSS."
            rows={Math.max(3, exportCss.split("\n").length)}
            onFocus={(event) => event.currentTarget.select()}
          />
          {copyStatus && (
            <p className={styles.exportStatus} role="status">
              {copyStatus}
            </p>
          )}
        </section>
      )}
      {storageError && (
        <p className={styles.error} role="status">
          {storageError}
        </p>
      )}
    </div>
  );
}
