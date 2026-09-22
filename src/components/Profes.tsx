"use client";

import { useMemo, useState } from "react";
import { profes, sedes } from "@/content/site";
import { Contenedor, Seccion } from "./ui";
import { Terna } from "./Marca";

/**
 * La chapa como superficie, no como línea: la única banda clara de la página.
 * Es el lugar donde el posicionamiento —"profes que te conocen por el
 * nombre"— deja de ser una frase y pasa a ser una lista con nombres.
 *
 * Y la lista contesta la pregunta que uno se hace mirándola —"¿quién da
 * zumba?"—: las actividades del plantel son botones y la lista se recorta a
 * quienes dan esa clase. El recuento sale de los mismos datos, así que sumar
 * un profe o una actividad no pide tocar nada acá.
 */
export function Profes() {
  const [actividad, setActividad] = useState<string | null>(null);

  /* Las actividades del plantel, de la que más gente da a la que menos; a
     igual cantidad, alfabético. El orden lo fija el plantel, no una lista
     escrita a mano que se desactualiza. */
  const actividades = useMemo(() => {
    const cuenta = new Map<string, number>();
    for (const pr of profes) {
      for (const a of pr.da) cuenta.set(a, (cuenta.get(a) ?? 0) + 1);
    }
    return [...cuenta.entries()]
      .map(([nombre, cuantos]) => ({ nombre, cuantos }))
      .sort((a, b) => b.cuantos - a.cuantos || a.nombre.localeCompare(b.nombre, "es"));
  }, []);

  const mostrados = actividad
    ? profes.filter((pr) => pr.da.includes(actividad))
    : profes;

  /* Tocar la actividad activa la suelta: el filtro no es una trampa. */
  const alternar = (nombre: string) =>
    setActividad((actual) => (actual === nombre ? null : nombre));

  return (
    <Seccion id="profes" className="bg-chapa text-hueso">
      <Contenedor>
        <div className="flex flex-col justify-between gap-5 py-8 lg:flex-row lg:items-end lg:py-10">
          <h2 className="titular max-w-[17ch] text-[clamp(2rem,5.2vw,3.75rem)] md:max-w-[24ch] lg:max-w-[17ch]">
            Los que te van a conocer
            <br />
            <span className="text-lima">por el nombre.</span>
          </h2>
          {/* El dato, no la prosa: en esta banda las mayúsculas son
              señalética y sólo funcionan cortas. El contador habla mientras se
              filtra —una línea, nunca un párrafo colgado del titular. */}
          <p
            aria-live="polite"
            className="rotulo flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-tinta-chapa lg:justify-end"
          >
            {actividad ? (
              <>
                <span className="text-lima">{actividad}</span>
                <Punto />
                <span>
                  <span className="tnum text-hueso">{mostrados.length}</span> de{" "}
                  <span className="tnum text-hueso">{profes.length}</span> profes
                </span>
              </>
            ) : (
              <>
                <span>
                  <span className="tnum text-hueso">{profes.length}</span> profes
                </span>
                <Punto />
                <span>
                  <span className="tnum text-hueso">{actividades.length}</span>{" "}
                  actividades
                </span>
                <Punto />
                <span>
                  <span className="tnum text-hueso">{sedes.length}</span> sedes
                </span>
              </>
            )}
          </p>
        </div>
      </Contenedor>

      {/* ------------------------------------------------ filtro por actividad */}
      <div className="border-t border-caucho/35">
        <Contenedor>
          <div
            role="group"
            aria-label="Filtrar el plantel por actividad"
            className="flex flex-wrap gap-1.5 py-4"
          >
            <Chip
              activo={actividad === null}
              onClick={() => setActividad(null)}
              cuantos={profes.length}
            >
              Todas
            </Chip>
            {actividades.map((a) => (
              <Chip
                key={a.nombre}
                activo={actividad === a.nombre}
                onClick={() => alternar(a.nombre)}
                cuantos={a.cuantos}
              >
                {a.nombre}
              </Chip>
            ))}
          </div>
        </Contenedor>
      </div>

      <div className="border-t border-caucho/35">
        <Contenedor className="!px-0">
          {/* La `key` re-estampa la lista en cada filtro: el recorte se ve
              entrar en vez de aparecer cambiado. */}
          <ul
            key={actividad ?? "todas"}
            className="entra grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {mostrados.map((pr) => (
              <li
                key={pr.nombre}
                className="flex items-baseline justify-between gap-4 border-b border-caucho/30 px-4 py-3 sm:border-r sm:px-6 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 xl:[&:nth-child(3n)]:border-r xl:[&:nth-child(4n)]:border-r-0"
              >
                <span className="semi-wide text-[1.0625rem] font-bold uppercase leading-none tracking-[-0.02em] text-hueso sm:text-[1.1875rem]">
                  {pr.nombre}
                </span>
                {/* Cada actividad del profe es la misma puerta que el filtro
                    de arriba: se toca donde se lee. */}
                <span className="flex shrink-0 flex-wrap justify-end gap-x-1.5 text-right text-[0.75rem] leading-tight">
                  {pr.da.map((a, i) => (
                    <span key={a} className="whitespace-nowrap">
                      {i > 0 && (
                        <span aria-hidden className="mr-1.5 text-caucho/45">
                          ·
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => alternar(a)}
                        aria-pressed={actividad === a}
                        className={`underline decoration-transparent underline-offset-[0.2em] transition-colors duration-200 hover:decoration-current ${
                          actividad === a
                            ? "font-semibold text-lima"
                            : "text-tinta-chapa hover:text-hueso"
                        }`}
                      >
                        {a}
                      </button>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Contenedor>
      </div>

      <Contenedor>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-5">
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

/** El punto que separa dos datos: es regla, no texto. */
function Punto() {
  return (
    <span aria-hidden className="text-caucho/45">
      ·
    </span>
  );
}

/** Ficha de actividad: nombre y cuánta gente la da. */
function Chip({
  children,
  cuantos,
  activo,
  onClick,
}: {
  children: React.ReactNode;
  cuantos: number;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] transition-colors duration-200 ${
        activo
          ? "border-lima bg-lima text-caucho"
          : "border-caucho/35 text-hueso hover:border-caucho hover:bg-caucho/10"
      }`}
    >
      {children}
      <span
        className={`tnum text-[0.6875rem] font-semibold ${
          activo ? "text-caucho/65" : "text-tinta-chapa"
        }`}
      >
        {cuantos}
      </span>
    </button>
  );
}
