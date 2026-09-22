"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { actividades, copy, type Actividad } from "@/content/site";
import { useSede } from "./SedeContexto";
import { Contenedor, Seccion, SelectorSede } from "./ui";
import { IconoFlecha, IconoFlechaAbajo } from "./Iconos";

/** Alto de la barra fija: el carril se ancla justo debajo de ella. */
const TOPE = 68;

export function Actividades() {
  const { sede, sedeId, revision } = useSede();

  const enSede = useMemo(
    () => actividades.filter((a) => a.sedes.includes(sedeId)),
    [sedeId],
  );

  const wa = (a: Actividad) =>
    `https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(
      copy.mensajeWhatsApp(sede.nombre, a.nombre),
    )}`;

  return (
    <Seccion id="actividades">
      <Carril
        items={enSede}
        sedeId={sedeId}
        revision={revision}
        enlace={wa}
        sedeNombre={sede.nombre}
      />
    </Seccion>
  );
}

/* ------------------------------------------------------------------ carril */

/**
 * El carril de actividades.
 *
 * De 768px para arriba la sección se ancla al llegar: mientras el scroll
 * vertical avanza, las fichas corren de derecha a izquierda y la regla de
 * abajo mide cuánto queda. Es el mismo movimiento de siempre —bajar— leído
 * en el otro eje.
 *
 * En táctil, o con el movimiento desactivado, no hay anclaje: el carril es
 * un scroll horizontal nativo con paradas. Nunca se secuestra el scroll de
 * quien no puede o no quiere ese gesto.
 */
