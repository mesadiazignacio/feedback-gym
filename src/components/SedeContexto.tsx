"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, sedePorId, sedes, type Sede, type SedeId } from "@/content/site";

type Ctx = {
  sede: Sede;
  sedeId: SedeId;
  elegir: (id: SedeId) => void;
  /** Cuántas veces cambió: sirve de `key` para re-estampar lo que depende de la sede. */
  revision: number;
  whatsappUrl: string;
};

const SedeCtx = createContext<Ctx | null>(null);

export function SedeProvider({ children }: { children: ReactNode }) {
  const [sedeId, setSedeId] = useState<SedeId>("ituzaingo");
  const [revision, setRevision] = useState(0);

  const elegir = useCallback((id: SedeId) => {
    setSedeId((actual) => {
      if (actual !== id) setRevision((r) => r + 1);
      return id;
    });
  }, []);

  const valor = useMemo<Ctx>(() => {
    const sede = sedePorId(sedeId);
    return {
      sede,
      sedeId,
      elegir,
      revision,
      whatsappUrl: `https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(
        copy.mensajeWhatsApp(sede.nombre),
      )}`,
    };
  }, [sedeId, elegir, revision]);

  return <SedeCtx.Provider value={valor}>{children}</SedeCtx.Provider>;
}

export function useSede() {
  const ctx = useContext(SedeCtx);
  if (!ctx) throw new Error("useSede fuera de SedeProvider");
  return ctx;
}

export { sedes };
