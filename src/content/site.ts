/**
 * FUENTE ÚNICA DE CONTENIDO
 * -------------------------
 * Todo lo editable de la landing vive acá. Para actualizar precios, horarios,
 * actividades o datos de una sede no hace falta tocar ningún componente.
 *
 * Los datos fueron extraídos del Instagram oficial @feedback.gym.
 * Lo que está marcado con  ⚠ REVISAR  hay que confirmarlo con el cliente.
 */

export type SedeId = "ituzaingo" | "castelar" | "padua";

/* ------------------------------------------------------------------ marca */

export const marca = {
  nombre: "Feedback",
  bajada: "Entrenamiento & Bienestar",
  instagram: "feedback.gym",
  instagramUrl: "https://www.instagram.com/feedback.gym/",
  email: "feedback_eyb@hotmail.com",
  anios: 22,
  desde: 2004,
} as const;

/* ---------------------------------------------------------------- horarios */

/** Horario de apertura de la cadena. Mismo en las tres sedes. */
export const horarioSemanal = {
  /** 0 = domingo … 6 = sábado. Minutos desde la medianoche. */
  dias: [
    { dia: 0, nombre: "Domingo", abre: 8 * 60, cierra: 20 * 60 },
    { dia: 1, nombre: "Lunes", abre: 6 * 60 + 30, cierra: 23 * 60 },
    { dia: 2, nombre: "Martes", abre: 6 * 60 + 30, cierra: 23 * 60 },
    { dia: 3, nombre: "Miércoles", abre: 6 * 60 + 30, cierra: 23 * 60 },
    { dia: 4, nombre: "Jueves", abre: 6 * 60 + 30, cierra: 23 * 60 },
    { dia: 5, nombre: "Viernes", abre: 6 * 60 + 30, cierra: 23 * 60 },
    { dia: 6, nombre: "Sábado", abre: 8 * 60, cierra: 20 * 60 },
  ],
  resumen: [
    { dias: "Lunes a viernes", horas: "6:30 — 23:00" },
    { dias: "Sábados y domingos", horas: "8:00 — 20:00" },
  ],
} as const;

/* ------------------------------------------------------------------- sedes */

export type Sede = {
  id: SedeId;
  nombre: string;
  partido: string;
  calle: string;
  altura: string;
  /** Dirección completa tal como la escriben ellos. */
  direccion: string;
  whatsapp: string;
  whatsappDisplay: string;
  mapsUrl: string;
  /** Lo que distingue a esta sede, en una línea. */
  nota: string;
  /** Datos duros verificables de la sede. */
  hechos: string[];
  /** Recorte apaisado hecho a medida para el hero: siempre con gente. */
  fotoHero: string;
  foto: string;
  fotoAlt: string;
  /** Punto de interés al recortar (CSS object-position): que se vea la gente. */
  foco?: string;
  fotoSecundaria: string;
  fotoSecundariaAlt: string;
  focoSecundaria?: string;
  desde?: string;
};

