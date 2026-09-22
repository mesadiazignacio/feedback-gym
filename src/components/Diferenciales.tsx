"use client";

import { diferenciales } from "@/content/site";
import { Contenedor, Seccion } from "./ui";

/** El más fuerte va solo y grande; los otros tres comparten el plano. */
const DESTACADO = diferenciales[1];
const RESTO = diferenciales.filter((d) => d !== DESTACADO);

export function Diferenciales() {
  return (
    <Seccion id="por-que">
      <Contenedor>
        <div className="flex flex-col justify-between gap-6 py-14 md:flex-row md:items-end lg:py-20">
          <h2 className="titular max-w-[17ch] text-[clamp(2rem,5.2vw,3.75rem)]">
            No es solo un gimnasio.
            <br />
            <span className="text-lima">Acá saben cómo te llamás.</span>
          </h2>
          <p className="medida text-[0.9375rem] leading-[1.65] text-hueso-2 md:max-w-[34ch] md:text-right">
            Una cadena te da una tarjeta. Acá te dan un profe.
          </p>
        </div>
      </Contenedor>

      {/* ------------------------------------------------------- el destacado */}
      <div className="border-y border-regla">
        <Contenedor>
          <div className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12">
            <figure className="relative lg:col-span-5">
              <img
                src={DESTACADO.foto}
                alt={DESTACADO.fotoAlt}
                width={1080}
                height={810}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="rotulo absolute bottom-0 left-0 bg-lima px-3 py-2 text-caucho">
                {DESTACADO.dato}
              </figcaption>
            </figure>
            <div className="lg:col-span-7">
              <h3 className="titular text-[clamp(1.625rem,3.4vw,2.75rem)] text-hueso">
                {DESTACADO.titulo}
              </h3>
              <p className="medida mt-4 text-[1.0625rem] leading-[1.65] text-hueso-2">
                {DESTACADO.cuerpo}
              </p>
            </div>
          </div>
        </Contenedor>
      </div>

      {/* --------------------------------------------- los tres, mismo plano */}
      <Contenedor className="!px-0">
        <div className="grid border-b border-regla md:grid-cols-3">
          {RESTO.map((d, i) => (
            <article
              key={d.titulo}
              className={`px-4 py-10 sm:px-8 ${
                i > 0 ? "border-t border-regla md:border-l md:border-t-0" : ""
              }`}
            >
              <figure className="relative">
                {d.pantalla ? (
                  /* Una captura de interfaz no se deja suelta sobre el negro:
                     va montada sobre una placa de chapa, como una pantalla. */
                  <div className="flex aspect-[5/4] w-full items-center justify-center bg-chapa p-6">
                    <img
                      src={d.foto}
                      alt={d.fotoAlt}
                      width={630}
                      height={860}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-auto border border-caucho/50 object-cover object-top"
                    />
                  </div>
                ) : (
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
                )}
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
