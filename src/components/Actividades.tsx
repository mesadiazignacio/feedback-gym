"use client";

import { actividades, copy, sedes, type Actividad } from "@/content/site";
import { useSede } from "./SedeContexto";
import { Contenedor, Seccion, SelectorSede } from "./ui";
import { IconoFlecha } from "./Iconos";

const TIRA = actividades.filter((a) => a.foto).slice(0, 6);

export function Actividades() {
  const { sede, sedeId, revision } = useSede();
  const enSede = actividades.filter((a) => a.sedes.includes(sedeId));
  /* Lo que NO está en esta sede, agrupado por dónde sí está: una línea por
     combinación, sin repetir una actividad en dos renglones. */
  const faltantes = actividades.filter((a) => !a.sedes.includes(sedeId));
  const grupos = [...new Set(faltantes.map((a) => a.sedes.join("+")))].map(
    (clave) => ({
      donde: clave
        .split("+")
        .map((id) => sedes.find((s) => s.id === id)!.nombre)
        .join(" y "),
      cuales: faltantes.filter((a) => a.sedes.join("+") === clave),
    }),
  );

  const wa = (a: Actividad) =>
    `https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(
      copy.mensajeWhatsApp(sede.nombre, a.nombre),
    )}`;

  return (
    <Seccion id="actividades">
      <Contenedor>
        <div className="flex flex-col justify-between gap-6 py-12 md:flex-row md:items-end lg:py-16">
          <h2 className="titular max-w-[18ch] text-[clamp(2rem,5.2vw,3.75rem)]">
            No existe una actividad perfecta.
            <br />
            <span className="text-lima">Existe la que va con vos.</span>
          </h2>
          <p className="medida text-[0.9375rem] leading-[1.65] text-hueso-2 md:max-w-[32ch] md:text-right">
            Doce actividades entre las tres sedes. Elegí la tuya y mirá cuáles
            tenés a mano.
          </p>
        </div>
      </Contenedor>

      {/* tira continua de sala: una sola banda, sin separaciones */}
      <ul className="grid grid-cols-3 border-y border-regla md:grid-cols-6">
        {TIRA.map((a) => (
          <li
            key={a.nombre}
            className="relative border-r border-regla last:border-r-0"
          >
            <img
              src={a.foto}
              alt={a.fotoAlt ?? ""}
              width={720}
              height={900}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: a.foco ?? "50% 45%" }}
              className="aspect-[4/5] w-full object-cover md:aspect-square"
            />
            <span className="rotulo absolute bottom-0 left-0 max-w-full truncate bg-caucho px-2.5 py-2 text-[0.625rem] text-lima">
              {a.nombre}
            </span>
          </li>
        ))}
      </ul>

      <Contenedor>
        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-hueso-2">
            <span className="font-semibold text-hueso">
              {enSede.length} actividades
            </span>{" "}
            en {sede.nombre}
          </p>
          <SelectorSede
            variante="compacto"
            etiqueta="Ver actividades por sede"
            className="w-full sm:w-auto sm:min-w-[19rem]"
          />
        </div>
      </Contenedor>

      {/* el plano: filas que comparten sus reglas */}
      <div className="border-t border-regla" key={`act-${sedeId}-${revision}`}>
        <Contenedor>
          <div className="hidden grid-cols-12 gap-6 border-b border-regla py-2.5 md:grid">
            <span className="rotulo col-span-3 text-hueso-3">Actividad</span>
            <span className="rotulo col-span-7 text-hueso-3">Qué es</span>
            <span className="rotulo col-span-2 text-right text-hueso-3">
              Probarla
            </span>
          </div>
        </Contenedor>

        {enSede.map((a) => (
          <div
            key={a.nombre}
            className="border-b border-regla transition-colors duration-200 hover:bg-caucho-2"
          >
            <Contenedor>
              <div className="grid gap-2 py-5 md:grid-cols-12 md:items-baseline md:gap-6">
                <h3 className="semi-wide col-span-3 text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold uppercase leading-none tracking-[-0.025em] text-hueso">
                  {a.nombre}
                </h3>

                <p className="col-span-7 text-[0.9375rem] leading-[1.6] text-hueso-2">
                  {a.resumen}
                </p>

                <div className="col-span-2 md:text-right">
                  <a
                    href={wa(a)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rotulo inline-flex items-center gap-2 text-hueso-2 transition-colors duration-200 hover:text-lima"
                  >
                    Probar
                    <IconoFlecha className="size-3.5" />
                    <span className="sr-only">
                      {a.nombre} en {sede.nombre}, se abre en WhatsApp
                    </span>
                  </a>
                </div>
              </div>
            </Contenedor>
          </div>
        ))}
      </div>

      {grupos.length > 0 && (
        <Contenedor>
          <ul className="space-y-1 py-6 text-[0.9375rem] leading-relaxed text-hueso-2">
            {grupos.map((g) => (
              <li key={g.donde}>
                {g.cuales.map((a) => a.nombre).join(", ")}
                {g.cuales.length > 1 ? " están" : " está"} en{" "}
                <span className="font-semibold text-hueso">{g.donde}</span>.
              </li>
            ))}
          </ul>
        </Contenedor>
      )}
    </Seccion>
  );
}
