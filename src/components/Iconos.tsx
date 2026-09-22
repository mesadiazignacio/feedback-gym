/**
 * Set de íconos dibujado a mano sobre grilla de 24, trazo 1.75, cabos y uniones
 * redondeados. Un solo peso para todo el sitio: nada de emoji ni de glifos
 * prestados haciendo de sistema de íconos.
 */

type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconoWhatsApp = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M3.5 20.5 4.9 16.4A8.2 8.2 0 1 1 8 19.3l-4.5 1.2Z" />
    <path d="M9 8.4c.3-.1.6 0 .8.3l.8 1.4c.1.3.1.6-.1.8l-.5.6c-.1.2-.2.4 0 .7.5.9 1.2 1.6 2.1 2.1.3.2.5.1.7-.1l.6-.5c.2-.2.5-.2.8-.1l1.4.8c.3.2.4.5.3.8-.2.9-1 1.5-1.9 1.4a8 8 0 0 1-6.4-6.4c-.1-.9.5-1.7 1.4-1.8Z" />
  </svg>
);

export const IconoInstagram = ({ className }: Props) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.1" cy="6.9" r=".9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconoMail = ({ className }: Props) => (
  <svg {...base} className={className}>
    <rect x="2.75" y="5" width="18.5" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconoPin = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </svg>
);

export const IconoReloj = ({ className }: Props) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 6.75V12l3.4 2" />
  </svg>
);

export const IconoFlecha = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </svg>
);

export const IconoFlechaAbajo = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M12 4.5v15" />
    <path d="m6 13.5 6 6 6-6" />
  </svg>
);

export const IconoTilde = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="m4.75 12.5 4.8 4.8 9.7-10.6" />
  </svg>
);

export const IconoMenos = ({ className }: Props) => (
  <svg {...base} className={className}>
    <path d="M5 12h14" />
  </svg>
);
