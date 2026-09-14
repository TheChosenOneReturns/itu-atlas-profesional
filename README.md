# ITU Atlas

Sitio estático en español para explorar 250 perfiles laborales, 33 registros de materias, 2.551 relaciones y 79 fuentes. La portada Techwear abre el mapa, la trayectoria o el catálogo. La vista Trayectoria organiza las materias en seis semestres, conserva los tramos de materias anuales y distingue las alternativas optativas.

Los porcentajes son estimaciones de preparación curricular; no representan probabilidades de empleo. La metodología, sus límites y las referencias están disponibles dentro del sitio.

## Archivos

- `dist/index.html`, `dist/landing.css` y `dist/landing-polish.css`: portada y accesos a las tres vistas.
- `dist/atlas.html`: explorador interactivo del plan y los perfiles.
- `dist/app.js`: navegación, canvas SVG, arrastre, zoom, filtros y fichas.
- `dist/style.css`, `dist/canvas.css`, `dist/dark.css`, `dist/techwear.css` y `dist/minimal-atlas.css`: composición del lienzo y sistema visual Techwear.
- `dist/assets/stitch-*.svg`: motivos vectoriales locales basados en las referencias de Stitch aportadas.
- `src/motion.js` y `src/landing.js`: animaciones con Motion; sus paquetes compilados se sirven desde `dist`.
- `dist/fonts/`: Syne y JetBrains Mono locales.
- `dist/data.json`: investigación y cronología curricular, sin notas ni información del alumno.
- `dist/puestos.csv`: catálogo completo descargable.

## Ejecución local

Con Node.js instalado, desde esta carpeta ejecutá `npm start` y abrí `http://127.0.0.1:8000/`. No se requiere cuenta ni servicio de ChatGPT, Python o conexión a un CDN. Para modificar las animaciones, ejecutá `npm install` y `npm run build`; los paquetes ya compilados están incluidos en `dist` para iniciar el sitio sin instalar dependencias.

El servidor local escucha sólo en `127.0.0.1`. Podés cambiar el puerto con la variable de entorno `PORT`. Las referencias externas de la investigación sólo se abren cuando elegís uno de sus enlaces.

## Interacción

Arrastrar el fondo desplaza el lienzo; arrastrar un nodo modifica su posición. Ctrl + rueda controla el zoom, y Shift + rueda desplaza horizontalmente. También hay controles de zoom, ajuste y navegación por teclado. `/` abre la búsqueda y Escape cierra las fichas. Las animaciones respetan la preferencia de movimiento reducido.

La cronología procede del plan aportado (páginas 1–4) y del programa (páginas 21–22). Los conectores temporales no representan correlatividades ni porcentajes acumulados de preparación.

Las referencias de diseño aportadas inspiran la retícula, el contraste, la tipografía y los glifos. Las cifras y relaciones que muestra el sitio proceden de la investigación del proyecto, no de las maquetas gráficas. La portada no atribuye correlatividades ni tasas de contratación al plan.
