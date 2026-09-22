"use client";

import { copy } from "@/content/site";
import { BotonWhatsApp, Contenedor, Seccion, SelectorSede } from "./ui";
import { useSede } from "./SedeContexto";

export function Cierre() {
  const { sede, sedeId, revision } = useSede();

  return (
    <Seccion id="cierre" className="bg-lima text-caucho">
      <Contenedor>
        <div className="grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
          <div className="lg:col-span-7">
            {/* A todo el ancho el afiche se mide contra el viewport; partido en dos
                columnas, contra la mitad. Sin bajar el techo en esa mitad,
                «IMPORTANTE» no entra y el titular se corta a mitad de palabra
                —visible desde 1280px para abajo—. El tope de 5.5rem sigue
                mandando de 1440px en adelante: el escritorio no se mueve. */}
            <h2 className="afiche text-[clamp(1.875rem,7.2vw,5.5rem)] text-caucho lg:text-[clamp(1.875rem,6.2vw,5.5rem)]">
              {copy.cierreTitulo}
              <br />
              {copy.cierreAcento}
            </h2>
            <p className="medida mt-6 text-[1.0625rem] font-medium leading-[1.6] text-caucho/80 sm:text-[1.1875rem]">
              {copy.cierreBajada}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-caucho/25 bg-caucho p-6 sm:p-8 lg:p-6 xl:p-8">
              <p className="rotulo mb-2.5 text-hueso-3">Tu clase de prueba</p>
              <SelectorSede etiqueta="Elegí tu sede para la clase de prueba" />
              <BotonWhatsApp className="w-full" />
              <p
                key={`cierre-${sedeId}-${revision}`}
                className="estampa mt-4 text-[0.875rem] leading-snug text-hueso-2"
              >
                Vas a escribirle a{" "}
                <span className="font-semibold text-hueso">
                  Feedback {sede.nombre}
                </span>
                , {sede.direccion}. Te contestamos de 6:30 a 23:00.
              </p>
            </div>
          </div>
        </div>
      </Contenedor>
    </Seccion>
  );
}
