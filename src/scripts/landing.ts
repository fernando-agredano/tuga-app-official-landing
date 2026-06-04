import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION_IDS_FOR_SPY } from "@/config/landing-sections";
import { fixed, pseudoRandom } from "@/lib/random";

gsap.registerPlugin(ScrollTrigger);

const NAV_SCROLL_OFFSET = -88;
const LENIS_ANCHOR_SCROLL_DURATION_SEC = 1.15;
const SCROLL_SPY_OFFSET = 108;
const PROGRAMMATIC_SCROLL_SUPPRESS_MS =
  LENIS_ANCHOR_SCROLL_DURATION_SEC * 1000 + 120;

const NAV_BASE =
  "fixed inset-x-0 top-0 z-[200] transition-[padding,background-color,border-color,backdrop-filter,box-shadow] duration-300";
const NAV_SCROLLED =
  `${NAV_BASE} py-3.5 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]`;
const NAV_TOP =
  `${NAV_BASE} py-5 bg-transparent border-b border-transparent shadow-none`;

let lenis: Lenis | null = null;
let suppressSpy = false;
let suppressTimer: ReturnType<typeof setTimeout> | null = null;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: NAV_SCROLL_OFFSET,
      duration: LENIS_ANCHOR_SCROLL_DURATION_SEC,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (typeof window !== "undefined" && window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }
}

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

function desktopNavClass(active: boolean) {
  return `nav-desktop-link text-sm font-bold tracking-tight uppercase transition-colors border-b-2 pb-1 whitespace-nowrap ${
    active
      ? "text-tuga-brand border-tuga-brand"
      : "text-zinc-300 border-transparent hover:text-white hover:border-zinc-600"
  }`;
}

function mobileNavClass(active: boolean) {
  return `nav-mobile-link text-left text-[11px] font-semibold uppercase tracking-widest transition-colors border-l-2 pl-4 py-2.5 ${
    active
      ? "text-tuga-brand border-tuga-brand"
      : "text-zinc-300 border-transparent hover:text-white hover:border-zinc-600"
  }`;
}

function ctaDesktopClass(highlighted: boolean) {
  return `rounded-xl font-bold h-11 px-6 xl:px-7 text-sm uppercase tracking-wide shrink-0 transition-colors border hidden lg:flex ${
    highlighted
      ? "bg-tuga-brand text-white border-tuga-brand-deep/50 shadow-[0_0_24px_rgba(115,148,106,0.35)] hover:bg-tuga-brand-deep"
      : "glass-button border-white/15"
  }`;
}

function ctaMobileClass(highlighted: boolean) {
  return `rounded-full font-bold h-14 text-base border mt-3 ${
    highlighted
      ? "bg-tuga-brand text-white border-tuga-brand-deep/50 hover:bg-tuga-brand-deep"
      : "bg-white/[0.08] text-white border-white/15 hover:bg-white/15"
  }`;
}

function setNavActive(activeId: string) {
  document.querySelectorAll("[data-nav-id]").forEach((node) => {
    const el = node as HTMLElement;
    const nid = el.dataset.navId;
    if (!nid) return;
    const active = nid === activeId;
    if (el.classList.contains("nav-desktop-link")) {
      el.className = desktopNavClass(active);
    } else if (el.classList.contains("nav-mobile-link")) {
      el.className = mobileNavClass(active);
    }
  });

  const ctaHighlighted = activeId === "support";
  document.querySelectorAll("[data-cta-desktop]").forEach((node) => {
    (node as HTMLElement).className = ctaDesktopClass(ctaHighlighted);
  });
  document.querySelectorAll("[data-cta-mobile]").forEach((node) => {
    (node as HTMLElement).className = ctaMobileClass(ctaHighlighted);
  });
}

function updateNavBar() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  const scrolled = window.scrollY > 8;
  nav.className = scrolled ? NAV_SCROLLED : NAV_TOP;

  if (suppressSpy) return;
  setNavActive(computeSpySectionId());
}

function openMobileMenu() {
  const panel = document.getElementById("nav-mobile-panel");
  const overlay = document.getElementById("nav-mobile-overlay");
  const iconMenu = document.getElementById("nav-icon-menu");
  const iconClose = document.getElementById("nav-icon-close");
  const toggle = document.getElementById("nav-mobile-toggle");

  panel?.classList.remove("translate-x-full");
  panel?.setAttribute("aria-hidden", "false");
  toggle?.setAttribute("aria-expanded", "true");
  iconMenu?.classList.add("hidden");
  iconClose?.classList.remove("hidden");

  overlay?.classList.remove("opacity-0", "pointer-events-none");
  overlay?.classList.add("opacity-100");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const panel = document.getElementById("nav-mobile-panel");
  const overlay = document.getElementById("nav-mobile-overlay");
  const iconMenu = document.getElementById("nav-icon-menu");
  const iconClose = document.getElementById("nav-icon-close");
  const toggle = document.getElementById("nav-mobile-toggle");

  panel?.classList.add("translate-x-full");
  panel?.setAttribute("aria-hidden", "true");
  toggle?.setAttribute("aria-expanded", "false");
  iconMenu?.classList.remove("hidden");
  iconClose?.classList.add("hidden");

  overlay?.classList.add("opacity-0", "pointer-events-none");
  overlay?.classList.remove("opacity-100");
  document.body.style.overflow = "";
}