function Carril({
  items,
  sedeId,
  revision,
  enlace,
  sedeNombre,
}: {
  items: Actividad[];
  sedeId: string;
  revision: number;
  enlace: (a: Actividad) => string;
  sedeNombre: string;
}) {
  const marco = useRef<HTMLDivElement>(null);
  const ventana = useRef<HTMLDivElement>(null);
  const pista = useRef<HTMLUListElement>(null);

  const [anclado, setAnclado] = useState(false);
  const [recorrido, setRecorrido] = useState(0);
  /* Qué ficha está en cabeza: lo lee el indicador del pie. */
  const [activa, setActiva] = useState(0);
  const enCabeza = useRef(0);
  /* El indicador reparte el recorrido en tantos tramos como fichas: así el
     primer segmento marca el arranque y el último, el final del carril. */
  const tramos = Math.max(1, items.length - 1);

  /* Anclar sólo tiene sentido si hay carril que recorrer: si las fichas
     entran enteras en la pantalla, la sección es una banda común. */
  const fijar = anclado && recorrido > 0;

  /* ¿Corresponde anclar? Sólo en pantallas anchas y con movimiento
     habilitado. Arranca en false para que el servidor y el cliente
     coincidan: el modo táctil es el punto de partida. */
  useEffect(() => {
    const ancha = window.matchMedia("(min-width: 768px)");
    const quieta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const leer = () => setAnclado(ancha.matches && !quieta.matches);
    leer();
    ancha.addEventListener("change", leer);
    quieta.addEventListener("change", leer);
    return () => {
      ancha.removeEventListener("change", leer);
      quieta.removeEventListener("change", leer);
    };
  }, []);

  /* Cuánto sobra del carril por fuera de la ventana: ese excedente es la
     altura extra que la sección pide para recorrerlo. */
  useEffect(() => {
    if (!anclado) {
      setRecorrido(0);
      return;
    }
    const medir = () => {
      const p = pista.current;
      const v = ventana.current;
      if (!p || !v) return;
      /* La pista mide lo que miden sus fichas (w-max), así que su ancho
         propio es el largo real del carril. */
      setRecorrido(Math.max(0, p.offsetWidth - v.clientWidth));
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (pista.current) ro.observe(pista.current);
    if (ventana.current) ro.observe(ventana.current);
    return () => ro.disconnect();
  }, [anclado, sedeId, revision]);

  /* El avance vertical de la sección anclada es el desplazamiento
     horizontal de la pista. Un solo write por cuadro. */
  useEffect(() => {
    const p = pista.current;
    if (!fijar) {
      if (p) p.style.transform = "";
      return;
    }

    let pendiente = false;
    const pintar = () => {
      pendiente = false;
      const m = marco.current;
      const pi = pista.current;
      if (!m || !pi) return;
      const desde = TOPE - m.getBoundingClientRect().top;
      const avance = Math.min(1, Math.max(0, desde / recorrido));
      pi.style.transform = `translate3d(${-(avance * recorrido).toFixed(1)}px, 0, 0)`;

      /* El índice sólo se publica cuando cambia: un render por tramo, no
         uno por cuadro. */
      const i = Math.round(avance * tramos);
      if (i !== enCabeza.current) {
        enCabeza.current = i;
        setActiva(i);
      }
    };
    const alScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(pintar);
    };

    pintar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, [fijar, recorrido, tramos, sedeId, revision]);

  /* Un solo animador para los dos movimientos automáticos del carril: el
     rebobinado al cambiar de sede y los saltos de ficha del indicador. El
     scroll se mueve cuadro a cuadro —`instant`— porque el documento lleva
     `scroll-behavior: smooth` y las dos suavizaciones se pelean. */
  const animacion = useRef<number | null>(null);

  const deslizar = (hasta: number) => {
    const desde = window.scrollY;
    if (animacion.current !== null) cancelAnimationFrame(animacion.current);
    if (Math.abs(hasta - desde) < 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: hasta, behavior: "instant" });
      return;
    }

    const arranque = performance.now();
    const DURACION = 780;
    const cuadro = (t: number) => {
      const k = Math.min(1, (t - arranque) / DURACION);
      /* misma salida exponencial que el resto del sistema */
      const salida = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
      window.scrollTo({
        top: desde + (hasta - desde) * salida,
        behavior: "instant",
      });
      animacion.current = k < 1 ? requestAnimationFrame(cuadro) : null;
    };
    animacion.current = requestAnimationFrame(cuadro);
  };

  /* Si el visitante toca el scroll, manda él: la animación se corta. */
  useEffect(() => {
    const cortar = () => {
      if (animacion.current === null) return;
      cancelAnimationFrame(animacion.current);
      animacion.current = null;
    };
    window.addEventListener("wheel", cortar, { passive: true });
    window.addEventListener("touchstart", cortar, { passive: true });
    return () => {
      cortar();
      window.removeEventListener("wheel", cortar);
      window.removeEventListener("touchstart", cortar);
    };
  }, []);

  /** Scroll de página donde el carril está por empezar. */
  const inicio = () => {
    const m = marco.current;
    return m ? window.scrollY + m.getBoundingClientRect().top - TOPE : 0;
  };

  const irAFicha = (i: number) => {
    if (!fijar) return;
    const tramo = Math.min(tramos, Math.max(0, i));
    deslizar(inicio() + (tramo / tramos) * recorrido);
  };

  /* Cambiar de sede es empezar de nuevo: el carril vuelve al principio y
     el regreso se ve —las fichas rebobinan hacia atrás— en vez de aparecer
     cortado a mitad de camino. */
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }

    if (!fijar) {
      const quieta = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      pista.current?.scrollTo({ left: 0, behavior: quieta ? "auto" : "smooth" });
      return;
    }

    /* Si todavía no llegó al carril, no se lo empuja a ningún lado. */
    const arranque = inicio();
    if (window.scrollY - arranque < 1) return;
    deslizar(arranque);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fijar, sedeId]);

  /* Tabulando, la ficha enfocada tiene que entrar en cuadro: el foco mueve
     la página hasta la posición donde esa ficha está a la vista. */
  const alEnfocar = (e: React.FocusEvent<HTMLElement>) => {
    const m = marco.current;
    const pi = pista.current;
    if (!fijar || !m || !pi) return;
    const ficha = (e.target as HTMLElement).closest("li");
    if (!ficha) return;
    const offset =
      ficha.getBoundingClientRect().left - pi.getBoundingClientRect().left;
    const avance = Math.min(1, Math.max(0, (offset - 24) / recorrido));
    window.scrollTo({
      top: window.scrollY + m.getBoundingClientRect().top - TOPE + avance * recorrido,
      behavior: "smooth",
    });
  };

  const relleno = "w-4 shrink-0 sm:w-8 xl:w-12";

  return (
    <div
      ref={marco}
      className="border-t border-regla"
      style={
        fijar ? { height: `calc(100svh - ${TOPE}px + ${recorrido}px)` } : undefined
      }
    >
      <div
        ref={ventana}
        className={
          fijar
            ? "sticky flex flex-col overflow-hidden"
            : "relative overflow-hidden"
        }
        style={
          fijar ? { top: TOPE, height: `calc(100svh - ${TOPE}px)` } : undefined
        }
      >
        {/* el rótulo y el control viven adentro del carril: quedan a la
            vista mientras las fichas pasan por debajo */}
        <div className="border-b border-regla">
          <Contenedor>
            <div className="flex flex-col gap-4 pb-5 pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pb-6 sm:pt-14">
              <h2 className="titular text-[clamp(1.875rem,4.2vw,3.25rem)]">
                Actividades
              </h2>
              <SelectorSede
                variante="compacto"
                etiqueta="Ver actividades por sede"
                className="w-full sm:w-auto sm:min-w-[19rem]"
              />
            </div>
          </Contenedor>
        </div>

        <div className={fijar ? "flex flex-1 items-center py-6" : ""}>
          <ul
            ref={pista}
            key={`carril-${sedeId}-${revision}`}
            onFocus={alEnfocar}
            className={`flex ${
              anclado
                ? "h-[min(34rem,calc(100svh-21rem))] w-max will-change-transform"
                : "carril h-[21rem] w-full snap-x snap-mandatory overflow-x-auto sm:h-[24rem] md:h-[26rem]"
            }`}
          >
            <li className={relleno} aria-hidden />

            {items.map((a, i) => (
              <li
                key={a.nombre}
                className="flex w-[78vw] shrink-0 snap-start border-l border-regla bg-caucho-2 sm:w-[21rem] lg:w-[23rem]"
              >
                <a
                  href={enlace(a)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full flex-col justify-between overflow-hidden p-6 sm:p-7"
                >
                  {/* la sala es el fondo de la ficha; el velo es plano, no
                      un degradado: la foto se lee entera y el texto también */}
                  {a.foto && (
                    <>
                      <img
                        src={a.foto}
                        alt=""
                        width={720}
                        height={900}
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        style={{ objectPosition: a.foco ?? "50% 45%" }}
                        className="absolute inset-0 size-full object-cover"
                      />
                      <span
                        className="absolute inset-0 bg-caucho/78 transition-colors duration-200 group-hover:bg-caucho/62"
                        aria-hidden
                      />
                    </>
                  )}
                  {!a.foto && (
                    <span
                      className="absolute inset-0 transition-colors duration-200 group-hover:bg-caucho-3"
                      aria-hidden
                    />
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="rotulo tnum text-hueso-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rotulo text-hueso-3">{sedeNombre}</span>
                  </div>

                  <div className="relative">
                    <h3 className="semi-wide text-[clamp(1.5rem,2.6vw,2.125rem)] font-bold uppercase leading-[0.95] tracking-[-0.025em] text-hueso">
                      {a.nombre}
                    </h3>
                    <p className="mt-4 text-[0.9375rem] leading-[1.6] text-hueso-2">
                      {a.resumen}
                    </p>
                  </div>

                  <span className="rotulo relative inline-flex items-center gap-2 text-hueso-2 transition-colors duration-200 group-hover:text-lima">
                    Probar
                    <IconoFlecha className="size-3.5" />
                    <span className="sr-only">
                      {a.nombre} en {sedeNombre}, se abre en WhatsApp
                    </span>
                  </span>
                </a>
              </li>
            ))}

            <li className={`${relleno} border-l border-regla`} aria-hidden />
          </ul>
        </div>

        {/* El indicador: dice con qué gesto se avanza —bajar— y en qué
            punto del carril está parado. Un segmento por ficha. */}
        {fijar && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-5">
            <div className="flex items-center gap-4 border border-regla-fuerte bg-caucho px-4 py-2.5">
              <span className="flex items-center gap-2.5">
                <span className="pulso block size-1.5 rounded-full bg-lima" aria-hidden />
                <span className="rotulo text-hueso-2">Scroll</span>
                <IconoFlechaAbajo className="size-3.5 text-lima" />
              </span>

              <span className="h-3.5 w-px bg-regla-fuerte" aria-hidden />

              <button
                type="button"
                onClick={() => irAFicha(activa - 1)}
                disabled={activa <= 0}
                aria-label="Actividad anterior"
                className="text-hueso-2 transition-colors duration-200 hover:text-lima disabled:pointer-events-none disabled:text-chapa"
              >
                <IconoFlecha className="size-3.5 rotate-180" />
              </button>

              <span className="flex items-center gap-1.5" aria-hidden>
                {items.map((a, i) => (
                  <span
                    key={a.nombre}
                    className={`block h-0.5 w-4 transition-colors duration-200 ${
                      i === activa ? "bg-lima" : "bg-chapa"
                    }`}
                  />
                ))}
              </span>

              <button
                type="button"
                onClick={() => irAFicha(activa + 1)}
                disabled={activa >= items.length - 1}
                aria-label="Actividad siguiente"
                className="text-hueso-2 transition-colors duration-200 hover:text-lima disabled:pointer-events-none disabled:text-chapa"
              >
                <IconoFlecha className="size-3.5" />
              </button>

              <span className="sr-only" aria-live="polite">
                Actividad {Math.min(activa + 1, items.length)} de {items.length}
              </span>
            </div>
          </div>
        )}

        {!anclado && (
          <span className="rotulo pointer-events-none absolute bottom-2 right-4 text-[0.625rem] text-hueso-3 sm:right-8">
            Deslizá →
          </span>
        )}
      </div>
    </div>
  );
}
