/**
 * Turso / libSQL database service — browser-compatible (HTTP mode)
 *
 * Uses @libsql/client/web which communicates via fetch() over HTTPS,
 * making it safe to use directly from a Vite/React browser app.
 */
import { createClient } from '@libsql/client/web'

function sanitizeEnvValue(value) {
  if (typeof value !== 'string') return ''
  return value.replace(/\\r|\\n|\r|\n/g, '').trim()
}

const url = sanitizeEnvValue(import.meta.env.VITE_TURSO_URL)
const token = sanitizeEnvValue(import.meta.env.VITE_TURSO_TOKEN)

const CONFIG_ERROR = 'Missing VITE_TURSO_URL or VITE_TURSO_TOKEN. Set these in your environment variables.'

let validUrl = false
if (url) {
  try {
    const parsed = new URL(url)
    validUrl = parsed.protocol === 'https:' || parsed.protocol === 'http:' || parsed.protocol === 'libsql:'
  } catch (err) {
    console.error('Invalid VITE_TURSO_URL:', err)
  }
}

export const db = validUrl && token ? createClient({ url, authToken: token }) : null

function ensureDb() {
  if (!db) {
    throw new Error(CONFIG_ERROR)
  }
  return db
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────
/**
 * Creates the `expenses` table if it doesn't already exist.
 * Call once on app startup.
 */
export async function initDB() {
  const client = ensureDb()
  await client.execute(`
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
    await client.execute("ALTER TABLE expenses ADD COLUMN user_id TEXT NOT NULL DEFAULT 'guest'")
  } catch (err) {
    if (!String(err?.message || '').toLowerCase().includes('duplicate')) {
      console.warn('Could not add user_id column:', err)
    }
  }
  try {
    await client.execute("ALTER TABLE expenses ADD COLUMN expense_date TEXT NOT NULL DEFAULT '2025-01-01'")
  } catch (err) {
    if (!String(err?.message || '').toLowerCase().includes('duplicate')) {
      console.warn('Could not add expense_date column:', err)
    }
  }
}

// ─── CRUD ────────────────────────────────────────────────────────────────────
/** Fetch all expenses for a specific user, newest first */
export async function fetchExpenses(userId) {
  const client = ensureDb()
  const res = await client.execute({
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
  const client = ensureDb()
  await client.execute({
    sql:    'INSERT INTO expenses (id, name, amount, category, user_id, expense_date) VALUES (?, ?, ?, ?, ?, ?)',
    args:   [id, name, amount, category, userId, date],
  })
}

/** Delete an expense by id */
export async function removeExpense(id) {
  const client = ensureDb()
  await client.execute({
    sql:  'DELETE FROM expenses WHERE id = ?',
    args: [id],
  })
}
