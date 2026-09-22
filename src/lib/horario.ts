import { horarioSemanal, grilla, type SedeId, type Clase } from "@/content/site";

const TZ = "America/Argentina/Buenos_Aires";

export type EstadoApertura = {
  abierto: boolean;
  /** Minutos desde la medianoche, hora de Buenos Aires. */
  ahora: number;
  dia: number;
  abre: number;
  cierra: number;
  /** "Abierto ahora" / "Cierra 23:00" / "Abre mañana 6:30" */
  leyenda: string;
  detalle: string;
  /**
   * A qué hora vuelve a abrir: hoy si todavía no abrió, mañana si ya cerró.
   * Es lo que hay que ofrecerle a alguien que escribe fuera de horario.
   */
  proximaApertura: number;
  abreManana: boolean;
};

/** Hora de Buenos Aires, sin depender de la zona del visitante. */
export function ahoraEnBuenosAires(base = new Date()) {
  const fmt = new Intl.DateTimeFormat("es-AR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const partes = Object.fromEntries(
    fmt.formatToParts(base).map((p) => [p.type, p.value]),
  );
  const hora = Number(partes.hour ?? 0);
  const minuto = Number(partes.minute ?? 0);
  const dias = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const etiqueta = (partes.weekday ?? "")
    .toLowerCase()
    .replace(".", "")
    .slice(0, 3);
  const dia = Math.max(0, dias.indexOf(etiqueta));
  return { dia, minutos: hora * 60 + minuto };
}

export function formatearMinutos(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function estadoApertura(base = new Date()): EstadoApertura {
  const { dia, minutos } = ahoraEnBuenosAires(base);
  const hoy = horarioSemanal.dias[dia];
  const abierto = minutos >= hoy.abre && minutos < hoy.cierra;

  const manana = horarioSemanal.dias[(dia + 1) % 7];

  let leyenda: string;
  let detalle: string;
  let proximaApertura: number;
  let abreManana: boolean;

  if (abierto) {
    const restan = hoy.cierra - minutos;
    leyenda = "Abierto ahora";
    detalle =
      restan <= 60
        ? `Cierra en ${restan} min`
        : `Cierra ${formatearMinutos(hoy.cierra)}`;
    proximaApertura = hoy.abre;
    abreManana = false;
  } else if (minutos < hoy.abre) {
    leyenda = "Cerrado";
    detalle = `Abre hoy ${formatearMinutos(hoy.abre)}`;
    proximaApertura = hoy.abre;
    abreManana = false;
  } else {
    leyenda = "Cerrado";
    detalle = `Abre mañana ${formatearMinutos(manana.abre)}`;
    proximaApertura = manana.abre;
    abreManana = true;
  }

  return {
    abierto,
    ahora: minutos,
    dia,
    abre: hoy.abre,
    cierra: hoy.cierra,
    leyenda,
    detalle,
    proximaApertura,
    abreManana,
  };
}

export type ClaseEnAgenda = Clase & {
  minutos: number;
  /** "ahora" | "hoy" | "mañana" | "lunes"… */
  cuando: "ahora" | "hoy" | string;
};

const delDia = (sede: SedeId, dia: number) =>
  grilla[sede]
    .filter((c) => c.dias.includes(dia))
    .map((c) => {
      const [h, m] = c.hora.split(":").map(Number);
      return { ...c, minutos: h * 60 + m };
    })
    .sort((a, b) => a.minutos - b.minutos);

/**
 * Qué clase hay. Si hoy ya no queda ninguna, busca en los días siguientes,
 * para que a las 23 la página diga qué va a pasar mañana en vez de quedarse
 * en un "sin clases" que suena a gimnasio vacío.
 */
export function proximaClase(
  sede: SedeId,
  base = new Date(),
): ClaseEnAgenda | null {
  const { dia, minutos } = ahoraEnBuenosAires(base);
  const hoy = delDia(sede, dia);

  const enCurso = hoy.find(
    (c) => minutos >= c.minutos && minutos < c.minutos + 60,
  );
  if (enCurso) return { ...enCurso, cuando: "ahora" };

  const siguiente = hoy.find((c) => c.minutos > minutos);
  if (siguiente) return { ...siguiente, cuando: "hoy" };

  for (let salto = 1; salto <= 7; salto++) {
    const d = (dia + salto) % 7;
    const primera = delDia(sede, d)[0];
    if (primera) {
      return {
        ...primera,
        cuando: salto === 1 ? "mañana" : NOMBRES_DIA[d].toLowerCase(),
      };
    }
  }
  return null;
}

export const NOMBRES_DIA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

export const ABREV_DIA = ["D", "L", "M", "M", "J", "V", "S"] as const;
