# TugaApp — Landing Page Oficial

Landing page oficial de **TugaApp**, plataforma de delivery para negocios locales en México.  
Construida con Astro (SSG), Tailwind CSS v4, GSAP + ScrollTrigger para animaciones de scroll y Lenis para smooth scroll.

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Astro](https://astro.build) | 5.x | Framework — generación estática en build time |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos utilitarios vía plugin de Vite |
| [GSAP](https://gsap.com) | 3.x | Animaciones de entrada, scroll reveal y barras animadas |
| [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | — | Animaciones vinculadas al scroll |
| [Lenis](https://lenis.darkroom.engineering) | 1.x | Smooth scroll con soporte para GSAP RAF |
| [Lucide Astro](https://lucide.dev) | 1.x | Iconografía SVG |

---

## Arquitectura

```
Build time (npm run build)
    ├── Astro compila src/pages/index.astro
    ├── Procesa todos los componentes .astro en el árbol
    ├── Tailwind CSS (vite plugin) genera CSS optimizado y purgado
    ├── GSAP + Lenis se inicializan client-side desde src/scripts/landing.ts
    └── Output: /dist — archivos estáticos listos para deploy
```

El sitio es **100% estático** — sin backend, sin llamadas a APIs en runtime.  
La interactividad (animaciones, modales, navbar) corre íntegramente en el navegador.

---

## Estructura del proyecto

```
tuga-app-official-landing/
├── public/
│   └── favicon.svg                     # Icono del sitio
├── src/
│   ├── components/
│   │   ├── brand/
│   │   │   └── TugaBrandLogo.astro     # Logotipo de texto de la marca
│   │   ├── layout/
│   │   │   ├── Navbar.astro            # Navbar fijo con menú mobile (drawer lateral)
│   │   │   └── Footer.astro            # Footer con modal dinámico por sección
│   │   ├── marketing/
│   │   │   ├── HeroSection.astro       # Hero full-viewport con social proof y modal CTA
│   │   │   ├── HowItWorks.astro        # Proceso en 4 pasos con cards animados
│   │   │   ├── AppShowcase.astro       # Features de la app (layout 2 columnas)
│   │   │   ├── PartnerSection.astro    # Sección para negocios + modal de registro
│   │   │   ├── BytePowered.astro       # Sección de infraestructura Byte con partículas
│   │   │   └── FinalCTA.astro          # CTA final con stat cards y modal de detalle mobile
│   │   └── shared/
│   │       └── SplashLoader.astro      # Pantalla de carga inicial animada
│   ├── config/
│   │   └── landing-sections.ts         # Links del navbar y section IDs para scroll spy
│   ├── layouts/
│   │   └── Layout.astro                # Layout base — head, fonts, meta
│   ├── lib/
│   │   └── random.ts                   # Números pseudo-aleatorios deterministas (SSR-safe)
│   ├── pages/
│   │   └── index.astro                 # Página principal — ensambla todos los componentes
│   ├── scripts/
│   │   └── landing.ts                  # JS del sitio: Lenis, GSAP, navbar, modales, scroll spy
│   └── styles/
│       └── globals.css                 # CSS global: tema, glass-button, dot-grid, hover rules
├── astro.config.mjs                    # Configuración de Astro (Vite + Tailwind alias @/)
├── tsconfig.json
└── package.json
```

---

## Instalación y setup local

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd tuga-app-official-landing
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
# → http://localhost:4321
```

> No se requieren variables de entorno. El sitio es completamente estático.

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build estático → /dist
npm run preview  # Preview del build en local
npm run lint     # ESLint sobre src/
```

---

## Decisiones de diseño relevantes

### Navbar mobile
El panel lateral (`#nav-mobile-panel`) y el overlay (`#nav-mobile-overlay`) están **fuera del `<nav>`** a propósito. En Chrome/Safari para Android, `backdrop-filter` en un ancestro crea un nuevo containing block para elementos `position: fixed`, rompiendo el `inset-0` del panel. Mantenerlos como siblings del `<nav>` los posiciona correctamente relativo al viewport.

### Hover en dispositivos touch
Los efectos hover están desactivados en touch mediante tres capas:
- `@media (hover: hover) and (pointer: fine)` en `globals.css` para el `glass-button`
- Prefijo `lg:hover:` / `lg:group-hover:` en los componentes Tailwind
- `@media (hover: none) { *:hover { transform: none !important } }` como red de seguridad global

### Animaciones GSAP
Las animaciones de entrada del hero se encadenan en un `gsap.timeline()` dentro de `initHeroAnimations()`. Las demás secciones usan `ScrollTrigger` con `once: true`. El RAF de Lenis alimenta a ScrollTrigger vía `ScrollTrigger.update()` en cada frame.

### Sistema de modales
Hay cuatro modales independientes, todos con el mismo patrón técnico: wrapper `hidden`→`flex` (sin opacidad en el contenedor) + transición independiente en backdrop y card via `double requestAnimationFrame`, evitando el flash de transparencia durante la apertura.

| Modal | Ubicación | Disparador |
|---|---|---|
| Coming Soon | `HeroSection.astro` | Botones de descarga (iOS / Android) |
| Stat detail | `FinalCTA.astro` | Tap en stat card (solo mobile) |
| Partner register | `PartnerSection.astro` | Botón "Registrar mi negocio" |
| Footer info | `Footer.astro` | Cualquier link del footer (14 opciones dinámicas) |

---

## Deploy en Vercel

### Opción A — Deploy automático desde GitHub (recomendado)

1. Sube el proyecto a un repositorio de GitHub
2. Importa el repositorio en [vercel.com/new](https://vercel.com/new)
3. Vercel detecta Astro automáticamente — framework preset: **Astro**
4. Haz clic en **Deploy** — no se requieren variables de entorno

### Opción B — Deploy manual con Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

> El output de `npm run build` es HTML/CSS/JS estático en `/dist`, compatible con cualquier hosting: Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, etc.

---

## Licencia

Todos los derechos reservados © 2026 TugaApp · Powered by Byte.
