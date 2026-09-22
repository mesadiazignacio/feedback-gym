"use client";

import { useEffect, useState } from "react";
import { useSede } from "./SedeContexto";
import {
  estadoApertura,
  formatearMinutos,
  proximaClase,
  NOMBRES_DIA,
  type EstadoApertura,
} from "@/lib/horario";

/** Ventana dibujada: de 5:30 a 23:30. La sala vive adentro de esta regla. */
const INICIO = 5 * 60 + 30;
const FIN = 23 * 60 + 30;
const LARGO = FIN - INICIO;

const pos = (min: number) =>
  `${Math.min(100, Math.max(0, ((min - INICIO) / LARGO) * 100))}%`;

/** Ticks cada 30 minutos; los de hora en punto son mayores. */
const TICKS = Array.from({ length: LARGO / 30 + 1 }, (_, i) => INICIO + i * 30);

/** Horas rotuladas: pocas y legibles. */
const ROTULADAS = [6, 9, 12, 15, 18, 21, 23];

const ROTULO_CUANDO: Record<string, string> = {
  ahora: "En la sala",
  hoy: "Después",
  mañana: "Mañana",
};

export function ReglaDelDia() {
  const { sede, sedeId, revision } = useSede();
  const [estado, setEstado] = useState<EstadoApertura | null>(null);
  const [clase, setClase] = useState<ReturnType<typeof proximaClase>>(null);

  useEffect(() => {
    const leer = () => {
      setEstado(estadoApertura());
      setClase(proximaClase(sedeId));
    };
    leer();
    const t = setInterval(leer, 30_000);
    return () => clearInterval(t);
  }, [sedeId]);

  return (
    <div className="border-t border-regla bg-caucho-2">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 xl:px-12">
        {/* ---------------------------------------------- lectura en palabras */}
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-3">
            <span
              className={`block size-2.5 shrink-0 rounded-full ${
                estado?.abierto ? "bg-lima pulso" : "bg-chapa"
              }`}
              aria-hidden
            />
            <p className="text-[0.9375rem] leading-tight">
              <span className="font-semibold text-hueso">
                {estado ? estado.leyenda : "Horario de hoy"}
              </span>
              <span className="text-hueso-2">
                {" · "}
                {estado
                  ? estado.detalle
                  : `${formatearMinutos(6 * 60 + 30)} — 23:00`}
              </span>
            </p>
          </div>

          <p
            key={`clase-${sedeId}-${revision}`}
            className="estampa text-[0.875rem] leading-tight text-hueso-2"
          >
            {clase && (estado ? estado.abierto || clase.cuando !== "hoy" : true) ? (
              <>
                <span className="rotulo mr-2 text-hueso-3">
                  {ROTULO_CUANDO[clase.cuando] ?? clase.cuando}{" "}
                </span>
                <span className="tnum font-semibold text-lima">
                  {clase.hora}
                </span>{" "}
                <span className="text-hueso">{clase.actividad}</span>
                {clase.profe ? (
                  <span className="text-hueso-2"> con {clase.profe}</span>
                ) : null}
                <span className="text-hueso-3"> — {sede.nombre}</span>
              </>
            ) : (
              <>
                <span className="rotulo mr-2 text-hueso-3">Sala libre{" "}</span>
                <span className="text-hueso">
                  {estado?.abierto
                    ? `Musculación abierta hasta las ${formatearMinutos(estado.cierra)}`
                    : "Sin clases cargadas en esta sede"}
                </span>
              </>
            )}
          </p>
        </div>

        {/* ------------------------------------------------------ la regla */}
        <div className="relative h-[68px] border-t border-regla">
          {/* tramo abierto: campo de color plano, sin degradado */}
          {estado && (
            <div
              className="absolute top-0 h-[3px] bg-lima"
              style={{
                left: pos(estado.abre),
                width: `calc(${pos(estado.cierra)} - ${pos(estado.abre)})`,
              }}
              aria-hidden
            />
          )}

          {/* marcas */}
          <div className="absolute inset-x-0 top-0 h-full" aria-hidden>
            {TICKS.map((t) => {
              const enHora = t % 60 === 0;
              return (
                <span
                  key={t}
                  className={`absolute top-0 w-px ${
                    enHora ? "h-3.5 bg-regla-fuerte" : "h-2 bg-regla"
                  }`}
                  style={{ left: pos(t) }}
                />
              );
            })}
          </div>

          {/* rótulos de hora */}
          <div className="absolute inset-x-0 top-5" aria-hidden>
            {ROTULADAS.map((h, i) => (
              <span
                key={h}
                className={`rotulo tnum absolute -translate-x-1/2 text-hueso-3 ${
                  i % 2 === 1 ? "hidden sm:inline" : ""
                }`}
                style={{ left: pos(h * 60) }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* marcador de la hora real */}
          {estado && (
            <div
              className="entra absolute top-0 h-full"
              style={{ left: pos(estado.ahora) }}
            >
              <span className="absolute top-0 h-9 w-0.5 -translate-x-1/2 bg-lima" />
              <span className="tnum absolute top-[2.6rem] -translate-x-1/2 whitespace-nowrap bg-lima px-1.5 py-0.5 text-[0.625rem] font-bold tracking-[0.06em] text-caucho">
                {formatearMinutos(estado.ahora)}
              </span>
            </div>
          )}

          <span className="sr-only">
            {estado
              ? `${NOMBRES_DIA[estado.dia]}: abre ${formatearMinutos(
                  estado.abre,
                )} y cierra ${formatearMinutos(estado.cierra)}. Son las ${formatearMinutos(
                  estado.ahora,
                )} en Buenos Aires.`
              : "Horario del día"}
          </span>
        </div>
      </div>
    </div>
  );
}
