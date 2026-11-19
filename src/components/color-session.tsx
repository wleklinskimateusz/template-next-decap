"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { ColorEditor } from "./color-editor";
import styles from "./color-session.module.css";

export const colorPalette = [
  { id: "electric-blue", name: "Elektryczny błękit", variable: "--palette-electric-blue", hex: "#2b42f2" },
  { id: "ochre", name: "Ochra", variable: "--palette-ochre", hex: "#947b00" },
  { id: "burnt-orange", name: "Spalona pomarańcza", variable: "--palette-burnt-orange", hex: "#cc561b" },
  { id: "sky-blue", name: "Błękit nieba", variable: "--palette-sky-blue", hex: "#95cde8" },
  { id: "warm-white", name: "Ciepła biel", variable: "--palette-warm-white", hex: "#eeeae2" },
  { id: "rust", name: "Rdza", variable: "--palette-rust", hex: "#7b2e21" },
  { id: "chartreuse", name: "Żółtozielony", variable: "--palette-chartreuse", hex: "#d1d066" },
  { id: "periwinkle", name: "Barwinek", variable: "--palette-periwinkle", hex: "#b9c7f8" },
  { id: "golden-ochre", name: "Złota ochra", variable: "--palette-golden-ochre", hex: "#a87b00" },
  { id: "sienna", name: "Sjena", variable: "--palette-sienna", hex: "#7f4a16" },
] as const;

export const colorRoles = [
  { id: "accent", label: "Kolor akcentowy", variable: "--color-accent", defaultColor: "#cc561b" },
  { id: "accent-dark", label: "Ciemny akcent", variable: "--color-accent-dark", defaultColor: "#7b2e21" },
  { id: "gold", label: "Złoty akcent", variable: "--color-gold", defaultColor: "#947b00" },
  { id: "blue", label: "Niebieski akcent", variable: "--color-blue", defaultColor: "#2b42f2" },
  { id: "paper", label: "Tło strony", variable: "--color-paper", defaultColor: "#eeeae2" },
  { id: "surface", label: "Tło kart i powierzchni", variable: "--color-surface", defaultColor: "#f8f3ee" },
  { id: "ink", label: "Tekst", variable: "--color-ink", defaultColor: "#111111" },
  { id: "muted", label: "Tekst pomocniczy", variable: "--color-muted", defaultColor: "#5a514f" },
  { id: "line", label: "Obramowania", variable: "--color-line", defaultColor: "#d9c8bd" },
  { id: "code", label: "Bloki kodu", variable: "--color-code", defaultColor: "#f4efe8" },
  { id: "hero-background", label: "Tło sekcji głównej", variable: "--color-hero-background", defaultColor: "#eeeae2" },
  { id: "hero-text", label: "Tekst sekcji głównej", variable: "--color-hero-text", defaultColor: "#7b2e21" },
] as const;

export type ColorRoleId = (typeof colorRoles)[number]["id"];
export type PaletteColorId = (typeof colorPalette)[number]["id"];
type ColorValue = PaletteColorId | `#${string}`;
type ColorAssignments = Partial<Record<ColorRoleId, ColorValue>>;

type ColorSessionContextValue = {
  assignments: ColorAssignments;
  setAssignment: (role: ColorRoleId, color: ColorValue | null) => void;
  heroImageEnabled: boolean;
  setHeroImageEnabled: (enabled: boolean) => void;
  resetAssignments: () => void;
  activate: () => void;
  storageError: string | null;
};

const ASSIGNMENTS_KEY = "color-assignments";
const ACTIVE_KEY = "color-picker-active";
const HERO_IMAGE_KEY = "hero-background-image-enabled";
type SessionSnapshot = {
  assignments: ColorAssignments;
  heroImageEnabled: boolean;
  active: boolean;
  storageError: string | null;
};

const ColorSessionContext = createContext<ColorSessionContextValue | null>(null);
const serverSnapshot: SessionSnapshot = {
  assignments: {},
  heroImageEnabled: true,
  active: false,
  storageError: null,
};
let sessionSnapshot: SessionSnapshot | null = null;
const sessionListeners = new Set<() => void>();

function isPaletteColorId(value: unknown): value is PaletteColorId {
  return colorPalette.some((color) => color.id === value);
}

export function isHexColor(value: string): value is `#${string}` {
  return /^#[\da-f]{6}$/i.test(value);
}

function isColorValue(value: unknown): value is ColorValue {
  return isPaletteColorId(value) || (typeof value === "string" && isHexColor(value));
}

function getPaletteVariable(colorId: PaletteColorId) {
  return colorPalette.find((color) => color.id === colorId)?.variable;
}

