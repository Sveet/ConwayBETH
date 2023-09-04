import { Elysia } from "elysia";
import { html } from '@elysiajs/html'

const Cell = (alive: boolean) => {
  return alive ? `<div class="bg-black mx-0 my-0 border"></div>` : `<div class="bg-white mx-0 my-0 border"></div>`
}

const grid: boolean[][] = Array.from({length: 12}, () => Array(12).fill(false));
const cells = grid.map(r => r.map(c => Cell(c)).join('')).join('')
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
  <div class="container">
    <button class="" hx-post="/clicked" hx-swap="outerHTML">
      Click Me
    </button>
    <div class="grid grid-cols-12 aspect-square mx-auto">
      ${cells}
    </div>
  </div>
</body>
</html>
    `
    )
  })
  .post("/clicked", () => `<div>I'm from the server!</div>`)
  .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
