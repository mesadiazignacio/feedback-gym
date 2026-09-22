import type { MetadataRoute } from "next";

const URL_SITIO = "https://feedbackgym.com.ar";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}
