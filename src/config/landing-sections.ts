/** Enlaces del navbar (sin la CTA final: “Comenzar” lleva a `#support`). */
export const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "how-it-works", label: "Cómo funciona" },
  { id: "features", label: "Experiencia" },
  { id: "partners", label: "Negocios" },
  { id: "byte", label: "Byte" },
] as const;

/** Orden para scroll spy (incluye la sección CTA al final). */
export const SECTION_IDS_FOR_SPY = [
  ...NAV_LINKS.map((n) => n.id),
  "support",
] as const;

export type NavLinkId = (typeof NAV_LINKS)[number]["id"];
