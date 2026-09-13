import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = dirname(fileURLToPath(import.meta.url));
const publicDirectory = resolve(projectDirectory, "dist");
const port = Number(process.env.PORT || 8000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".webp": "image/webp"
};

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT debe ser un número entre 1 y 65535");

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Ruta inválida");
    return;
  }
  const relative = pathname.replace(/^\/+/, "") || "index.html";
  const target = resolve(publicDirectory, relative);
  if (target !== publicDirectory && !target.startsWith(publicDirectory + sep)) {
    response.writeHead(403).end("Acceso denegado");
    return;
  }
  try {
    const details = await stat(target);
    if (!details.isFile()) throw new Error("No es un archivo");
    response.writeHead(200, {
      "Content-Type": mime[extname(target).toLowerCase()] || "application/octet-stream",
      "Content-Length": details.size,
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff"
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404).end("No se encontró el archivo");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`ITU Atlas local: http://127.0.0.1:${port}/`);
});
