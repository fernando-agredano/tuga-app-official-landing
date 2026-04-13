import { useEffect } from "react";
import { useScrollToSection } from "@/context/ScrollContext";

/**
 * Si la URL trae hash (#seccion), hace scroll tras cargar el contenido (p. ej. tras el splash).
 */
export function ScrollToHash({ whenReady }: { whenReady: boolean }) {
  const scrollTo = useScrollToSection();

  useEffect(() => {
    if (!whenReady || typeof window === "undefined") return;

    const hash = window.location.hash.slice(1);
    if (!hash || !document.getElementById(hash)) return;

    const t = window.setTimeout(() => {
      scrollTo(hash);
    }, 160);

    return () => window.clearTimeout(t);
  }, [whenReady, scrollTo]);

  return null;
}