export const sedes: Sede[] = [
  {
    id: "ituzaingo",
    nombre: "Ituzaingó",
    partido: "Ituzaingó",
    calle: "Alvear",
    altura: "1110/40",
    direccion: "Alvear 1110/40, Ituzaingó",
    whatsapp: "5491159679366",
    whatsappDisplay: "11 5967-9366",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Alvear+1110+Ituzaingo+Buenos+Aires",
    nota: "La casa madre. Veintidós años en la misma cuadra.",
    hechos: [
      "Sala de musculación y salón de clases",
      "Consultorio nutricional propio",
      "Clases abiertas de yoga y masterclass",
    ],
    fotoHero: "/img/hero-ituzaingo.webp",
    foto: "/img/comunidad.webp",
    fotoAlt: "Clase grupal a sala llena en Feedback Ituzaingó",
    fotoSecundaria: "/img/sede-ituzaingo.webp",
    fotoSecundariaAlt: "Socios entrenando en la sala de musculación de Feedback Ituzaingó",
    focoSecundaria: "50% 80%",
    desde: "2004",
  },
  {
    id: "castelar",
    nombre: "Castelar",
    partido: "Morón",
    calle: "Pompeya",
    altura: "2450",
    direccion: "Pompeya 2450, Castelar",
    whatsapp: "5491123189933",
    whatsappDisplay: "11 2318-9933",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pompeya+2450+Castelar+Buenos+Aires",
    nota: "A tres cuadras de la estación. Más de mil metros cuadrados.",
    hechos: [
      "+1000 m² entre sala, clases e indoor",
      "Sala de indoor cycle con grilla propia",
      "A 3 cuadras de la estación de Castelar",
    ],
    fotoHero: "/img/hero-castelar.webp",
    foto: "/img/sede-castelar.webp",
    fotoAlt: "Sala de musculación de Feedback Castelar con socios entrenando",
    foco: "50% 88%",
    fotoSecundaria: "/img/act-indoor.webp",
    fotoSecundariaAlt: "Clase de indoor cycle a sala llena en Feedback Castelar",
    focoSecundaria: "50% 82%",
  },
  {
    id: "padua",
    nombre: "Padua",
    partido: "Merlo",
    calle: "Formosa",
    altura: "720",
    direccion: "Formosa 720, San Antonio de Padua",
    whatsapp: "5491122366667",
    whatsappDisplay: "11 2236-6667",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Formosa+720+San+Antonio+de+Padua+Buenos+Aires",
    nota: "La sede nueva. Abrió sus puertas el 7 de septiembre.",
    hechos: [
      "Sede estrenada en septiembre",
      "Grilla de clases creciendo mes a mes",
      "Abierta desde el 7 de septiembre",
    ],
    fotoHero: "/img/hero-padua.webp",
    foto: "/img/sede-padua.webp",
    fotoAlt: "Salón de clases a sala llena en la nueva sede Feedback Padua",
    foco: "50% 88%",
    fotoSecundaria: "/img/fachada.webp",
    fotoSecundariaAlt: "Fachada de Feedback Padua en Formosa 720, con el cartel iluminado",
    focoSecundaria: "50% 55%",
    desde: "nueva",
  },
];

export const sedePorId = (id: SedeId) => sedes.find((s) => s.id === id)!;

/* -------------------------------------------------------------- objeciones */

/**
 * Serie publicada por Feedback en su feed. Cada par es textual:
 * la frase de la izquierda es la objeción, la de la derecha la respuesta.
 */
export const objeciones = [
  { duda: "No me animo a empezar", respuesta: "Todos empezamos alguna vez" },
  { duda: "¿Y si no puedo?", respuesta: "¿Y si puedo?" },
  { duda: "Soy muy grande para empezar", respuesta: "Mi salud no tiene edad" },
  { duda: "No veo cambios", respuesta: "Cada esfuerzo suma" },
  { duda: "No tengo tiempo", respuesta: "Merezco tiempo para mí" },
  { duda: "Mejor arranco el lunes", respuesta: "Hoy también es un buen día" },
] as const;

/* ------------------------------------------------------------ actividades */

export type Actividad = {
  nombre: string;
  resumen: string;
  sedes: SedeId[];
  foto?: string;
  fotoAlt?: string;
  /** Punto de interés de la foto al recortarla (CSS object-position). */
  foco?: string;
};

