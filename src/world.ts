
export type World = boolean[][];
const worlds = new Map<string, World>();

export const getWorld = (id: string) => worlds.get(id) ?? defaultWorld();
export const setWorld = (id: string, world: World) => worlds.set(id, world);

export const renderCell = (worldId: string, alive: boolean, row: number, col: number) => `
  <div hx-post="/${worldId}/toggle" hx-vals='{"row": ${row}, "col": ${col}, "alive": ${alive}}' hx-swap="outerHTML" class="bg-${alive ? 'black' : 'white'} m-0" style="grid-row: ${row+1}; grid-column: ${col+1};"></div>
`
export const renderWorld = (worldId: string, world: World) => {
  return`<div id="world" class="aspect-square mx-auto w-full grid grid-gap-0 border">
  ${world.map((w, row) =>
    w.map((alive, col) => renderCell(worldId, alive, row, col)).join('')
  ).join('')}
</div>`
}
const generateWorld = (cols: number, rows: number): boolean[][]=>Array.from({length: rows}, () => Array(cols).fill(false))
const defaultWorld = () => generateWorld(50, 50);

export const iterateWorld = (world: World) => {
  const rows = world.length
  const cols = world?.[0].length
  const next = generateWorld(rows, cols);
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      const neighbors = countNeighbors(world, i, j);
      next[i][j] = world[i][j] ? [2,3].includes(neighbors) : neighbors == 3;
    }
  }
  return next;
}

const countNeighbors = (world: World, row: number, col: number) => {
  let neighbors = 0;
  for(let i = row-1; i < row+1+1; i++){
    for(let j = col-1; j < col+1+1; j++){
      if(world[i]?.[j] && !(i == row && j == col)){
        neighbors++;
      }
    }
  }
  return neighbors;
}