"use client";

import { useId, useRef, type ReactNode } from "react";
import { sedes, useSede } from "./SedeContexto";
import { IconoWhatsApp } from "./Iconos";
import type { SedeId } from "@/content/site";

/* --------------------------------------------------------------- contenedor */

export function Contenedor({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-8 xl:px-12 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ sección */

export function Seccion({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-regla ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ botones */

export function BotonWhatsApp({
  children,
  className,
  compacto = false,
}: {
  children?: ReactNode;
  className?: string;
  compacto?: boolean;
}) {
  const { whatsappUrl, sede } = useSede();
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 bg-lima font-semibold uppercase tracking-[0.04em] text-caucho transition-colors duration-200 hover:bg-hueso focus-visible:bg-hueso ${
        compacto
          ? "px-3.5 py-2.5 text-[0.75rem] sm:px-4"
          : /* entre lg y xl la tarjeta de cierre es angosta y «Probá una clase
               sin cargo» se parte en dos renglones: ahí el botón afina su
               caja antes que su recado. De xl en adelante, sin cambios. */
            "semi-wide px-5 py-5 text-[0.875rem] sm:px-7 sm:text-base lg:px-4 lg:text-[0.875rem] xl:px-7 xl:text-base"
      } ${className ?? ""}`}
    >
      <IconoWhatsApp className={compacto ? "size-4" : "size-5"} />
      <span>{children ?? "Probá una clase sin cargo"}</span>
      <span className="sr-only"> — sede {sede.nombre}, se abre en WhatsApp</span>
    </a>
  );
}

export function BotonSecundario({
  href,
  children,
  className,
  externo = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  externo?: boolean;
}) {
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 border border-chapa px-6 py-[1.1rem] text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-hueso transition-colors duration-200 hover:border-lima hover:text-lima ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

/* --------------------------------------------------------- selector de sede */

export function SelectorSede({
  className,
  etiqueta = "Elegí tu sede",
  variante = "barra",
}: {
  className?: string;
  etiqueta?: string;
  variante?: "barra" | "compacto";
}) {
  const { sedeId, elegir } = useSede();
  /* Un id propio por instancia: hay cuatro selectores en la página y un id
     repetido rompe el aria-labelledby además de invalidar el HTML. */
  const idEtiqueta = useId();
  const grupo = useRef<HTMLDivElement>(null);

  /* Un radiogroup se recorre con flechas y ocupa una sola parada de tabulador. */
  const porTeclado = (e: React.KeyboardEvent, i: number) => {
    const paso =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!paso) return;
    e.preventDefault();
    const siguiente = (i + paso + sedes.length) % sedes.length;
    elegir(sedes[siguiente].id);
    grupo.current
      ?.querySelectorAll<HTMLButtonElement>("[role=radio]")
      [siguiente]?.focus();
  };

  return (
    <div className={className}>
      <span className="sr-only" id={idEtiqueta}>
        {etiqueta}
      </span>
      <div
        ref={grupo}
        role="radiogroup"
        aria-labelledby={idEtiqueta}
        className="flex w-full border border-chapa"
      >
        {sedes.map((s, i) => {
          const activa = s.id === (sedeId as SedeId);
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={activa}
              tabIndex={activa ? 0 : -1}
              onKeyDown={(e) => porTeclado(e, i)}
              onClick={() => elegir(s.id)}
              className={`relative flex-1 text-center font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ${
                i > 0 ? "border-l border-chapa" : ""
              } ${
                variante === "compacto"
                  ? "px-2 py-2 text-[0.6875rem]"
                  : "px-2 py-3.5 text-[0.75rem] sm:text-[0.8125rem]"
              } ${
                activa
                  ? "bg-lima text-caucho"
                  : "bg-transparent text-hueso-2 hover:bg-caucho-3 hover:text-hueso"
              }`}
            >
              {s.nombre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
