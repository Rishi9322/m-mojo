/**
 * Turso / libSQL database service — browser-compatible (HTTP mode)
 *
 * Uses @libsql/client/web which communicates via fetch() over HTTPS,
 * making it safe to use directly from a Vite/React browser app.
 */
import { createClient } from '@libsql/client/web'

const url   = import.meta.env.VITE_TURSO_URL
const token = import.meta.env.VITE_TURSO_TOKEN

if (!url || !token) {
  throw new Error('Missing VITE_TURSO_URL or VITE_TURSO_TOKEN in .env')
}

export const db = createClient({ url, authToken: token })

// ─── Bootstrap ───────────────────────────────────────────────────────────────
/**
 * Creates the `expenses` table if it doesn't already exist.
 * Call once on app startup.
 */
export async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS expenses (
      id       TEXT PRIMARY KEY,
      name     TEXT NOT NULL,
      amount   REAL NOT NULL,
      category TEXT NOT NULL,
      user_id  TEXT NOT NULL DEFAULT 'guest',
      expense_date TEXT NOT NULL DEFAULT (date('now')),
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `)

  // Safely attempt to add columns for existing databases
  try {
    await db.execute("ALTER TABLE expenses ADD COLUMN user_id TEXT NOT NULL DEFAULT 'guest'")
  } catch (err) {
    if (!String(err?.message || '').toLowerCase().includes('duplicate')) {
      console.warn('Could not add user_id column:', err)
    }
  }
  try {
    await db.execute("ALTER TABLE expenses ADD COLUMN expense_date TEXT NOT NULL DEFAULT '2025-01-01'")
  } catch (err) {
    if (!String(err?.message || '').toLowerCase().includes('duplicate')) {
      console.warn('Could not add expense_date column:', err)
    }
  }
}

// ─── CRUD ────────────────────────────────────────────────────────────────────
/** Fetch all expenses for a specific user, newest first */
export async function fetchExpenses(userId) {
  const res = await db.execute({
    sql: 'SELECT id, name, amount, category, expense_date, created_at FROM expenses WHERE user_id = ? ORDER BY created_at DESC',
    args: [userId]
  })
  return res.rows.map(r => ({
    id:        r.id,
    name:      r.name,
    amount:    r.amount,
    category:  r.category,
    date:      r.expense_date,
    createdAt: r.created_at,
  }))
}

/** Insert a new expense row */
export async function insertExpense({ id, name, amount, category, userId, date }) {
  await db.execute({
    sql:    'INSERT INTO expenses (id, name, amount, category, user_id, expense_date) VALUES (?, ?, ?, ?, ?, ?)',
    args:   [id, name, amount, category, userId, date],
  })
}

/** Delete an expense by id */
export async function removeExpense(id) {
  await db.execute({
    sql:  'DELETE FROM expenses WHERE id = ?',
    args: [id],
  })
}
