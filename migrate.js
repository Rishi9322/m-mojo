import { createClient } from '@libsql/client/web.js'
import fs from 'fs'

const env = fs.readFileSync('.env', 'utf-8')
const getEnv = key => {
  const match = env.match(new RegExp(`${key}=(.*)`))
  return match ? match[1].trim() : null
}
const url = getEnv('VITE_TURSO_URL')
const token = getEnv('VITE_TURSO_TOKEN')

const db = createClient({ url, authToken: token })

async function migrate() {
  console.log('Starting Turso migration...')
  try {
    await db.execute("ALTER TABLE expenses ADD COLUMN user_id TEXT NOT NULL DEFAULT 'guest'")
    console.log('✅ Added user_id')
  } catch (e) {
    console.error('⚠ user_id skipped:', e.message)
  }

  try {
    await db.execute("ALTER TABLE expenses ADD COLUMN expense_date TEXT NOT NULL DEFAULT '2025-01-01'")
    console.log('✅ Added expense_date')
  } catch (e) {
    console.error('⚠ expense_date skipped:', e.message)
  }
}

migrate()
