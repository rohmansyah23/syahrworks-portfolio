"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useServerInsertedHTML } from "next/navigation";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

/* Anti-FOUC: set class sebelum React hydrate. Di-inject lewat useServerInsertedHTML
   (di luar tree React) sehingga React 19 tidak memperingatkan soal <script>. */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t==="dark";document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})();`;

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
});

type ThemeProviderProps = {
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  children: ReactNode;
};

export function ThemeProvider({
  disableTransitionOnChange = false,
  children,
}: ThemeProviderProps) {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
  ));

  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const applyFromDOM = () => {
      setThemeState(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    };
    applyFromDOM();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) applyFromDOM();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      const apply = () => {
        const dark = next === "dark";
        const el = document.documentElement;
        el.classList.toggle("dark", dark);
        el.style.colorScheme = next;
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {}
        setThemeState(next);
      };

      if (!disableTransitionOnChange) {
        apply();
        return;
      }

      const style = document.createElement("style");
      style.textContent =
        "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
      document.head.appendChild(style);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          apply();
          window.getComputedStyle(document.body);
          style.remove();
        });
      });
    },
    [disableTransitionOnChange]
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme: theme, setTheme }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
