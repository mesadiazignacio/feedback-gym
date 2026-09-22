# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4, ya scaffoldeado en el repo. Sin backend.

## Users

**Primario — el vecino del oeste del GBA que quiere volver a entrenar.** Vive o trabaja en Ituzaingó, Castelar o Padua. No busca la cadena más grande del país: busca un gimnasio cerca, que le quede de paso, donde no se sienta un número. Llega desde Instagram (11.351 seguidores) o desde el boca a boca del barrio, casi siempre desde el celular, y su duda real no es el precio sino *"¿me va a dar vergüenza?", "¿voy a saber qué hacer?", "¿tengo tiempo?"*.

Perfiles secundarios confirmados por su propio contenido: personas mayores (hicieron capacitación interna en entrenamiento en la vejez), mujeres que llegan por las clases grupales (Zumba, GAP, Localizada, Pilates), y socios que quieren sumar nutrición al entrenamiento.

**Job to be done:** decidir, desde el celular y en menos de dos minutos, si Feedback es el lugar donde va a empezar — y saber exactamente cómo dar el primer paso.

## Product Purpose

Landing informativa y de conversión para la cadena Feedback. Tiene que responder cuatro preguntas sin fricción — qué sedes hay y dónde quedan, qué actividades y en qué horarios, cuánto cuesta, y cómo empiezo — y derivar el contacto a WhatsApp de la sede elegida.

Éxito = el visitante identifica su sede más cercana y abre WhatsApp con un mensaje pre-escrito para reservar una clase de prueba sin cargo.

Éxito comercial paralelo: la pieza debe ser lo bastante buena como para que Feedback la quiera comprar al verla por email.

## Positioning

SportClub, OnFit y Fiter venden **red nacional y precio bajo**. Son cadenas: ninguna transmite pertenencia.

Feedback vende lo que una cadena no puede copiar: **22 años en Ituzaingó y tres sedes en el mismo oeste**, con profes que siguen a cada alumno por nombre. Es el gimnasio del barrio, hecho en serio. La escala es la ventaja de ellos; la cercanía es la nuestra.

## Operating Context

- El tráfico llega mayoritariamente desde el link en bio de Instagram (hoy apunta a un Linktree con 4 links sueltos: WhatsApp Castelar, WhatsApp Ituzaingó, y dos carpetas de Google Drive con los horarios en PDF). Esta landing reemplaza ese Linktree.
- La conversión real hoy ocurre por WhatsApp y por DM de Instagram, no por formulario.
- Los horarios cambian por temporada y hoy se distribuyen como imágenes/PDF; la landing tiene que poder actualizarlos sin rehacer el diseño.
- Los socios activos usan una app propia para ver su rutina; la landing la comunica pero no la reemplaza.

## Capabilities and Constraints

- Sitio estático, sin backend ni base de datos. Todo CTA resuelve a `wa.me` con mensaje pre-escrito, o a `mailto`/Instagram.
- Sin sistema de reservas, sin login, sin pagos online.
- Todo el contenido (sedes, actividades, horarios, precios, testimonios) vive en un único módulo de contenido tipado para que el cliente pueda editarlo sin tocar componentes.
- **Precios: estructura confirmada por el cliente, montos pendientes.** Cuatro celdas: pago de 1 mes (efectivo / débito) y pago de 3 meses (efectivo / débito). Los montos van como placeholder marcado hasta que el cliente los entregue — no se inventan.
- Imágenes: el único banco disponible es el contenido de @feedback.gym (fotos a 1080px máximo, reels a 720×1280). No hay sesión de fotos profesional. El diseño tiene que verse premium con ese material, no a pesar de él.
- Idioma: español rioplatense, voseo. Sin versión en inglés.

## Brand Commitments

- **Nombre:** Feedback. Wordmark en dos tonos: "FEED" en gris carbón, "BACK" en lima. Bajada oficial: *Entrenamiento & Bienestar*.
- **Isotipo:** badge circular gris carbón con una "F" lima construida con barra vertical, trazos horizontales y un punto.
- **Paleta propia** (muestreada de su logo y sus piezas, no elegida por nosotros): lima `#D9D92B`, gris carbón `#4D4D4E`, negros `#101010`–`#282828`, blanco `#F8F8F8`.
- **Voz:** voseo argentino, cálida, directa, sin grandilocuencia ni tono de coach agresivo. Frases propias reutilizables, textuales de sus posteos:
  - "No existe una actividad perfecta. Existe la que mejor se adapta a vos."
  - "No es solo un gimnasio. Es el lugar donde entrenás, te superás y también conectás."
  - "Nadie arranca sabiendo. Nadie arranca siendo el mejor. Lo importante es animarse al primer paso."
  - "Detrás de cada resultado, hay un proceso."
  - "Entrenar mejor > entrenar más."
  - "Gracias por elegirnos como su lugar, su espacio, su hogar."