function handleNavClick(e: Event, id: string) {
  e.preventDefault();
  if (suppressTimer) {
    clearTimeout(suppressTimer);
    suppressTimer = null;
  }
  setNavActive(id);
  suppressSpy = true;
  scrollToSection(id);
  closeMobileMenu();

  suppressTimer = setTimeout(() => {
    suppressSpy = false;
    suppressTimer = null;
    setNavActive(computeSpySectionId());
  }, PROGRAMMATIC_SCROLL_SUPPRESS_MS);
}

function initNavbar() {
  document.querySelectorAll("[data-scroll-to]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.scrollTo;
      if (id) handleNavClick(e, id);
    });
  });

  const toggle = document.getElementById("nav-mobile-toggle");
  const overlay = document.getElementById("nav-mobile-overlay");
  const panel = document.getElementById("nav-mobile-panel");

  toggle?.addEventListener("click", () => {
    const closed = panel?.classList.contains("translate-x-full");
    if (closed) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  overlay?.addEventListener("click", () => {
    closeMobileMenu();
  });

  updateNavBar();
  window.addEventListener("scroll", updateNavBar, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMobileMenu();
    updateNavBar();
  }, { passive: true });
}

function initScrollToHash() {
  const hash = window.location.hash.slice(1);
  if (!hash || !document.getElementById(hash)) return;
  window.setTimeout(() => scrollToSection(hash), 160);
}

function initLenis() {
  lenis = new Lenis({
    duration: 10,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: false,
    wheelMultiplier: 0,
    touchMultiplier: 0,
    infinite: false,
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function initHeroAnimations() {
  const root = document.getElementById("hero-section");
  if (!root) return;

  const badge = root.querySelector("[data-hero-badge]");
  const title = root.querySelector("[data-hero-title]");
  const sub = root.querySelector("[data-hero-sub]");
  const cta = root.querySelector("[data-hero-cta]");
  const stats = root.querySelector("[data-hero-stats]");

  const tl = gsap.timeline();
  tl.fromTo(
    badge,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: 0.25 },
  )
    .fromTo(
      title,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.2",
    )
    .fromTo(
      sub,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
      "-=0.45",
    )
    .fromTo(
      cta,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.35",
    )
    .fromTo(
      stats,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.25",
    );
}

function initHowItWorks() {
  const container = document.getElementById("how-it-works");
  if (!container) return;

  gsap.context(() => {
    gsap.fromTo(
      ".how-card",
      { opacity: 0, y: 24, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: "top 72%",
          once: true,
        },
      },
    );
  }, container);
}

function initAppShowcase() {
  const container = document.getElementById("features");
  const block = container?.querySelector("[data-explora-animate]");
  if (!container || !block) return;

  gsap.context(() => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 72%",
          once: true,
        },
      },
    );
  }, container);
}

function initBytePowered() {
  const container = document.getElementById("byte");
  if (!container) return;

  const glow = container.querySelector("[data-byte-glow]");

  gsap.context(() => {
    gsap.fromTo(
      glow,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 0.18,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".byte-card",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: container,
          start: "top 72%",
          once: true,
        },
      },
    );

    container.querySelectorAll<HTMLElement>(".byte-particle").forEach((particle, index) => {
      const xMove = fixed(-20 + pseudoRandom(index + 101) * 40);
      const yMove = fixed(-20 + pseudoRandom(index + 201) * 40);
      const baseOpacity = fixed(0.08 + pseudoRandom(index + 301) * 0.14);
      const targetOpacity = fixed(0.18 + pseudoRandom(index + 401) * 0.2);
      const baseScale = fixed(0.7 + pseudoRandom(index + 501) * 0.3);
      const targetScale = fixed(0.9 + pseudoRandom(index + 601) * 0.35);
      const duration = fixed(3 + pseudoRandom(index + 701) * 3);
      const delay = fixed(pseudoRandom(index + 801) * 1.5);

      gsap.set(particle, {
        opacity: baseOpacity,
        scale: baseScale,
      });

      gsap.to(particle, {
        x: xMove,
        y: yMove,
        opacity: targetOpacity,
        scale: targetScale,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, container);
}

function initFinalCTA() {
  gsap.fromTo(
    ".stat-card",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      delay: 0.05,
    },
  );

  gsap.fromTo(
    ".chart-bar-fill",
    { height: "0%" },
    {
      height: (_, target) => target.getAttribute("data-height") ?? "0%",
      duration: 1,
      stagger: 0.04,
      ease: "power3.out",
      delay: 0.25,
    },
  );
}

function runSplash(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.getElementById("splash-overlay");
    const logo = document.getElementById("splash-logo");
    const byteEl = document.getElementById("splash-byte");

    if (!overlay || !logo || !byteEl) {
      resolve();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            overlay.classList.add("hidden");
            overlay.setAttribute("aria-hidden", "true");
            resolve();
          },
        });
      },
    });

    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.9, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power4.out" },
    ).fromTo(
      byteEl,
      { opacity: 0, y: 8 },
      { opacity: 0.6, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.45",
    );

    tl.to({}, { duration: 0.5 });
  });
}

export async function initLanding() {
  const mainShell = document.getElementById("main-shell");
  const siteNav = document.getElementById("site-nav");

  initLenis();
  await runSplash();

  siteNav?.classList.remove("invisible");
  mainShell?.classList.remove("opacity-0", "pointer-events-none");
  mainShell?.classList.add("opacity-100");

  initNavbar();
  initScrollToHash();
  initHeroAnimations();
  initHowItWorks();
  initAppShowcase();
  initBytePowered();
  initFinalCTA();

  ScrollTrigger.refresh();
}
