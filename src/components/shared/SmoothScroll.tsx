import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "lenis/dist/lenis.css";
import { ScrollProvider, type ScrollToSectionFn } from "@/context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

const NAV_SCROLL_OFFSET = -88;

/** Segundos — usado en Navbar para suprimir scroll-spy durante el scroll programático. */
export const LENIS_ANCHOR_SCROLL_DURATION_SEC = 1.15;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToSection: ScrollToSectionFn = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset: NAV_SCROLL_OFFSET,
        duration: LENIS_ANCHOR_SCROLL_DURATION_SEC,
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const providerValue = useMemo(() => scrollToSection, [scrollToSection]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 10,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: false,
      wheelMultiplier: 0,
      touchMultiplier: 0,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Sin wrapper con transform/will-change: si no, `position:fixed` del Navbar
   * queda anclado al contenedor y desaparece al hacer scroll. Lenis usa el documento. */
  return (
    <ScrollProvider value={providerValue}>{children}</ScrollProvider>
  );
}
