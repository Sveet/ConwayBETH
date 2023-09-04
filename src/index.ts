import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { randomUUID } from "crypto";
import { World, getWorld, iterateWorld, renderCell, renderWorld, setWorld } from "./world";

const app = new Elysia()
  .use(html())
  .get("/", ({ set }) => set.redirect = `/${randomUUID()}`)
  .get("/:id", ({html, params: { id }}) => {
    let world: World = getWorld(id);
    return html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conway's Game of Life</title>
  <script src="https://unpkg.com/htmx.org@1.9.5"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="container w-full mx-auto">
    <div>
      <button class="border-slate-600 border rounded" hx-post="/${id}/next" hx-target="#world" hx-swap="outerHTML">
        Iterate
      </button>
      <div>
        <button class="border-slate-600 border rounded" hx-vals='js:{rate_ms: document.getElementById("rate").value}' hx-post="/${id}/next" hx-target="#world" hx-swap="outerHTML">
          Start World
        </button>
        <button class="border-slate-600 border rounded" hx-post="/${id}/stop" hx-target="#world" hx-swap="outerHTML">
          Stop World
        </button>
        <label for="rate" class="block text-sm font-medium leading-6 text-gray-900">Iteration Rate (ms)</label>
        <div class="mt-2">
          <input id="rate" name="rate" type="text" value="250" class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
    </div>
    ${renderWorld(id, world)}
  </div>
</body>
</html>
    `
    )
  })
  .post("/:id/toggle", ({body: {alive, row, col}, params: {id}}) => {
    const world = getWorld(id);
    world[row][col] = !alive;
    setWorld(id, world);
    return renderCell(id, !alive, row, col);
  }, {body: t.Object({
    alive: t.Boolean(),
    row: t.Integer(),
    col: t.Integer(),
  }), transform: ({body})=>{
    body.alive = (body as any).alive == 'true';
    body.row = +(body as any).row;
    body.col = +(body as any).col;
  }})
  .post("/:id/stop", ({params: {id}}) => {
    const world = getWorld(id);
    return renderWorld(id, world);
  })
  .post("/:id/next", ({body, params: {id}}) => {
    const world = getWorld(id);
    const next = iterateWorld(world);
    setWorld(id, next);
    return renderWorld(id, next, body?.rate_ms);
  }, {body: t.Optional(t.Object({rate_ms: t.Optional(t.Integer())})),transform: ({body})=> body.rate_ms = Number.parseInt((body as any).rate_ms) || undefined})
  .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
