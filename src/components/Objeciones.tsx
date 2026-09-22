"use client";

import { objeciones } from "@/content/site";
import { Contenedor, Seccion } from "./ui";
import { IconoFlecha } from "./Iconos";
import { useRevelado } from "./Revelado";

export function Objeciones() {
  const { registrar, visibles } = useRevelado(objeciones.length);

  return (
    <Seccion id="objeciones" className="bg-caucho-2">
      <Contenedor>
        <div className="flex flex-col justify-between gap-6 py-14 lg:flex-row lg:items-end lg:py-20">
          <h2 className="titular max-w-[16ch] text-[clamp(2rem,5.2vw,3.75rem)] md:max-w-[24ch] lg:max-w-[16ch]">
            Ya sabemos lo que
            <br />
            estás <span className="text-lima">pensando.</span>
          </h2>
          <p className="medida text-[0.9375rem] leading-[1.65] text-hueso-2 lg:max-w-[34ch] lg:text-right">
            Seis frases que escuchamos todos los días en el mostrador. Y lo que
            les contestamos.
          </p>
        </div>
      </Contenedor>

      {/* un plano continuo: las filas comparten sus reglas, no flotan.
          Cada renglón se escribe cuando el scroll lo alcanza, de arriba
          hacia abajo. */}
      <div className="border-t border-regla">
        {objeciones.map((o, i) => (
          <div
            key={o.duda}
            ref={registrar(i)}
            data-revela={i}
            data-visible={visibles[i] ? "true" : "false"}
            className="revela border-b border-regla transition-colors duration-200 hover:bg-caucho-3"
          >
            <Contenedor>
              <div className="grid items-center gap-3 py-6 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:py-7">
                <p className="semi-wide text-[clamp(1.125rem,2.6vw,1.875rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hueso-3">
                  «{o.duda}»
                </p>

                <IconoFlecha className="size-5 rotate-90 text-lima md:rotate-0" />

                <p className="semi-wide text-[clamp(1.125rem,2.6vw,1.875rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-hueso md:text-right">
                  {o.respuesta}
                </p>
              </div>
            </Contenedor>
          </div>
        ))}
      </div>
    </Seccion>
  );
}
