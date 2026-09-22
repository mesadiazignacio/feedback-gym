---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

Landing única de Feedback (`src/app/page.tsx`). Modo: **Persuade**.

Visitante: vecino de Ituzaingó, Castelar o Padua que llega desde el link en bio de Instagram, de noche, desde el celular. Su freno real es la vergüenza y la inercia, no el precio. Acción: elegir su sede y abrir WhatsApp con el mensaje ya escrito para reservar una clase de prueba sin cargo.

Prueba disponible: 22 años en Ituzaingó, 3 sedes reales con dirección y WhatsApp propios, 12 actividades verificadas, equipo con RCP certificado por ACES, app propia de rutinas, consultorio nutricional, fotos reales de sala y de comunidad. No hay testimonios, ni cantidad de socios, ni resultados medidos: no se inventan.

Restricciones: sitio estático sin backend; todo CTA resuelve a `wa.me`. Los montos de los planes son placeholder marcado hasta que el cliente los entregue. Banco de imágenes limitado al contenido de @feedback.gym (1080px máximo).

## Direction contract

**THESIS:** Feedback mide y te devuelve el número — el nombre de la marca es el mecanismo. La página se construye con el sistema de la sala: discos calibrados, señalética estarcida, numerales que se leen de lejos y color que significa en vez de decorar. Rechaza explícitamente el arreglo que ya ship SportClub, OnFit y Fiter: hero con foto a sangre de alguien levantando peso, titular condensado en mayúsculas y carrusel de promos.

**OWN-WORLD:** Fondo caucho negro `#0B0B0B`, chapa carbón `#4D4D4E` como material de superficie y regla, lima `#D9D92B` como valor funcional del sistema (sede activa, hora abierta, acción primaria) y blanco hueso `#F4F4F2` para el texto. Una sola familia, Archivo variable, trabajada por eje de ancho: numerales y titulares en wdth 125 a escala de afiche, etiquetas en versalitas con tracking abierto, cuerpo en wdth 100 con numerales tabulares. Cero gradientes, cero sombras blandas, cero vidrio: la profundidad sale del solape y del campo de color plano. Bordes rectos y reglas de 1px en carbón dividiendo un plano continuo; el único radio es el del disco. Los tres puntos del isotipo (lima–blanco–lima) son el ritmo gráfico del sistema: separador, indicador de sede disponible y marcador de paso.

**STORY:** El visitante entiende en segundos que Feedback tiene tres sedes en el oeste, que hace veintidós años que está y que ahora mismo está abierto. Cree que puede entrar sin saber nada porque la página le devuelve su propia objeción, escrita por ellos: "no me animo a empezar" → "todos empezamos alguna vez". Hace una sola cosa: elige su sede y abre WhatsApp con el mensaje listo.

**FIRST VIEWPORT:** Pantalla completa en negro. Barra superior de chapa con el isotipo y el wordmark a la izquierda y el estado en vivo a la derecha. Columna izquierda de siete columnas: el titular a escala de afiche en dos líneas de leading 0.88, "NADIE ARRANCA SABIENDO." en blanco hueso y "EMPEZÁ IGUAL." en lima; debajo, una sola frase con las tres sedes, los veintidós años y el horario; debajo, la acción primaria como barra lima ancha y, pegado, el selector segmentado de las tres sedes. Columna derecha de cinco columnas: foto real de sala en marco vertical plano, sin sombra, con una placa estarcida abajo con la dirección de la sede elegida. Cruzando el ancho completo al pie del viewport, la firma de la página: una regla calibrada del día de 6:30 a 23:00 con marcas de tick, un marcador lima en la hora real del visitante y la leyenda de abierto o cerrado. La acción primaria vive en la mitad izquierda, por encima del pliegue, a la altura de la mirada.

**FORM:** Disco y Chapa — el sistema de discos calibrados y señalética de sala; candidata 5 de mi lista ordenada de siete, asignada por el sorteo. Seed key `51106e17`, kind `assigned`, build path code-led. Interacción firma: el selector de sede re-teclea la página entera — foto, placa de dirección, regla del día, grilla de actividades y destino de WhatsApp — con el marcador deslizándose por la regla y la placa re-estampándose con un barrido de clip-path, ease-out exponencial, todo visible por defecto. Raises tomados: la hora como estado real de la página (de Nocturno del Oeste), profundidad solo por solape y color plano (de Papel recortado), escala tipográfica de afiche con micro-etiquetas al margen (de Portal shader), cada sede como objeto completo con dirección y número en peso pleno (de Cajita de fósforos), grilla como plano construido continuo en vez de cards flotantes (de Perspectiva inversa), y empezar mostrado como pasos numerados comparables (de Cuarto oscuro).

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
