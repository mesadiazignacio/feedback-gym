import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { marca, sedes } from "@/content/site";

/**
 * Archivo: grotesca de señalética con eje de ancho. Los titulares viven en
 * wdth 125 y el cuerpo en 100. Una sola familia para todo el sitio.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const URL_SITIO = "https://feedbackgym.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: {
    default: "Feedback — Gimnasios",
    template: "%s · Feedback",
  },
  description:
    "Tres sedes en el oeste del GBA y veintidós años entrenando vecinos por su nombre. Musculación, clases, indoor cycle y nutrición. Probá una clase sin cargo.",
  keywords: [
    "gimnasio Ituzaingó",
    "gimnasio Castelar",
    "gimnasio San Antonio de Padua",
    "musculación zona oeste",
    "clases de zumba Ituzaingó",
    "indoor cycle Castelar",
    "gimnasio cerca",
    "Feedback gym",
  ],
  authors: [{ name: marca.nombre }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: URL_SITIO,
    siteName: `${marca.nombre} — ${marca.bajada}`,
    title: "Feedback — Gimnasio en Ituzaingó, Castelar y Padua",
    description:
      "Tres sedes en el oeste, veintidós años y una clase de prueba que no te cuesta nada.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback — Gimnasio en Ituzaingó, Castelar y Padua",
    description:
      "Tres sedes en el oeste, veintidós años y una clase de prueba que no te cuesta nada.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

/** Datos estructurados: las tres sedes como negocios locales reales. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": sedes.map((s) => ({
    "@type": "HealthClub",
    "@id": `${URL_SITIO}/#${s.id}`,
    name: `${marca.nombre} ${s.nombre}`,
    description: s.nota,
    url: URL_SITIO,
    telephone: `+${s.whatsapp}`,
    email: marca.email,
    image: `${URL_SITIO}${s.foto}`,
    sameAs: [marca.instagramUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${s.calle} ${s.altura}`,
      addressLocality: s.nombre,
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "06:30",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={archivo.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Datos del negocio, no contenido de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

