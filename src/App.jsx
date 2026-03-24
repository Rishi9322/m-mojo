import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import SummaryPanel from './components/SummaryPanel'
import CurrencyConverter from './components/CurrencyConverter'
import ExpenseList from './components/ExpenseList'
import ExpenseCharts from './components/ExpenseCharts'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import { initDB, fetchExpenses, insertExpense, removeExpense } from './lib/db'
import './index.css'

const LS_DARK = 'expensetrack_dark'
const LS_USER = 'expensetrack_user'

function readStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch (err) {
    console.warn(`Storage read failed for ${key}:`, err)
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (err) {
    console.warn(`Storage write failed for ${key}:`, err)
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.warn(`Storage remove failed for ${key}:`, err)
  }
}

export default function App() {
  const [expenses, setExpenses]   = useState([])
  const [dbError, setDbError]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [timeFilter, setTimeFilter] = useState('all')
  const [showLogin, setShowLogin] = useState(false)

  const [userId, setUserId] = useState(() => readStorage(LS_USER, null))

  const [darkMode, setDarkMode] = useState(() => readStorage(LS_DARK, 'false') === 'true')

  // Apply dark mode
  useEffect(() => {
    writeStorage(LS_DARK, String(darkMode))
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Init DB and load expenses on mount or user change
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await initDB()
        if (userId) {
          const rows = await fetchExpenses(userId)
          if (!cancelled) {
            setExpenses(rows)
          }
        } else {
          // Explicitly clear expenses if logged out
          if (!cancelled) {
            setExpenses([])
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Turso init error:', err)
          setDbError('Could not connect to the database. Please check your connection.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [userId])

  const handleLogin = (id) => {
    writeStorage(LS_USER, id)
    setUserId(id)
  }

  const handleLogout = () => {
    removeStorage(LS_USER)
    setUserId(null)
  }

  const addExpense = async (expense) => {
    const expenseWithUser = { ...expense, userId }
    // Optimistic update — add to UI immediately
    setExpenses(prev => [expenseWithUser, ...prev])
    try {
      await insertExpense(expenseWithUser)
    } catch (err) {
      console.error('Insert failed:', err)
      // Roll back on failure
      setExpenses(prev => prev.filter(e => e.id !== expense.id))
      setDbError('Failed to save expense. Please try again.')
    }
  }

  const deleteExpense = async (id) => {
    // Optimistic update
    setExpenses(prev => prev.filter(e => e.id !== id))
    try {
      await removeExpense(id)
    } catch (err) {
      console.error('Delete failed:', err)
      setDbError('Failed to delete expense. Please try again.')
    }
  }

  const filteredExpenses = expenses.filter(e => {
    if (timeFilter === 'all') return true
    if (!e.date) return true
    const expDate = new Date(e.date)
    const now = new Date()
    if (timeFilter === 'month') {
      return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear()
    }
    if (timeFilter === 'year') {
      return expDate.getFullYear() === now.getFullYear()
    }
    return true
  })

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="app">
      <Header 
        darkMode={darkMode} 
        onToggleDark={() => setDarkMode(d => !d)} 
        userId={userId}
        onLogout={handleLogout}
      />

      <main className="main-content" id="main">

        {/* DB Error Banner */}
        {dbError && (
          <div className="db-error-banner" role="alert">
            <span>⚠ {dbError}</span>
            <button onClick={() => setDbError(null)} className="db-error-close" aria-label="Dismiss">×</button>
          </div>
        )}

        {/* Loading / Login / Dashboard */}
        {loading ? (
          <div className="db-loading" role="status" aria-live="polite">
            <div className="db-spinner" />
            <p>Connecting to database…</p>
          </div>
        ) : !userId ? (
          showLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <LandingPage onGetStarted={() => setShowLogin(true)} />
          )
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', gap: '8px' }}>
              <button className={`category-pill ${timeFilter === 'all' ? 'active' : ''}`} onClick={() => setTimeFilter('all')} style={timeFilter === 'all' ? {background: 'var(--primary)'} : {}}>All Time</button>
              <button className={`category-pill ${timeFilter === 'month' ? 'active' : ''}`} onClick={() => setTimeFilter('month')} style={timeFilter === 'month' ? {background: 'var(--primary)'} : {}}>This Month</button>
              <button className={`category-pill ${timeFilter === 'year' ? 'active' : ''}`} onClick={() => setTimeFilter('year')} style={timeFilter === 'year' ? {background: 'var(--primary)'} : {}}>This Year</button>
            </div>

            <div className="top-grid">
              <ExpenseForm onAdd={addExpense} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <SummaryPanel expenses={filteredExpenses} />
                <CurrencyConverter totalUSD={total} />
              </div>
            </div>

            <ExpenseCharts expenses={filteredExpenses} />
            <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
          </>
        )}
      </main>
    </div>
  )
}
