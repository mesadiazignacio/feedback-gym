"use client";

import { useEffect, useState } from "react";
import { copy, grilla, type Sede } from "@/content/site";
import { Contenedor, Seccion, SelectorSede } from "./ui";
import { IconoFlecha, IconoPin, IconoWhatsApp } from "./Iconos";
import { ABREV_DIA, NOMBRES_DIA, ahoraEnBuenosAires } from "@/lib/horario";
import { useSede } from "./SedeContexto";

const DIAS = [1, 2, 3, 4, 5, 6];

/**
 * La grilla de la pared, dibujada: una fila por horario y una columna por día.
 * La celda que está ocurriendo ahora se enciende en lima, igual que el
 * marcador de la regla del día. Es el mismo instrumento, a otra escala.
 */
function Grilla({ sede }: { sede: Sede }) {
  const clases = grilla[sede.id];
  const [ahora, setAhora] = useState<{ dia: number; minutos: number } | null>(
    null,
  );

  useEffect(() => {
    const leer = () => setAhora(ahoraEnBuenosAires());
    leer();
    const t = setInterval(leer, 60_000);
    return () => clearInterval(t);
  }, []);

  const horas = [...new Set(clases.map((c) => c.hora))].sort();
  const buscar = (hora: string, dia: number) =>
    clases.find((c) => c.hora === hora && c.dias.includes(dia));

  if (!horas.length) return null;

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3">
        <h4 className="semi-wide text-[1.125rem] font-bold uppercase leading-none tracking-[-0.02em] text-hueso">
          La grilla de {sede.nombre}
        </h4>
        <span className="rotulo tnum text-hueso-3">
          {clases.length} clases por semana
          <span className="sm:hidden"> — deslizá →</span>
        </span>
      </div>

      <div className="w-full overflow-x-auto overscroll-x-contain [contain:paint]">
        <table className="w-full min-w-[33rem] border-collapse text-left">
          <caption className="sr-only">
            Grilla semanal de clases de Feedback {sede.nombre}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="rotulo border-b border-regla py-2 pr-3 text-hueso-3"
              >
                Hora
              </th>
              {DIAS.map((d) => (
                <th
                  key={d}
                  scope="col"
                  className={`rotulo border-b border-l border-regla px-2 py-2 text-center ${
                    ahora?.dia === d ? "bg-lima text-caucho" : "text-hueso-3"
                  }`}
                >
                  <abbr title={NOMBRES_DIA[d]} className="no-underline">
                    {ABREV_DIA[d]}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => {
              const [h, m] = hora.split(":").map(Number);
              const min = h * 60 + m;
              return (
                <tr key={hora}>
                  <th
                    scope="row"
                    className="tnum whitespace-nowrap border-b border-regla py-2.5 pr-3 align-middle text-[0.9375rem] font-bold text-lima"
                  >
                    {hora}
                  </th>
                  {DIAS.map((d) => {
                    const c = buscar(hora, d);
                    const enCurso =
                      !!c &&
                      ahora?.dia === d &&
                      ahora.minutos >= min &&
                      ahora.minutos < min + 60;
                    return (
                      <td
                        key={d}
                        className={`border-b border-l border-regla px-2 py-2 align-middle ${
                          enCurso
                            ? "bg-lima"
                            : c
                              ? "bg-caucho-3"
                              : ""
                        }`}
                      >
                        {c ? (
                          <>
                            <span
                              className={`block text-[0.8125rem] font-semibold leading-tight ${
                                enCurso ? "text-caucho" : "text-hueso"
                              }`}
                            >
                              {c.actividad}
                            </span>
                            {c.profe && (
                              <span
                                className={`block text-[0.75rem] leading-tight ${
                                  enCurso ? "text-caucho" : "text-hueso-3"
                                }`}
                              >
                                {c.profe}
                              </span>
                            )}
                            {enCurso && <span className="sr-only">(ahora)</span>}
                          </>
                        ) : (
                          <span className="sr-only">sin clase</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 flex items-start gap-2 text-[0.8125rem] leading-snug text-hueso-3">
        <IconoFlecha className="mt-[0.15em] size-3.5 shrink-0" />
        Musculación abierta en todo el horario. Escribinos si no encontrás la
        clase que buscás.
      </p>
    </div>
  );
}

/** La sede elegida: sus datos a la izquierda, sus fotos y su grilla a la derecha. */
function BandaSede({ sede }: { sede: Sede }) {
  const wa = `https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(
    copy.mensajeWhatsApp(sede.nombre),
  )}`;

  return (
    <Contenedor>
      <div className="py-8 lg:py-10">
        {/* Las fotos como franja: son la prueba de que la sede existe, no una
            columna que empuja la grilla fuera de la pantalla. */}
        <div className="grid grid-cols-2">
          <img
            key={`${sede.id}-a`}
            src={sede.foto}
            alt={sede.fotoAlt}
            width={720}
            height={288}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: sede.foco ?? "50% 60%" }}
            className="estampa aspect-square w-full border-r border-regla object-cover sm:aspect-[5/2]"
          />
          <img
            key={`${sede.id}-b`}
            src={sede.fotoSecundaria}
            alt={sede.fotoSecundariaAlt}
            width={720}
            height={288}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: sede.focoSecundaria ?? "50% 55%" }}
            className="estampa aspect-square w-full object-cover sm:aspect-[5/2]"
          />
        </div>

        {/* Debajo, los datos y la grilla a la par: dos columnas del mismo
            alto, sin el hueco que dejaba la columna corta. */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex min-w-0 flex-col lg:col-span-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="afiche text-[clamp(1.75rem,4.4vw,3rem)] text-hueso">
              {sede.nombre}
            </h3>
            {sede.desde && (
              <span className="rotulo tnum shrink-0 text-hueso-3">
                {sede.desde === "nueva" ? "sede nueva" : `desde ${sede.desde}`}
              </span>
            )}
          </div>

          <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-[1.55] text-hueso-2">
            {sede.nota}
          </p>

          <dl className="mt-5 border-t border-regla">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-regla py-3">
              <dt className="rotulo text-hueso-3">Dirección</dt>
              <dd className="semi-wide text-[1.125rem] font-bold uppercase leading-none tracking-[-0.025em] text-hueso">
                {sede.calle} <span className="tnum">{sede.altura}</span>
                <span className="ml-2 text-[0.8em] font-medium text-hueso-2">
                  {sede.partido}
                </span>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-regla py-3">
              <dt className="rotulo text-hueso-3">WhatsApp</dt>
              <dd className="semi-wide tnum text-[1.125rem] font-bold uppercase leading-none tracking-[-0.025em] text-lima">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  {sede.whatsappDisplay}
                </a>
              </dd>
            </div>
          </dl>

          {/* Los hechos de la sede, corridos: son datos sueltos, no un
              párrafo con viñetas que estira la columna. */}
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-hueso-2">
            {sede.hechos.join(" · ")}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lima px-4 py-3 text-[0.75rem] font-bold uppercase tracking-[0.09em] text-caucho transition-colors duration-200 hover:bg-hueso"
            >
              <IconoWhatsApp className="size-4" />
              Escribir a {sede.nombre}
            </a>
            <a
              href={sede.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-chapa px-4 py-3 text-[0.75rem] font-bold uppercase tracking-[0.09em] text-hueso transition-colors duration-200 hover:border-lima hover:text-lima"
            >
              <IconoPin className="size-4" />
              Cómo llegar
            </a>
          </div>
        </div>

          <div className="min-w-0 lg:col-span-8">
            <Grilla sede={sede} />
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

export function Sedes() {
  const { sede, sedeId, revision } = useSede();

  return (
    <Seccion id="sedes" className="bg-caucho-2">
      <Contenedor>
        <div className="flex flex-col justify-between gap-5 py-8 md:flex-row md:items-end lg:py-10">
          <h2 className="titular max-w-[19ch] text-[clamp(2rem,5.2vw,3.75rem)]">
            Tres sedes,
            <br />
            <span className="text-lima">todas en el oeste.</span>
          </h2>
          <p className="medida text-pretty text-[0.9375rem] leading-[1.65] text-hueso-2 md:max-w-[30ch] md:text-right">
            Elegí la que te queda de paso y mirá su grilla completa.
          </p>
        </div>
      </Contenedor>

      {/* Las tres sedes en un solo control: antes la elegida ocupaba una banda
          entera y las otras dos, una fila cada una más abajo. */}
      <div className="border-t border-regla">
        <Contenedor>
          <div className="py-4">
            <SelectorSede etiqueta="Elegí la sede que querés ver" />
          </div>
        </Contenedor>
      </div>

      <div className="border-t border-regla">
        <div key={`banda-${sedeId}-${revision}`}>
          <BandaSede sede={sede} />
        </div>
      </div>
    </Seccion>
  );
}
