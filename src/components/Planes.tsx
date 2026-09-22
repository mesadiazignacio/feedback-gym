"use client";

import { beneficios, planes, PRECIO_PENDIENTE } from "@/content/site";

const SIN_PRECIOS = planes.every((p) =>
  p.opciones.every((o) => o.precio === PRECIO_PENDIENTE),
);
import { BotonWhatsApp, Contenedor, Seccion, SelectorSede } from "./ui";
import { IconoTilde } from "./Iconos";
import { useSede } from "./SedeContexto";

function Precio({ valor }: { valor: string }) {
  if (valor === PRECIO_PENDIENTE) {
    return (
      <span className="semi-wide text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold uppercase leading-none tracking-[-0.02em] text-hueso-2">
        Consultanos
      </span>
    );
  }
  return (
    <span className="semi-wide tnum text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-hueso">
      {valor}
    </span>
  );
}

export function Planes() {
  const { sede } = useSede();

  return (
    <Seccion id="planes" className="bg-caucho-2">
      <Contenedor>
        <div className="flex flex-col justify-between gap-6 py-14 md:flex-row md:items-end lg:py-20">
          <h2 className="titular max-w-[14ch] text-[clamp(2rem,5.2vw,3.75rem)]">
            La cuota,
            <br />
            <span className="text-lima">sin letra chica.</span>
          </h2>
          <p className="medida text-[0.9375rem] leading-[1.65] text-hueso-2 md:max-w-[34ch] md:text-right">
            Con débito automático pagás 10% menos, todos los meses.
          </p>
        </div>
      </Contenedor>

      {/* -------------------------------------------------------- la matriz */}
      <div className="border-t border-regla">
        <Contenedor>
          {SIN_PRECIOS ? (
            /* Sin montos cargados: se muestra la estructura, no cuatro veces
               la misma palabra en una tabla vacía. */
            <ul className="grid gap-px border-b border-regla py-8 sm:grid-cols-3">
              {[
                { que: "Plazo", como: "1 mes o 3 meses" },
                { que: "Forma de pago", como: "Efectivo o débito automático" },
                { que: "Débito automático", como: "10% OFF todos los meses" },
              ].map((f) => (
                <li key={f.que}>
                  <span className="rotulo block text-hueso-3">{f.que}</span>
                  <span className="semi-wide mt-2 block text-[clamp(1.125rem,2.2vw,1.5rem)] font-bold uppercase leading-tight tracking-[-0.02em] text-hueso">
                    {f.como}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="hidden grid-cols-12 gap-6 border-b border-regla py-3 md:grid">
                <span className="rotulo col-span-4 text-hueso-3">Plazo</span>
                <span className="rotulo col-span-4 text-hueso-3">Efectivo</span>
                <span className="rotulo col-span-4 text-hueso-3">
                  Débito automático — 10% OFF
                </span>
              </div>

              {planes.map((p) => (
                <div
                  key={p.id}
                  className={`grid gap-5 border-b border-regla py-8 md:grid-cols-12 md:items-center md:gap-6 ${
                    p.destacado ? "bg-caucho-3" : ""
                  }`}
                >
                  <div className="md:col-span-4">
                    <h3 className="semi-wide text-[clamp(1.375rem,2.6vw,1.875rem)] font-bold uppercase leading-none tracking-[-0.025em] text-hueso">
                      {p.plazo}
                    </h3>
                    <p className="mt-2 max-w-[30ch] text-[0.875rem] leading-snug text-hueso-2">
                      {p.detalle}
                    </p>
                  </div>

                  {p.opciones.map((o) => (
                    <div key={o.forma} className="md:col-span-4">
                      <span className="rotulo mb-2 block text-hueso-3 md:hidden">
                        {o.forma}
                      </span>
                      <Precio valor={o.precio} />
                      <p className="mt-2 text-[0.8125rem] leading-snug text-hueso-3">
                        {o.nota}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </Contenedor>
      </div>

      {/* --------------------------------------------- beneficios + cierre */}
      <Contenedor>
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-7">
            {beneficios.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[0.9375rem] leading-snug text-hueso"
              >
                <IconoTilde className="mt-[0.15em] size-4 shrink-0 text-lima" />
                {b}
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <p className="rotulo mb-2.5 text-hueso-3">
              Pedí el valor de tu sede
            </p>
            <SelectorSede etiqueta="Elegí tu sede para consultar el precio" />
            <BotonWhatsApp className="w-full">
              Pedime el valor de {sede.nombre}
            </BotonWhatsApp>
            <p className="mt-3 text-[0.8125rem] leading-snug text-hueso-3">
              Te pasamos los valores por WhatsApp en el momento, sin vueltas.
            </p>
          </div>
        </div>
      </Contenedor>
    </Seccion>
  );
}