export const actividades: Actividad[] = [
  {
    nombre: "Musculación",
    resumen: "Sala completa con seguimiento, corrección de técnica y plan que se actualiza según tu progreso.",
    sedes: ["ituzaingo", "castelar", "padua"],
    foto: "/img/act-musculacion.webp",
    fotoAlt: "Socia haciendo sentadilla con barra frente al ventanal de la sala",
  },
  {
    nombre: "Indoor Cycle",
    resumen: "Bici, música y un profe que te lleva adelante. Salís con la energía arriba.",
    sedes: ["ituzaingo", "castelar"],
    foto: "/img/act-indoor.webp",
    fotoAlt: "Clase abierta de indoor cycle con la sala llena",
  },
  {
    nombre: "Zumba",
    resumen: "Se entrena bailando. Sin pasos que aprender de antes y sin quedarse afuera.",
    sedes: ["ituzaingo", "castelar", "padua"],
    foto: "/img/act-zumba.webp",
    fotoAlt: "Clase de Zumba con el salón lleno y las manos arriba",
    foco: "50% 60%",
  },
  {
    nombre: "Localizada",
    resumen: "Fuerza, tonificación y resistencia en una clase que trabaja todo el cuerpo.",
    sedes: ["ituzaingo", "castelar", "padua"],
    foto: "/img/act-localizada.webp",
    fotoAlt: "Clase de localizada trabajando con step en el salón",
  },
  {
    nombre: "G.A.P",
    resumen: "Glúteos, abdomen y piernas. Fuerza y resistencia concentradas en el tren inferior.",
    sedes: ["ituzaingo", "castelar", "padua"],
    foto: "/img/act-gap.webp",
    fotoAlt: "Clase de G.A.P trabajando en colchoneta",
  },
  {
    nombre: "Pilates Mat",
    resumen: "Postura, flexibilidad y control. Ideal para complementar o para empezar de cero.",
    sedes: ["ituzaingo", "castelar"],
  },
  {
    nombre: "Movi Flex",
    resumen: "Movilidad articular, elongación y control corporal para moverte sin rigidez.",
    sedes: ["ituzaingo"],
    foto: "/img/act-moviflex.webp",
    fotoAlt: "Clase de Movi Flex trabajando movilidad frente al espejo",
  },
  {
    nombre: "Xtreme Local",
    resumen: "Funcional de alta intensidad: fuerza, cardio y actitud al cien por ciento.",
    sedes: ["ituzaingo"],
    foto: "/img/act-funcional.webp",
    fotoAlt: "Clase funcional en el salón de la sede Padua",
    foco: "50% 72%",
  },
  {
    nombre: "Funcional",
    resumen: "Movimientos de todos los días, hechos bien y con carga progresiva.",
    sedes: ["ituzaingo", "castelar", "padua"],
  },
  {
    nombre: "Fight Do",
    resumen: "Coreografía de golpes y patadas sobre música. Descarga pura.",
    sedes: ["ituzaingo"],
  },
  {
    nombre: "Stretching",
    resumen: "Lo que hace que todo lo demás funcione mejor. No es un extra.",
    sedes: ["ituzaingo", "castelar"],
  },
  {
    nombre: "Yoga",
    resumen: "Clases abiertas para conectar con el cuerpo, con o sin experiencia previa.",
    sedes: ["ituzaingo"],
  },
];

/* --------------------------------------------------------------- la grilla */

/**
 * ⚠ REVISAR — Grilla publicada por Feedback en sus posteos e historias.
 * Confirmar con el cliente antes de publicar: los horarios rotan por temporada.
 */
export type Clase = {
  /** 1 = lunes … 6 = sábado */
  dias: number[];
  hora: string;
  actividad: string;
  profe?: string;
};

