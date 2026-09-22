"use client";

import { diferenciales } from "@/content/site";
import { Contenedor, Seccion } from "./ui";

/** Tres piezas en un mismo plano: la sección es la banda, sin encabezado. */
export function Diferenciales() {
  return (
    <Seccion id="por-que">
      <Contenedor className="!px-0">
        <div className="grid border-b border-regla md:grid-cols-3">
          {diferenciales.map((d, i) => (
            <article
              key={d.titulo}
              className={`px-4 py-10 sm:px-8 ${
                i > 0 ? "border-t border-regla md:border-l md:border-t-0" : ""
              }`}
            >
              <figure className="relative">
                {/* Las tres fotos, el mismo encuadre: la imagen es el plano,
                    sin placas ni marcos alrededor. */}
                <img
                  src={d.foto}
                  alt={d.fotoAlt}
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: d.foco ?? "50% 55%" }}
                  className="aspect-[5/4] w-full object-cover"
                />
                <figcaption className="rotulo absolute bottom-0 left-0 bg-lima px-2.5 py-1.5 text-caucho">
                  {d.dato}
                </figcaption>
              </figure>
              <h3 className="semi-wide mt-6 text-[1.375rem] font-bold uppercase leading-none tracking-[-0.025em] text-hueso">
                {d.titulo}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.6] text-hueso-2">
                {d.cuerpo}
              </p>
            </article>
          ))}
        </div>
      </Contenedor>
    </Seccion>
  );
}
