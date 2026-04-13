# TugaApp — sitio oficial

Landing estática construida con [Astro](https://astro.build) y React (islands) para animaciones y UI interactiva.

## Desarrollo

```bash
npm install
npm run dev
```

Abre la URL que muestre la terminal (por defecto `http://localhost:4321`).

## Scripts

| Comando        | Descripción              |
| -------------- | ------------------------ |
| `npm run dev`    | Servidor de desarrollo   |
| `npm run build`  | Genera `dist/` (estático) |
| `npm run preview`| Previsualiza el build    |
| `npm run lint`   | ESLint sobre `src/`      |

## Despliegue

El resultado de `npm run build` es HTML/CSS/JS estático en `dist/`, listo para cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, S3, etc.).