export const grilla: Record<SedeId, Clase[]> = {
  ituzaingo: [
    { dias: [1, 3, 5], hora: "08:00", actividad: "Pilates Mat", profe: "Yanina" },
    { dias: [2, 4], hora: "08:00", actividad: "Indoor Cycle", profe: "Romi" },
    { dias: [1, 3, 5], hora: "09:00", actividad: "Xtreme Local", profe: "Luciano" },
    { dias: [1, 3, 5], hora: "10:30", actividad: "G.A.P", profe: "Débora" },
    { dias: [1, 3, 5], hora: "14:00", actividad: "G.A.P" },
    { dias: [1, 3, 5], hora: "18:00", actividad: "Movi Flex", profe: "Mecha" },
    { dias: [1, 3, 5], hora: "18:00", actividad: "Xtreme Local", profe: "Luciano" },
    { dias: [2, 4], hora: "20:00", actividad: "G.A.P", profe: "Débora" },
  ],
  castelar: [
    { dias: [1, 3, 5], hora: "09:00", actividad: "Indoor Cycle", profe: "Débora" },
    { dias: [2, 4], hora: "09:00", actividad: "Pilates Mat" },
    { dias: [1, 3, 5], hora: "15:00", actividad: "G.A.P" },
    { dias: [2, 4], hora: "18:00", actividad: "Indoor Cycle", profe: "Karina" },
    { dias: [1, 3, 5], hora: "18:30", actividad: "Indoor Cycle", profe: "Sergio" },
    { dias: [2, 4], hora: "19:30", actividad: "Indoor Cycle", profe: "Chechu" },
    { dias: [6], hora: "11:00", actividad: "Indoor Cycle", profe: "Karina" },
  ],
  padua: [
    { dias: [1, 3, 5], hora: "09:00", actividad: "Localizada", profe: "Mariano" },
    { dias: [2, 4], hora: "09:00", actividad: "Zumba", profe: "Marchy" },
    { dias: [2, 4], hora: "14:00", actividad: "G.A.P", profe: "Débora" },
    { dias: [1, 3, 5], hora: "19:00", actividad: "Zumba", profe: "Romi" },
    { dias: [1, 3, 5], hora: "20:00", actividad: "Localizada", profe: "Romi" },
  ],
};

/* ------------------------------------------------------------ diferenciales */

export type Diferencial = {
  titulo: string;
  cuerpo: string;
  dato: string;
  foto: string;
  fotoAlt: string;
  foco?: string;
};

export const diferenciales: Diferencial[] = [
  {
    titulo: "Tu rutina en el celular",
    cuerpo:
      "Si sos socio tenés la app de Feedback: tu rutina siempre a mano, actualizada según tu progreso, con un video explicativo por ejercicio y el registro de cuánto entrenaste por semana y por mes.",
    dato: "App propia",
    foto: "/img/app.webp",
    foco: "50% 50%",
    fotoAlt: "Pantalla de la app de Feedback con el panel mensual de entrenamiento",
  },
  {
    titulo: "Todo el equipo certificado en RCP",
    cuerpo:
      "No solo los profes: recepción y mantenimiento también. La capacitación la dictó ACES, la Asociación para la Capacitación de Emergencias y Socorro. Y nos formamos en entrenamiento en la vejez, porque acompañar una vejez activa también es nuestra responsabilidad.",
    dato: "Certificado por ACES",
    foto: "/img/equipo-rcp.webp",
    fotoAlt: "El equipo de Feedback durante la capacitación de RCP dictada por ACES",
    foco: "50% 60%",
  },
  {
    titulo: "Entrenamiento más nutrición",
    cuerpo:
      "Podés entrenar con constancia y aun así no ver resultados. Por eso en la sede de Ituzaingó tenemos consultorio nutricional, con antropometría y seguimiento.",
    dato: "Consultorio en Ituzaingó",
    foto: "/img/sala-wide.webp",
    fotoAlt: "Sala de Feedback en horario de tarde, con socios entrenando",
    foco: "50% 88%",
  },
];

/* ------------------------------------------------------------------ planes */

/**
 * ⚠ COMPLETAR — Estructura confirmada por el cliente, montos pendientes.
 * Reemplazá cada `precio` por el monto real. El formato se arma solo.
 * Si dejás el placeholder, la página muestra "Consultanos" en vez de un número inventado.
 */
export const PRECIO_PENDIENTE = "__COMPLETAR__";

export type Plan = {
  id: string;
  plazo: string;
  detalle: string;
  destacado?: boolean;
  opciones: { forma: string; precio: string; nota: string }[];
};

