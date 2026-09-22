import { copy, horarioSemanal, marca, sedes } from "@/content/site";
import { Contenedor } from "./ui";
import { Isotipo, Terna, Wordmark } from "./Marca";
import { IconoInstagram, IconoMail, IconoWhatsApp } from "./Iconos";

export function Footer() {
  return (
    <footer className="border-t border-regla bg-caucho">
      <Contenedor>
        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* ------------------------------------------------------- la marca */}
          <div className="lg:col-span-4">
            <span className="flex items-center gap-3">
              <Isotipo className="h-11 w-11" />
              <span className="flex flex-col gap-1.5">
                <Wordmark className="text-[1.375rem]" />
                <span className="rotulo text-[0.5625rem] tracking-[0.22em] text-hueso-2">
                  Entrenamiento <span className="text-lima">&amp;</span>{" "}
                  Bienestar
                </span>
              </span>
            </span>

            <p className="medida mt-6 text-[0.9375rem] leading-[1.65] text-hueso-2">
              Gracias por elegirnos como su lugar, su espacio, su hogar.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={marca.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-chapa px-3.5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-hueso transition-colors duration-200 hover:border-lima hover:text-lima"
              >
                <IconoInstagram className="size-4" />@{marca.instagram}
              </a>
              <a
                href={`mailto:${marca.email}`}
                className="inline-flex items-center gap-2 border border-chapa px-3.5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-hueso transition-colors duration-200 hover:border-lima hover:text-lima"
                aria-label={`Escribir a ${marca.email}`}
              >
                <IconoMail className="size-4" />
                Email
              </a>
            </div>
          </div>

          {/* -------------------------------------------------------- sedes */}
          <div className="lg:col-span-5">
            <span className="rotulo block border-b border-regla pb-2.5 text-hueso-3">
              Las tres sedes
            </span>
            <ul>
              {sedes.map((s) => (
                <li key={s.id} className="border-b border-regla py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="semi-wide text-[1.0625rem] font-bold uppercase tracking-[-0.01em] text-hueso">
                      {s.nombre}
                    </span>
                    <a
                      href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(
                        copy.mensajeWhatsApp(s.nombre),
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tnum inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-lima transition-colors duration-200 hover:text-hueso"
                    >
                      <IconoWhatsApp className="size-3.5" />
                      {s.whatsappDisplay}
                    </a>
                  </div>
                  <a
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[0.875rem] text-hueso-2 underline decoration-regla-fuerte transition-colors duration-200 hover:text-hueso hover:decoration-lima"
                  >
                    {s.direccion}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------------------------------------------- horarios */}
          <div className="lg:col-span-3">
            <span className="rotulo block border-b border-regla pb-2.5 text-hueso-3">
              Horarios
            </span>
            <ul>
              {horarioSemanal.resumen.map((r) => (
                <li key={r.dias} className="border-b border-regla py-4">
                  <span className="block text-[0.875rem] text-hueso-2">
                    {r.dias}
                  </span>
                  <span className="tnum mt-1 block text-[1.0625rem] font-semibold text-hueso">
                    {r.horas}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8125rem] leading-snug text-hueso-3">
              Mismo horario en Ituzaingó, Castelar y Padua.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-regla py-6 sm:flex-row sm:items-center">
          <span className="rotulo tnum text-hueso-3">
            © {new Date().getFullYear()} {marca.nombre} — {marca.anios} años en
            el oeste
          </span>
          <Terna activo={1} className="opacity-60" />
        </div>
      </Contenedor>
    </footer>
  );
}
