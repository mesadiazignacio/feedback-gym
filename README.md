# Feedback — Landing page

Landing de la cadena de gimnasios **Feedback** (Ituzaingó · Castelar · San Antonio de Padua).
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Sitio estático, sin backend.

---

## ⚠ Antes de publicar: tres cosas para cerrar

### 1. Los precios

La estructura ya está armada (1 mes / 3 meses × efectivo / débito automático). Faltan los montos.
Están en un solo lugar: **`src/content/site.ts` → `planes`**.

```ts
export const planes: Plan[] = [
  {
    id: "mensual",
    plazo: "Pago de 1 mes",
    opciones: [
      { forma: "Efectivo",           precio: "$00.000", ... },  // ← reemplazar
      { forma: "Débito automático",  precio: "$00.000", ... },  // ← reemplazar
    ],
  },
  ...
];
```

Mientras el valor sea `PRECIO_PENDIENTE`, la página muestra **"Consultanos"** en vez de un número
inventado. No hace falta tocar nada más: el formato y el layout se arman solos.

### 2. La grilla de clases y el plantel

Los horarios de `src/content/site.ts → grilla` salen de posteos e historias de
[@feedback.gym](https://www.instagram.com/feedback.gym/). **Hay que confirmarlos con el gimnasio**:
la grilla rota por temporada. Están marcados con `⚠ REVISAR` en el archivo.

Lo mismo con la lista de **profes** (`profes` en el mismo archivo): los nombres salen de sus grillas
y posteos, pero hay que confirmar quién sigue en el plantel y qué da cada uno.

Y con el horario de fin de semana: la bio de Instagram dice *sábados y domingos de 8 a 20*,
pero un posteo reciente decía *domingos de 8:30 a 14*. La página usa el dato de la bio.

### 3. Los teléfonos de WhatsApp

Los tres números salen del Linktree y de sus posteos, y están escritos en formato internacional con
el 9 de celular (`5491159679366`). **Abrí los tres links una vez antes de mandar el mail** para
confirmar que abren el chat correcto.

---

## Desarrollo

```bash
bun install
bun run dev     # http://localhost:3000
bun run build   # build de producción
bun run start   # servir el build
```

> Si el puerto 3000 está ocupado por otro proyecto, usá `PORT=3010 bun run dev`.

---

## Dónde se edita cada cosa

Todo el contenido vive en **`src/content/site.ts`**. No hace falta tocar ningún componente.

| Qué querés cambiar | Dónde |
|---|---|
| Direcciones, WhatsApp, fotos y datos de cada sede | `sedes` |
| Horario de apertura (el de la barra viva) | `horarioSemanal` |
| Actividades, su descripción y en qué sedes están | `actividades` |
| Grilla de clases por sede | `grilla` |
| Precios y formas de pago | `planes` |
| Beneficios listados | `beneficios` |
| Las seis objeciones | `objeciones` |
| Diferenciales (app, nutrición, RCP, seguimiento) | `diferenciales` |
| Los profes y qué da cada uno | `profes` |
| Titulares y mensaje pre-escrito de WhatsApp | `copy` |

Agregar una sede es agregar un objeto a `sedes`, su `SedeId` al tipo, y una entrada en `grilla`.
El selector, el hero, el footer, los CTA y los datos estructurados se actualizan solos.

---

## Estructura

```
src/
  app/
    layout.tsx        metadata, fuente, datos estructurados (schema.org HealthClub × 3)
    page.tsx          composición de la landing
    globals.css       tokens del sistema y utilidades
    icon.svg          isotipo como favicon
    opengraph-image.png  imagen de compartido (1200×630)
    robots.ts / sitemap.ts
  content/site.ts     ← TODO el contenido editable
  lib/horario.ts      apertura en vivo y próxima clase (hora de Buenos Aires)
  components/         una sección por archivo
public/img/           fotos optimizadas a WebP (cada una con su origen en el .json al lado)
```

---

## Decisiones que conviene conocer

- **La barra del día es real.** Lee el reloj del visitante en hora de Buenos Aires y muestra si el
  gimnasio está abierto ahora, a qué hora cierra y qué clase hay en la sala. Si ya cerró, dice qué
  hay mañana. Se actualiza sola cada 30 segundos. Ninguna de las cadenas grandes hace esto.
- **El selector de sede gobierna toda la página**: cambia la foto del hero, la placa de dirección,
  la próxima clase, la lista de actividades disponibles, la banda de sede con su grilla completa y
  —lo importante— el número de WhatsApp de destino, con el mensaje ya escrito.
- **La grilla de clases es la sábana de la pared, dibujada**: una fila por horario, una columna por
  día, y la celda que está ocurriendo en este momento se enciende en lima. Se genera sola desde
  `grilla` en `site.ts`.
- **Cada actividad tiene su propio botón** que abre WhatsApp con el mensaje ya redactado nombrando
  esa clase ("Quiero probar una clase de Indoor Cycle sin cargo").
- **Todos los CTA van a WhatsApp**, no a un formulario. Es donde el gimnasio ya convierte hoy.
- **Ningún dato está inventado.** Las direcciones, los teléfonos, las actividades, los 22 años, la
  certificación de RCP por ACES, el consultorio nutricional, la app y los nombres de los profes
  salen del Instagram oficial. No hay testimonios ni métricas de resultados porque no existen
  publicados: si el gimnasio los tiene, se suman.
- **Las fotos son del propio gimnasio.** Salen de sus reels y carruseles, recortadas por encima de
  los subtítulos quemados y convertidas a WebP. Cada archivo en `public/img/` tiene un `.json` al
  lado con el posteo de origen. Si el gimnasio pasa material de una sesión profesional, se
  reemplazan sin tocar código.

---

## Pendientes opcionales

- **Logo en vector.** El isotipo está reconstruido en SVG midiendo el logo original al píxel
  (`src/components/Marca.tsx`). El wordmark está compuesto con la tipografía del sitio. Si el
  gimnasio tiene el logo en `.ai` o `.svg`, se reemplaza en minutos.
- **Dominio.** `URL_SITIO` está en tres archivos: `src/app/layout.tsx`, `src/app/robots.ts` y
  `src/app/sitemap.ts`. Al definir el dominio real hay que actualizarlo en los tres: de ahí salen el
  canonical, los datos estructurados, el robots.txt y el sitemap. La imagen de Open Graph ya está
  hecha (`src/app/opengraph-image.png`), se regenera si cambia el titular.
- **Google Maps.** Los links de "Cómo llegar" usan búsqueda por dirección. Con el Place ID real de
  cada sede quedan más precisos.
- **Hero en video.** El banco de imágenes son reels: un loop mudo de 5 segundos de la clase llena
  en lugar del fotograma sería el mayor salto de percepción disponible con el mismo material.
  Requiere los MP4 originales.
