"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useServerInsertedHTML } from "next/navigation";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

/* Anti-FOUC: set class sebelum React hydrate. Di-inject lewat useServerInsertedHTML
   (di luar tree React) sehingga React 19 tidak memperingatkan soal <script>. */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t==="dark";document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})();`;

/* Sumber kebenaran tema = class "dark" pada <html> (di-set oleh THEME_INIT_SCRIPT
   maupun setTheme). resolvedTheme dibaca lewat useSyncExternalStore sehingga
   selalu mencerminkan DOM tanpa setState dalam effect. */
function getThemeFromDOM(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeThemeChange(cb: () => void) {
  window.addEventListener("themechange", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("themechange", cb);
    window.removeEventListener("storage", cb);
  };
}

function getThemeSnapshot(): Theme {
  return getThemeFromDOM();
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

function notifyThemeChange() {
  window.dispatchEvent(new Event("themechange"));
}

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

  const pathname = usePathname();

  const resolvedTheme = useSyncExternalStore(
    subscribeThemeChange,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  /* Terapkan preferensi dari localStorage ke DOM. Murni update external system
     (tanpa setState) sehingga lolos react-hooks/set-state-in-effect. */
  const applyStoredThemeToDOM = useCallback(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    const dark = stored === "dark";
    const el = document.documentElement;
    el.classList.toggle("dark", dark);
    el.style.colorScheme = dark ? "dark" : "light";
  }, []);

  // Sinkronkan tema dari tab lain (storage event) ke DOM.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        applyStoredThemeToDOM();
        notifyThemeChange();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [applyStoredThemeToDOM]);

  // Re-assert setelah navigasi (sebelum paint) — mencegah flash light saat ganti bahasa.
  useLayoutEffect(() => {
    applyStoredThemeToDOM();
    notifyThemeChange();
  }, [pathname, applyStoredThemeToDOM]);

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
        notifyThemeChange();
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
    () => ({ theme: resolvedTheme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
