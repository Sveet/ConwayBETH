import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'

const BaseHtml = ({ children }: elements.Children) => `
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
${children}
</body>
</html>
`
const grid = Array(12).map(g => new Array(12));
const app = new Elysia()
  .use(html())
  .get("/", ({html}) =>
  html(
    <BaseHtml>
      <button hx-post="/clicked" hx-swap="outerHTML">
        Click Me
      </button>
      ${renderGrid(grid)}
    </BaseHtml>
  )
  )
  .post("/clicked", () => <div>I'm from the server!</div>)
  .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

const Cell = (alive: boolean) => alive ? <div class="bg-black">x</div> : <div class="bg-white">x</div>

const renderGrid = (grid: boolean[][]) => {
  const cells = grid.map(r => r.map(c => Cell(c)))
  return <div class="grid grid-cols-12 aspect-square mx-auto">
    ${cells}
  </div>
}