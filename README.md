# ITU Atlas

Sitio estático en español para explorar 250 perfiles laborales, 33 registros de materias, 2.551 relaciones y 79 fuentes. La vista Trayectoria organiza las materias en seis semestres, conserva los tramos de materias anuales y distingue las alternativas optativas.

Los porcentajes son estimaciones de preparación curricular; no representan probabilidades de empleo. La metodología, sus límites y las referencias están disponibles dentro del sitio.

## Archivos

- `dist/index.html`: estructura y controles.
- `dist/app.js`: navegación, canvas SVG, arrastre, zoom, filtros, fichas y herramientas WebMCP.
- `dist/style.css`, `dist/canvas.css`, `dist/dark.css` y `dist/techwear.css`: composición del lienzo y sistema visual Techwear.
- `src/motion.js`: entrada de animaciones con Motion; `dist/motion.bundle.js`: versión compilada para el sitio estático.
- `dist/fonts/`: Syne y JetBrains Mono locales.
- `dist/data.json`: investigación y cronología curricular, sin notas ni información del alumno.
- `dist/puestos.csv`: catálogo completo descargable.

Para editar las animaciones, ejecutar `npm install` y `npm run build:motion`. El sitio publicado usa el paquete ya compilado y se sirve desde `dist` mediante HTTP. Los scripts de preparación de datos locales no forman parte del sitio.

## Interacción

Arrastrar el fondo desplaza el lienzo; arrastrar un nodo modifica su posición. Ctrl + rueda controla el zoom, y Shift + rueda desplaza horizontalmente. También hay controles de zoom, ajuste y navegación por teclado. `/` abre la búsqueda y Escape cierra las fichas. Las animaciones respetan la preferencia de movimiento reducido.

La cronología procede del plan aportado (páginas 1–4) y del programa (páginas 21–22). Los conectores temporales no representan correlatividades ni porcentajes acumulados de preparación.

Las referencias de diseño aportadas inspiran la retícula, el contraste, la tipografía y los glifos. Las cifras y relaciones que muestra el sitio proceden de `data.json`, no de las maquetas gráficas.
