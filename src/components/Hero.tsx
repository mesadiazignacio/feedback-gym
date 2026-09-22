"use client";

import { useEffect, useState } from "react";
import { copy, marca, sedes } from "@/content/site";
import { useSede } from "./SedeContexto";
import { BotonWhatsApp, Contenedor, SelectorSede } from "./ui";
import { Terna } from "./Marca";
import { IconoPin } from "./Iconos";
import { estadoApertura, formatearMinutos } from "@/lib/horario";

export function Hero() {
  const { sede, sedeId, revision } = useSede();
  const [estado, setEstado] = useState<ReturnType<typeof estadoApertura> | null>(
    null,
  );

  useEffect(() => {
    const leer = () => setEstado(estadoApertura());
    leer();
    const t = setInterval(leer, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative flex flex-1 flex-col">
      <Contenedor className="flex flex-1 flex-col">
        {/* ------------------------------------------- micro-rótulos al margen */}
        <div className="hidden flex-wrap items-center justify-between gap-y-2 border-b border-regla py-3 lg:flex">
          <span className="rotulo flex items-center gap-2.5 text-hueso-3">
            {sedes.map((s, i) => (
              <span key={s.id} className="flex items-center gap-2.5">
                {i > 0 && <Terna activo={1} className="opacity-50" />}
                <span className={s.id === sedeId ? "text-lima" : undefined}>
                  {s.nombre}
                </span>
              </span>
            ))}
          </span>
          <span className="rotulo text-hueso-3">
            Oeste del GBA — desde {marca.desde}
          </span>
        </div>

        <div className="grid flex-1 content-center gap-8 pb-8 pt-7 sm:gap-10 lg:grid-cols-12 lg:gap-10 lg:pb-6 lg:pt-8">
          {/* ------------------------------------------------------ columna 1 */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h1 className="afiche text-[clamp(2.25rem,min(9vw,9.6svh),6.25rem)]">
                <span className="block text-hueso">{copy.heroLinea1}</span>
                <span className="block text-lima">{copy.heroAcento}</span>
              </h1>

              <p className="medida mt-5 max-w-[46ch] text-[1rem] leading-[1.55] text-hueso-2 sm:text-[1.0625rem] lg:mt-6">
                {copy.heroBajada}
              </p>
            </div>

            {/* ------------------------------------- el control: sede + acción */}
            <div className="mt-7 max-w-[30rem]">
              <p className="rotulo mb-2.5 text-hueso-3">
                Elegí tu sede y escribinos
              </p>
              <SelectorSede etiqueta="Elegí tu sede" />
              <BotonWhatsApp className="w-full" />
              <p className="mt-3 flex items-start gap-2 text-[0.8125rem] leading-snug text-hueso-2">
                <IconoPin className="mt-[0.1em] size-3.5 shrink-0 text-hueso-3" />
                {estado === null ? (
                  <span>
                    Te contestamos por WhatsApp —{" "}
                    <span className="tnum">{sede.whatsappDisplay}</span>
                  </span>
                ) : estado.abierto ? (
                  <span>
                    Estamos abiertos: te contestamos ahora —{" "}
                    <span className="tnum text-hueso">
                      {sede.whatsappDisplay}
                    </span>
                  </span>
                ) : (
                  <span>
                    Ahora está cerrado. Escribí igual: te contestamos{" "}
                    {estado.abreManana ? "mañana" : "hoy"} desde las{" "}
                    <span className="tnum text-hueso">
                      {formatearMinutos(estado.proximaApertura)}
                    </span>
                    .
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------ columna 2 */}
          <div className="lg:col-span-5">
            <figure className="relative">
              <img
                key={`foto-${sedeId}-${revision}`}
                src={sede.fotoHero}
                alt={sede.fotoAlt}
                width={720}
                height={470}
                className="estampa aspect-[720/470] w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              {/* la placa se solapa: la profundidad sale del solape, no de una sombra */}
              <figcaption
                key={`placa-${sedeId}-${revision}`}
                className="estampa border-t border-chapa bg-caucho px-5 py-4"
              >
                <span className="rotulo block text-hueso-3">
                  Sede {sede.nombre}
                </span>
                <span className="semi-wide mt-2 block text-[1.375rem] font-bold uppercase leading-none tracking-[-0.02em] text-hueso sm:text-[1.5rem]">
                  {sede.calle} <span className="tnum">{sede.altura}</span>
                </span>
                <span className="mt-2 block text-[0.8125rem] leading-snug text-hueso-2">
                  {sede.nota}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

      </Contenedor>
    </section>
  );
}
