# ITU Atlas

Sitio estático en español para explorar 250 perfiles laborales, 33 registros de materias, 2.551 relaciones y 79 fuentes. La portada Techwear abre el mapa, la trayectoria o el catálogo. La vista Trayectoria organiza las materias en seis semestres, conserva los tramos de materias anuales y distingue las alternativas optativas.

**Sitio publicado:** [thechosenonereturns.github.io/itu-atlas-profesional](https://thechosenonereturns.github.io/itu-atlas-profesional/)

Los porcentajes son estimaciones de preparación curricular; no representan probabilidades de empleo. La metodología, sus límites y las referencias están disponibles dentro del sitio.

## Lectura de nodos y evidencia

Los nodos vinculados a una materia o a un perfil abren una ficha de la relación con cuatro partes: contenido del programa, interpretación del vínculo, límite documental y demostración práctica propuesta. Incluyen el identificador de fuente y las páginas registradas. Desde esa ficha se puede abrir la materia o el perfil completo.

Las categorías visibles son N (aporte directo parcial, llamado «Aporte nuclear parcial» en el CSV), B (base transferible), T (transversal) y C (práctica condicionada). El color y el trazo identifican categorías; el grosor de las líneas no representa una intensidad medida. Las conexiones de familias son agrupaciones editoriales.

Cuando la aplicación de una relación repite el aporte global del perfil, se identifica como síntesis de varias materias. No se atribuye todo el texto a una materia aislada. Las actividades de validación se presentan como propuestas, no como entregas o resultados comprobados. El porcentaje se conserva en la ficha del perfil junto con sus dimensiones y cálculo; no se asigna a los vínculos.

La revisión de presentación conserva los datos de la investigación. `node verify-evidence.cjs` comprueba su igualdad con la fuente, la representación de los 2.551 vínculos y las fichas y mapas de las 33 materias y 250 perfiles con y sin aportes transversales. Los estilos de esta revisión están en `dist/evidence.css`.

## Publicación

La rama `main` despliega únicamente `dist/` en GitHub Pages mediante `.github/workflows/pages.yml`. El proyecto se compila y verifica antes de crear el artefacto de publicación.

## Archivos

- `dist/index.html`, `dist/landing.css` y `dist/landing-polish.css`: portada y accesos a las tres vistas.
- `dist/atlas.html`: explorador interactivo del plan y los perfiles.
- `dist/app.js`: navegación, canvas SVG, arrastre, zoom, filtros y fichas.
- `dist/style.css`, `dist/canvas.css`, `dist/dark.css`, `dist/techwear.css` y `dist/minimal-atlas.css`: composición del lienzo y sistema visual Techwear.
- `dist/assets/stitch-glyph-*.svg`, `dist/assets/stitch-mesh-*.svg` y `stitch-barcode.svg`: ocho glifos, tres mallas y un código de barras animado extraídos de los SVG del proyecto Stitch **Sistema Diseño Materias ITU**. Los archivos se sirven localmente y respetan `prefers-reduced-motion`. Las piezas `stitch-orbit.svg`, `stitch-tunnel.svg` y `stitch-contours.svg` anteriores siguen disponibles como referencias.
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

## Conexión de Stitch en Codex

El MCP de Stitch se configuró en el Codex local con `https://stitch.googleapis.com/mcp`. La clave se lee de la variable de entorno `STITCH_API_KEY` del usuario; no se guarda en este repositorio. La entrada global tiene esta forma:

```toml
[mcp_servers.stitch]
url = "https://stitch.googleapis.com/mcp"
env_http_headers = { "X-Goog-Api-Key" = "STITCH_API_KEY" }
```

La conexión se verificó con `initialize`, `tools/list` y lectura del proyecto de Stitch. Si el MCP todavía no aparece en una tarea ya abierta de Codex, reiniciá la aplicación para que cargue la nueva configuración y variable de entorno. La web funciona sin Stitch ni una clave cuando se ejecuta localmente.
