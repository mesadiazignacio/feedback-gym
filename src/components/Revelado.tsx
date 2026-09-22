"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Milisegundos entre una pieza y la siguiente dentro de la misma tanda. */
const PASO = 90;

/**
 * Revelado en cascada.
 *
 * Cada pieza se enciende sola cuando el scroll la alcanza. Si varias entran
 * juntas —el caso normal al llegar a una sección— se encienden escalonadas
 * de arriba hacia abajo, en el mismo orden en que se leen: la lista se
 * escribe sola en vez de aparecer de golpe.
 */
export function useRevelado(cantidad: number, paso = PASO) {
  const piezas = useRef<(HTMLElement | null)[]>([]);
  const [visibles, setVisibles] = useState<boolean[]>(() =>
    Array.from({ length: cantidad }, () => false),
  );

  const registrar = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      piezas.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    const relojes: ReturnType<typeof setTimeout>[] = [];

    const encender = (i: number) =>
      setVisibles((v) => {
        if (v[i]) return v;
        const siguiente = [...v];
        siguiente[i] = true;
        return siguiente;
      });

    /* Sin IntersectionObserver o con el movimiento desactivado, todo está
       puesto desde el principio: el efecto nunca es condición de lectura. */
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisibles(Array.from({ length: cantidad }, () => true));
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((e, orden) => {
            const i = Number((e.target as HTMLElement).dataset.revela);
            obs.unobserve(e.target);
            if (orden === 0) encender(i);
            else relojes.push(setTimeout(() => encender(i), orden * paso));
          });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );

    piezas.current.slice(0, cantidad).forEach((el) => el && obs.observe(el));

    return () => {
      obs.disconnect();
      relojes.forEach(clearTimeout);
    };
  }, [cantidad, paso]);

  return { registrar, visibles };
}
