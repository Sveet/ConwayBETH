import { Elysia } from "elysia";
import { html } from '@elysiajs/html'

const renderGrid = (grid: boolean[][]) => {
  return`<div class="aspect-square mx-auto w-full grid grid-gap-0">
  ${grid.map((g, row) =>
    g.map((alive, col) => `
      <div data-row="${row}" data-col="${col}" class="bg-${alive ? 'black' : 'white'} m-0 border" style="grid-row: ${row+1}; grid-column: ${col+1};"></div>
    `).join('')
  ).join('')}
</div>`
}
const createGrid = (cols: number, rows: number): boolean[][]=>Array.from({length: rows}, () => Array(cols).fill(false))

const app = new Elysia()
  .use(html())
  .get("/", ({html}) => {
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
    ${renderGrid(createGrid(20, 20))}
  </div>
</body>
</html>
    `
    )
  })
  .post("/clicked", () => `<div>I'm from the server!</div>`)
  .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