export const planes: Plan[] = [
  {
    id: "mensual",
    plazo: "Pago de 1 mes",
    detalle: "La cuota mes a mes, sin permanencia.",
    opciones: [
      { forma: "Efectivo", precio: PRECIO_PENDIENTE, nota: "Abonás en recepción" },
      { forma: "Débito automático", precio: PRECIO_PENDIENTE, nota: "10% OFF sobre la cuota" },
    ],
  },
  {
    id: "trimestral",
    plazo: "Pago de 3 meses",
    detalle: "Pagás los tres juntos y accedés al descuento exclusivo.",
    destacado: true,
    opciones: [
      { forma: "Efectivo", precio: PRECIO_PENDIENTE, nota: "Abonás en recepción" },
      { forma: "Débito automático", precio: PRECIO_PENDIENTE, nota: "10% OFF sobre la cuota" },
    ],
  },
];

/** Beneficios que Feedback ya comunicó en su feed. */
export const beneficios = [
  "Primera clase de prueba sin cargo",
  "Sin costo de inscripción",
  "Congelás el valor de tu cuota, aunque aumente",
  "Entrenando de a dos, 25% OFF cada uno",
  "App de rutinas incluida",
] as const;

/* ------------------------------------------------------------------ profes */

/**
 * ⚠ REVISAR — Todos estos nombres aparecen como profes de Feedback en sus
 * posteos, historias y grillas publicadas. Confirmar el plantel actual y las
 * actividades de cada uno antes de publicar.
 */
export type Profe = { nombre: string; da: string[] };

export const profes: Profe[] = [
  { nombre: "Débora", da: ["G.A.P", "Indoor Cycle"] },
  { nombre: "Luciano", da: ["Xtreme Local", "Fight Do"] },
  { nombre: "Yanina", da: ["Pilates Mat"] },
  { nombre: "Romi", da: ["Indoor Cycle", "Zumba", "Localizada"] },
  { nombre: "Karina", da: ["Indoor Cycle"] },
  { nombre: "Sergio", da: ["Indoor Cycle"] },
  { nombre: "Chechu", da: ["Indoor Cycle"] },
  { nombre: "Mecha", da: ["Movi Flex"] },
  { nombre: "Mariano", da: ["Localizada", "Funcional"] },
  { nombre: "Marchy", da: ["Zumba"] },
  { nombre: "Mati", da: ["Musculación"] },
  { nombre: "Neri", da: ["Musculación"] },
  { nombre: "Cecilia", da: ["Indoor Cycle"] },
  { nombre: "Ezequiel", da: ["Indoor Cycle"] },
  { nombre: "Gladys", da: ["Zumba"] },
  { nombre: "Julieta", da: ["Zumba"] },
  { nombre: "Kary", da: ["Localizada"] },
  { nombre: "Flor", da: ["Localizada"] },
  { nombre: "Eva", da: ["Zumba"] },
  { nombre: "Marcelo", da: ["Xtreme Local"] },
];

/* -------------------------------------------------------------------- copy */

export const copy = {
  heroLinea1: "Nadie arranca sabiendo.",
  heroAcento: "Empezá igual.",
  heroBajada:
    "Gimnasio de barrio en Ituzaingó, Castelar y Padua. Veintidós años. La primera clase la pagamos nosotros.",
  ctaPrimario: "Probá una clase sin cargo",
  mensajeWhatsApp: (sede: string, actividad?: string) =>
    actividad
      ? `¡Hola Feedback ${sede}! Quiero probar una clase de ${actividad} sin cargo. ¿Qué día me conviene?`
      : `¡Hola Feedback ${sede}! Vi la página y quiero reservar una clase de prueba sin cargo. ¿Cómo sigo?`,
  cierreTitulo: "Lo importante es dar",
  cierreAcento: "el primer paso.",
  cierreBajada:
    "Traé ropa cómoda y una botella de agua. Del resto nos ocupamos nosotros.",
} as const;
