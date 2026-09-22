import type { MetadataRoute } from "next";

const URL_SITIO = "https://feedbackgym.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL_SITIO,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
