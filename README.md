# ITU Atlas

Sitio estático en español para explorar 250 perfiles laborales, 33 registros de materias, 2.551 relaciones y 79 fuentes. La vista Trayectoria organiza las materias en seis semestres, conserva los tramos de materias anuales y distingue las alternativas optativas.

Los porcentajes son estimaciones de preparación curricular; no representan probabilidades de empleo. La metodología, sus límites y las referencias están disponibles dentro del sitio.

## Archivos

- `dist/index.html`: estructura y controles.
- `dist/app.js`: navegación, canvas SVG, arrastre, zoom, filtros, fichas y herramientas WebMCP.
- `dist/style.css` y `dist/canvas.css`: estilos base y composición de lienzo completo.
- `dist/data.json`: investigación y cronología curricular, sin notas ni información del alumno.
- `dist/puestos.csv`: catálogo completo descargable.

No requiere compilación ni dependencias. Servir `dist` mediante HTTP. Los scripts de preparación locales no forman parte del sitio ni son necesarios para ejecutarlo.

## Interacción

Arrastrar el fondo desplaza el lienzo; arrastrar un nodo modifica su posición. Ctrl + rueda controla el zoom, y Shift + rueda desplaza horizontalmente. También hay controles de zoom, ajuste y navegación por teclado. `/` abre la búsqueda y Escape cierra las fichas. Las animaciones respetan la preferencia de movimiento reducido.

La cronología procede del plan aportado (páginas 1–4) y del programa (páginas 21–22). Los conectores temporales no representan correlatividades ni porcentajes acumulados de preparación.
