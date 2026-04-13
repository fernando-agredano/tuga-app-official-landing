import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { TugaBrandLogo } from "@/components/brand/tuga-brand-logo";
import { Menu, X } from "lucide-react";
import { useScrollToSection } from "@/context/ScrollContext";
import { LENIS_ANCHOR_SCROLL_DURATION_SEC } from "@/components/shared/SmoothScroll";
import { NAV_LINKS, SECTION_IDS_FOR_SPY } from "@/config/landing-sections";

const SCROLL_SPY_OFFSET = 108;

const PROGRAMMATIC_SCROLL_SUPPRESS_MS =
  LENIS_ANCHOR_SCROLL_DURATION_SEC * 1000 + 120;

function computeSpySectionId(): string {
  const scrollPos = window.scrollY;
  let current = SECTION_IDS_FOR_SPY[0];

  for (const id of SECTION_IDS_FOR_SPY) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (scrollPos + SCROLL_SPY_OFFSET >= top) {
      current = id;
    }
  }

  return current;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0].id);

  const scrollToSection = useScrollToSection();
  const suppressSpyRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavClick = useCallback(
    (e: MouseEvent, id: string) => {
      e.preventDefault();

      if (suppressTimerRef.current) {
        clearTimeout(suppressTimerRef.current);
        suppressTimerRef.current = null;
      }

      setActiveId(id);
      suppressSpyRef.current = true;
      scrollToSection(id);
      setMobileMenuOpen(false);

      suppressTimerRef.current = setTimeout(() => {
        suppressSpyRef.current = false;
        suppressTimerRef.current = null;
        setActiveId(computeSpySectionId());
      }, PROGRAMMATIC_SCROLL_SUPPRESS_MS);
    },
    [scrollToSection],
  );

  useEffect(() => {
    const updateActive = () => {
      setIsScrolled(window.scrollY > 8);

      if (suppressSpyRef.current) {
        return;
      }

      setActiveId(computeSpySectionId());
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const ctaHighlighted = activeId === "support";

  const navLinkClass = (active: boolean) =>
    `text-sm font-bold tracking-tight uppercase transition-colors border-b-2 pb-1 whitespace-nowrap ${
      active
        ? "text-tuga-brand border-tuga-brand"
        : "text-zinc-300 border-transparent hover:text-white hover:border-zinc-600"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] transition-[padding,background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        isScrolled
          ? "py-3.5 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          : "py-5 bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="relative z-[110] container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 min-h-[3rem]">
          <TugaBrandLogo
            className="shrink-0 py-0.5"
            onClick={(e) => handleNavClick(e, "inicio")}
          />

          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-end gap-x-5 xl:gap-x-7 flex-1 min-w-0">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={navLinkClass(activeId === id)}
              >
                {label}
              </a>
            ))}

            <Button
              type="button"
              className={`rounded-full font-bold h-11 px-6 xl:px-7 text-sm uppercase tracking-wide shrink-0 transition-colors border ${
                ctaHighlighted
                  ? "bg-tuga-brand text-white border-tuga-brand-deep/50 shadow-[0_0_24px_rgba(115,148,106,0.35)] hover:bg-tuga-brand-deep"
                  : "glass-button border-white/15"
              }`}
              onClick={(e) => handleNavClick(e, "support")}
            >
              Comenzar
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden text-white transition-colors hover:text-tuga-brand p-1.5 shrink-0 -mr-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[105] bg-black/95 backdrop-blur-sm transition-transform duration-500 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } pt-[5.25rem] px-8 overflow-y-auto`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-4 max-w-md mx-auto pb-16">
          {NAV_LINKS.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`text-left text-2xl font-black tracking-tight transition-colors border-l-4 pl-4 py-1.5 ${
                  active
                    ? "text-tuga-brand border-tuga-brand"
                    : "text-white border-transparent hover:text-tuga-brand"
                }`}
              >
                {label}
              </a>
            );
          })}

          <Button
            type="button"
            className={`rounded-full font-bold h-14 text-base border mt-3 ${
              ctaHighlighted
                ? "bg-tuga-brand text-white border-tuga-brand-deep/50 hover:bg-tuga-brand-deep"
                : "bg-white/[0.08] text-white border-white/15 hover:bg-white/15"
            }`}
            onClick={(e) => handleNavClick(e, "support")}
          >
            COMENZAR
          </Button>
        </div>
      </div>
    </nav>
  );
}
