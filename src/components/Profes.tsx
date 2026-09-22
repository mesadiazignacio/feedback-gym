"use client";

import { profes } from "@/content/site";
import { Contenedor, Seccion } from "./ui";
import { Terna } from "./Marca";

/**
 * La chapa como superficie, no como línea: la única banda clara de la página.
 * Es el lugar donde el posicionamiento —"profes que te conocen por el
 * nombre"— deja de ser una frase y pasa a ser una lista con nombres.
 */
export function Profes() {
  return (
    <Seccion id="profes" className="bg-chapa text-hueso">
      <Contenedor>
        <div className="flex flex-col justify-between gap-6 py-12 md:flex-row md:items-end lg:py-16">
          <h2 className="titular max-w-[17ch] text-[clamp(2rem,5.2vw,3.75rem)]">
            Los que te van a conocer
            <br />
            <span className="text-lima">por el nombre.</span>
          </h2>
          <p className="medida text-[0.9375rem] leading-[1.65] text-tinta-chapa md:max-w-[32ch] md:text-right">
            {profes.length} personas dando clase entre las tres sedes. Estos
            son sus nombres y lo que da cada uno.
          </p>
        </div>
      </Contenedor>

      <div className="border-t border-caucho/35">
        <Contenedor className="!px-0">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {profes.map((pr) => (
              <li
                key={pr.nombre}
                className="flex items-baseline justify-between gap-4 border-b border-caucho/30 px-4 py-4 sm:border-r sm:px-8 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <span className="semi-wide text-[1.25rem] font-bold uppercase leading-none tracking-[-0.02em] text-hueso sm:text-[1.375rem]">
                  {pr.nombre}
                </span>
                <span className="shrink-0 text-right text-[0.8125rem] leading-tight text-tinta-chapa">
                  {pr.da.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Contenedor>
      </div>

      <Contenedor>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-6">
          <Terna activo={1} />
          <p className="text-[0.875rem] leading-snug text-hueso">
            Todo el equipo —profes, recepción y mantenimiento— está certificado
            en RCP por ACES.
          </p>
        </div>
      </Contenedor>
    </Seccion>
  );
}
