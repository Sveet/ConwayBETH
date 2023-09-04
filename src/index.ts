import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { randomUUID } from "crypto";

type World = boolean[][];
const worlds = new Map<string, World>();

const renderCell = (worldId: string, alive: boolean, row: number, col: number) => `
  <div hx-post="/${worldId}/toggle" hx-vals='{"row": ${row}, "col": ${col}, "alive": ${alive}}' hx-swap="outerHTML" class="bg-${alive ? 'black' : 'white'} m-0 border" style="grid-row: ${row+1}; grid-column: ${col+1};"></div>
`
const renderWorld = (worldId: string, world: World) => {
  return`<div class="aspect-square mx-auto w-full grid grid-gap-0">
  ${world.map((g, row) =>
    g.map((alive, col) => renderCell(worldId, alive, row, col)).join('')
  ).join('')}
</div>`
}
const emptyWorld = (cols: number, rows: number): boolean[][]=>Array.from({length: rows}, () => Array(cols).fill(false))

const app = new Elysia()
  .use(html())
  .get("/", ({ set }) => set.redirect = `/${randomUUID()}`)
  .get("/:id", ({html, params: { id }}) => {
    let world: World = worlds.get(id) ?? emptyWorld(40, 40);
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
    <button class="" hx-post="/clicked" hx-swap="outerHTML">
      Click Me
    </button>
    ${renderWorld(id, world)}
  </div>
</body>
</html>
    `
    )
  })
  .post("/:id/toggle", ({body: {alive, row, col}, params: {id}}) => {
    const world = worlds.get(id) ?? emptyWorld(40, 40);
    world[row][col] = !alive;
    worlds.set(id, world);
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
  .post("/clicked", () => `<div>I'm from the server!</div>`)
  .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
