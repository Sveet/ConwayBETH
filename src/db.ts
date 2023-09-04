import { Database } from 'bun:sqlite';
import { randomUUID } from 'crypto';

// Initialize the database
const db = new Database('conway_worlds.db');

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS worlds (
    id TEXT PRIMARY KEY,
    cells TEXT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// CRUD operations for worlds
export function createWorld(cells: boolean[][], id?: string): string {
  const worldId = id || randomUUID();
  const stmt = db.prepare("INSERT INTO worlds (id, cells) VALUES (?, ?)");
  stmt.run(worldId, JSON.stringify(cells));
  return worldId;
}

export type WorldInfo = { id: string, cells: boolean[][], created: Date, updated: Date };
export function readWorld(id: string): WorldInfo | undefined {
  const stmt = db.prepare("SELECT id, cells, created, updated FROM worlds WHERE id = ?");
  const result: any = stmt.get(id);
  return result ? {
    id: result.id,
    cells: JSON.parse(result.cells),
    created: new Date(result.created),
    updated: new Date(result.updated)
  } : undefined;
}

export function updateWorld(id: string, cells: boolean[][]): void {
  const stmt = db.prepare("UPDATE worlds SET cells = ?, updated = CURRENT_TIMESTAMP WHERE id = ?");
  stmt.run(JSON.stringify(cells), id);
}

export function upsertWorld(worldId: string, cells: boolean[][]): string {
  const stmt = db.prepare(`
      INSERT INTO worlds (id, cells) VALUES (?, ?)
      ON CONFLICT(id) DO UPDATE SET cells = excluded.cells, updated = CURRENT_TIMESTAMP
  `);
  stmt.run(worldId, JSON.stringify(cells));
  return worldId;
}


export function deleteWorld(id: string): void {
  const stmt = db.prepare("DELETE FROM worlds WHERE id = ?");
  stmt.run(id);
}