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

${children}

</html>
`
const app = new Elysia()
  .use(html())
  .get("/", ({html}) => 
  html(
    <BaseHtml>
      <body>
        <button hx-post="/clicked" hx-swap="outerHTML">
          Click Me
        </button>
      </body>
    </BaseHtml>
  )
  )
  .post("/clicked", () => <div>I'm from the server!</div>)
  .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