- Firman con 💚 pese a que la marca es lima — es un tic real de su comunicación, no un error a corregir.

## Evidence on Hand

Todo lo siguiente está verificado en @feedback.gym o en su Linktree. Nada de esto puede reescribirse como invención.

**Sedes (3):**
| Sede | Dirección | WhatsApp | Notas |
|---|---|---|---|
| Ituzaingó | Alvear 1110/40 | 11 5967-9366 | Sede madre, 22 años. Tiene consultorio nutricional (lunes 16–20, miércoles 8–12). |
| Castelar | Pompeya 2450 | 11 2318-9933 | A 3 cuadras de la estación. Gym + clases + indoor cycle. +1000 m². |
| Padua | Formosa 720 | 11 2236-6667 | Sede nueva, abierta el lunes 7 de septiembre. |

**Horarios:** Lunes a viernes 6:30–23:00 · Sábados y domingos 8:00–20:00 (según bio de Instagram, confirmado por el cliente).

**Actividades verificadas:** Musculación, Indoor Cycle, Zumba, Localizada, G.A.P, Pilates Mat, Movi Flex, Xtreme Local, Fight Do, Funcional, Yoga (clases abiertas), Stretching.

**Diferenciales reales:**
- App propia: rutina en el celular, se actualiza según el progreso, video explicativo por ejercicio, seguimiento semanal y mensual.
- Consultorio nutricional en Ituzaingó.
- Seguimiento, corrección y planificación personalizada por alumno.
- Equipo completo (profes, recepción y mantenimiento) con RCP certificado por ACES; capacitación interna en entrenamiento en la vejez.

**Serie de objeciones, escrita por ellos** (piezas reales de su feed, par objeción → respuesta):
"No me animo a empezar" → "Todos empezamos alguna vez" · "¿Y si no puedo?" → "¿Y si puedo?" · "Soy muy grande para empezar" → "Mi salud no tiene edad" · "No veo cambios" → "Cada esfuerzo suma" · "No tengo tiempo" → "Merezco tiempo para mí" · "Mejor arranco el lunes" → "Hoy también es un buen día".

**Mecánicas comerciales que ya usaron:** débito automático con 10% OFF · planes trimestrales con descuento · pagás 4 meses y entrenás 6 · sin costo de inscripción · congelamiento de cuota · 25% OFF entrenando de a dos · clase de prueba sin cargo.

**Profes nombrados:** Mati Pajón, Neri Pedernera, Débora Martens, Luciano Carreiro, Cecilia Quiña, Romi, Ezequiel Campoya, Gla Centu, Julieta García Rocha, Marchi, Mecha, Yanina, Karina, Sergio, Chechu, Mariano, Kary, Gladys, Lucho, Marcelo, Flor, Eva.

**Contacto:** feedback_eyb@hotmail.com · Instagram @feedback.gym

**Ausencias que no se pueden fabricar:** no hay testimonios de socios con nombre y foto, no hay cantidad de socios publicada, no hay métricas de resultados, no hay precios públicos, no hay premios ni prensa. Cualquier prueba social tiene que salir de lo que existe: los 22 años, las 3 sedes, los 11.351 seguidores, las certificaciones del equipo y las fotos reales de comunidad.

## Product Principles

1. **La cercanía es el producto.** Cada decisión de contenido tiene que hacer sentir que la sede está a la vuelta y que del otro lado hay gente, no un call center.
2. **Bajar la barrera de entrada antes que vender.** El obstáculo real es la vergüenza y la inercia, no el precio. Responder la objeción viene antes que mostrar la cuota.
3. **Solo hechos verificables.** Nada de socios inventados, resultados prometidos ni testimonios fabricados. La prueba son los 22 años, las 3 sedes y el equipo certificado.
4. **Un paso, no un embudo.** Todo camino termina en el mismo lugar: WhatsApp de la sede más cercana, con el mensaje ya escrito.
5. **El cliente tiene que poder mantenerla.** Horarios, precios y actividades cambian seguido: viven en contenido editable, no incrustados en el diseño.

## Accessibility & Inclusion

Público real de amplio rango etario, incluidas personas mayores (target explícito de su capacitación interna). Implica: tamaño de texto cómodo, contraste alto sobre fondo oscuro, targets táctiles generosos y nada de información crítica comunicada solo por color. Mobile-first real: la mayoría del tráfico llega desde Instagram en el celular.