export function getColorValue(color: ColorValue) {
  return isPaletteColorId(color) ? `var(${getPaletteVariable(color)})` : color;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function applyAssignments(assignments: ColorAssignments) {
  for (const role of colorRoles) {
    const color = assignments[role.id];
    const rootStyle = document.documentElement.style;

    if (color) {
      rootStyle.setProperty(role.variable, getColorValue(color));
    } else {
      rootStyle.removeProperty(role.variable);
    }
  }
}

function applyHeroImage(enabled: boolean) {
  const rootStyle = document.documentElement.style;
  if (enabled) {
    rootStyle.removeProperty("--hero-background-image");
  } else {
    rootStyle.setProperty("--hero-background-image", "none");
  }
}

function getSessionSnapshot(): SessionSnapshot {
  if (typeof window === "undefined") {
    return serverSnapshot;
  }
  if (sessionSnapshot) {
    return sessionSnapshot;
  }

  const assignments: ColorAssignments = {};
  let heroImageEnabled = true;
  let active = false;
  let storageError: string | null = null;
  try {
    const storedAssignments = sessionStorage.getItem(ASSIGNMENTS_KEY);
    if (storedAssignments) {
      const parsed: unknown = JSON.parse(storedAssignments);
      if (!isRecord(parsed)) {
        throw new Error("Saved color assignments must be an object.");
      }

      for (const role of colorRoles) {
        const value = parsed[role.id];
        if (isColorValue(value)) {
          assignments[role.id] = value;
        }
      }
    }
    heroImageEnabled = sessionStorage.getItem(HERO_IMAGE_KEY) !== "false";
    active = sessionStorage.getItem(ACTIVE_KEY) === "true";
  } catch (error) {
    console.error("Unable to restore the color editor session.", error);
    storageError = "Nie udało się przywrócić kolorów zapisanych w tej sesji.";
  }

  sessionSnapshot = { assignments, heroImageEnabled, active, storageError };
  return sessionSnapshot;
}

function subscribeToSession(listener: () => void) {
  sessionListeners.add(listener);
  return () => {
    sessionListeners.delete(listener);
  };
}

function publishSessionSnapshot(snapshot: SessionSnapshot) {
  sessionSnapshot = snapshot;
  sessionListeners.forEach((listener) => listener());
}

function activateColorEditor() {
  const current = getSessionSnapshot();
  let storageError: string | null = null;
  try {
    sessionStorage.setItem(ACTIVE_KEY, "true");
  } catch (error) {
    console.error("Unable to activate the color editor for this session.", error);
    storageError = "Nie udało się zachować aktywności edytora kolorów w tej sesji.";
  }
  publishSessionSnapshot({ ...current, active: true, storageError });
}

function updateColorAssignment(roleId: ColorRoleId, color: ColorValue | null) {
  const current = getSessionSnapshot();
  const assignments = { ...current.assignments };
  if (color) {
    assignments[roleId] = color;
  } else {
    delete assignments[roleId];
  }
  applyAssignments(assignments);

  let storageError: string | null = null;
  try {
    if (Object.keys(assignments).length > 0) {
      sessionStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
    } else {
      sessionStorage.removeItem(ASSIGNMENTS_KEY);
    }
  } catch (error) {
    console.error("Unable to save a color assignment for this session.", error);
    storageError = "Zmiana koloru jest aktywna, ale nie udało się jej zapisać w tej sesji.";
  }
  publishSessionSnapshot({ ...current, assignments, storageError });
}

function updateHeroImageEnabled(enabled: boolean) {
  const current = getSessionSnapshot();
  applyHeroImage(enabled);

  let storageError: string | null = null;
  try {
    if (enabled) {
      sessionStorage.removeItem(HERO_IMAGE_KEY);
    } else {
      sessionStorage.setItem(HERO_IMAGE_KEY, "false");
    }
  } catch (error) {
    console.error("Unable to save the hero image setting for this session.", error);
    storageError = "Ustawienie obrazu jest aktywne, ale nie udało się go zapisać w tej sesji.";
  }
  publishSessionSnapshot({ ...current, heroImageEnabled: enabled, storageError });
}

function resetColorAssignments() {
  const current = getSessionSnapshot();
  let storageError: string | null = null;
  try {
    sessionStorage.removeItem(ASSIGNMENTS_KEY);
  } catch (error) {
    console.error("Unable to reset the saved color assignments.", error);
    storageError = "Kolory przywrócono, ale nie udało się wyczyścić ustawień sesji.";
  }
  applyAssignments({});
  applyHeroImage(true);
  try {
    sessionStorage.removeItem(HERO_IMAGE_KEY);
  } catch (error) {
    console.error("Unable to reset the hero image setting.", error);
    storageError = "Kolory przywrócono, ale nie udało się przywrócić obrazu tła.";
  }
  publishSessionSnapshot({ ...current, assignments: {}, heroImageEnabled: true, storageError });
}

export function useColorSession() {
  const context = useContext(ColorSessionContext);
  if (!context) {
    throw new Error("useColorSession must be used within ColorSessionProvider");
  }
  return context;
}

export function ColorSessionProvider({ children }: { children: ReactNode }) {
  const [dockOpen, setDockOpen] = useState(false);
  const pathname = usePathname();
  const session = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    () => serverSnapshot,
  );
  const activate = activateColorEditor;

  const contextValue = useMemo(
    () => ({
      assignments: session.assignments,
      setAssignment: updateColorAssignment,
      heroImageEnabled: session.heroImageEnabled,
      setHeroImageEnabled: updateHeroImageEnabled,
      resetAssignments: resetColorAssignments,
      activate,
      storageError: session.storageError,
    }),
    [session, activate],
  );

  useEffect(() => {
    applyAssignments(session.assignments);
  }, [session.assignments]);

  useEffect(() => {
    applyHeroImage(session.heroImageEnabled);
  }, [session.heroImageEnabled]);

  return (
    <ColorSessionContext.Provider value={contextValue}>
      {children}
      {session.active && pathname !== "/colors" && (
        <aside className={styles.dock}>
          {dockOpen && (
            <section className={styles.panel} aria-label="Edytor kolorów">
              <ColorEditor compact />
            </section>
          )}
          <button
            className={styles.toggle}
            type="button"
            aria-expanded={dockOpen}
            onClick={() => setDockOpen((open) => !open)}
          >
            {dockOpen ? "Zamknij kolory" : "Edytuj kolory"}
          </button>
        </aside>
      )}
    </ColorSessionContext.Provider>
  );
}
