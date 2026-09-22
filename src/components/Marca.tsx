/**
 * Isotipo de Feedback reconstruido en SVG a partir de la medición del logo
 * original: la "F" cuyo travesaño es una fila de tres puntos (lima, blanco,
 * lima). Esa terna es el ritmo gráfico del sistema y se repite en toda la
 * página como separador, como indicador de sede y como marcador de paso.
 */

export function Isotipo({
  className,
  conDisco = true,
}: {
  className?: string;
  conDisco?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 224 224"
      className={className}
      role="img"
      aria-label="Feedback"
      fill="none"
    >
      {conDisco && <circle cx="112" cy="112" r="112" fill="var(--color-chapa)" />}
      <path
        d="M99.5 190.5V46.5H165"
        stroke="var(--color-lima)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="70.5" cy="109.5" r="10" fill="var(--color-lima)" />
      <circle cx="127.5" cy="109.5" r="10" fill="var(--color-lima)" />
      <circle
        cx="99.5"
        cy="109.5"
        r="11"
        fill={conDisco ? "var(--color-hueso)" : "var(--color-caucho)"}
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`semi-wide font-normal uppercase leading-none tracking-[0.06em] ${className ?? ""}`}
    >
      <span className="text-hueso">Feed</span>
      <span className="text-lima">back</span>
    </span>
  );
}

export function LogoCompleto({ className }: { className?: string }) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className ?? ""}`}>
      <Isotipo className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      <span className="flex min-w-0 flex-col gap-1">
        <Wordmark className="text-[0.9375rem] sm:text-[1.0625rem]" />
        <span className="rotulo hidden truncate text-[0.5rem] tracking-[0.24em] text-hueso-2 min-[420px]:block">
          Entrenamiento <span className="text-lima">&amp;</span> Bienestar
        </span>
      </span>
    </span>
  );
}

/** La terna del isotipo, usada como separador y como marcador de estado. */
export function Terna({
  activo = 0,
  className,
}: {
  activo?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[5px] ${className ?? ""}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block size-[5px] rounded-full"
          style={{
            background:
              i === activo ? "var(--color-hueso)" : "var(--color-lima)",
          }}
        />
      ))}
    </span>
  );
}
