"use client";

import { useEffect, useState } from "react";
import { LogoCompleto } from "./Marca";
import { BotonWhatsApp } from "./ui";
import { estadoApertura } from "@/lib/horario";

const NAV = [
  { href: "#actividades", label: "Actividades" },
  { href: "#sedes", label: "Sedes" },
  { href: "#por-que", label: "Por qué acá" },
  { href: "#planes", label: "Planes" },
];

export function Header() {
  const [abierto, setAbierto] = useState<boolean | null>(null);

  useEffect(() => {
    const leer = () => setAbierto(estadoApertura().abierto);
    leer();
    const t = setInterval(leer, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-regla bg-caucho">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 xl:px-12">
        <a
          href="#top"
          className="min-w-0 shrink transition-opacity duration-200 hover:opacity-80"
          aria-label="Feedback — Entrenamiento y Bienestar, ir al inicio"
        >
          <LogoCompleto />
        </a>

        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rotulo text-hueso-2 transition-colors duration-200 hover:text-lima"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          {abierto !== null && (
            <span className="entra hidden items-center gap-2 min-[470px]:inline-flex">
              <span
                className={`block size-1.5 rounded-full ${abierto ? "bg-lima" : "bg-chapa"}`}
                aria-hidden
              />
              <span className="rotulo text-hueso-2">
                {abierto ? "Abierto" : "Cerrado"}
              </span>
            </span>
          )}
          <span className="hidden sm:block">
            <BotonWhatsApp compacto>Clase de prueba</BotonWhatsApp>
          </span>
          <span className="block sm:hidden">
            <BotonWhatsApp compacto>
              <span className="hidden min-[360px]:inline">Clase gratis</span>
              <span className="min-[360px]:hidden">Probar</span>
            </BotonWhatsApp>
          </span>
        </div>
      </div>
    </header>
  );
}
