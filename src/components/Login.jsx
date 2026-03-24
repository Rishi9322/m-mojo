import { useState } from 'react'

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [passcode, setPasscode] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const switchMode = (m) => {
    setMode(m)
    setPasscode('')
    setConfirm('')
    setError('')
    setSuccess('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = passcode.trim()

    if (trimmed.length < 3) {
      setError('Passcode must be at least 3 characters.')
      return
    }

    if (mode === 'register') {
      if (trimmed !== confirm.trim()) {
        setError('Passcodes do not match. Please try again.')
        return
      }
      setSuccess('Vault created! Logging you in…')
    }

    // passcode acts as the userId — each unique passcode = a private vault
    const userId = trimmed.toLowerCase().replace(/[^a-z0-9]/g, '')
    setTimeout(() => onLogin(userId), mode === 'register' ? 800 : 0)
  }

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <div className="card-inner">
          {/* Logo & title */}
          <div className="login-header">
            <div className="header-logo" style={{ margin: '0 auto 16px' }} aria-hidden="true">🌿</div>
            <h1 className="header-title" style={{ color: 'var(--text-primary)', textAlign: 'center' }}>ExpenseTrack</h1>
            <p className="header-tagline" style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>
              {mode === 'login' ? 'Welcome back — enter your passcode to unlock your vault.' : 'Create your personal vault with a unique passcode.'}
            </p>
          </div>

          {/* Register / Login tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              🔑 Log In
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => switchMode('register')}
            >
              ✨ Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
            <div className="form-group">
              <label className="form-label">
                {mode === 'register' ? 'Choose a Passcode' : 'Secret Passcode'}
              </label>
              <input
                type="password"
                className="form-input"
                placeholder={mode === 'register' ? 'e.g. mysecretvault42' : 'Enter your passcode'}
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setError(''); setSuccess('') }}
                autoFocus
              />
            </div>

            {mode === 'register' && (
              <div className="form-group">
                <label className="form-label">Confirm Passcode</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-enter your passcode"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setError(''); setSuccess('') }}
                />
              </div>
            )}

            {error && <p className="form-error">⚠ {error}</p>}
            {success && <p style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>✅ {success}</p>}

            <button type="submit" className="submit-btn" style={{ marginTop: '16px' }}>
              {mode === 'register' ? 'Create My Vault →' : 'Unlock Vault →'}
            </button>
          </form>

          {/* Hint text */}
          <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '24px', lineHeight: '1.6' }}>
            {mode === 'login'
              ? <p>Don't have an account? <button type="button" onClick={() => switchMode('register')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', fontSize: 'inherit', padding: 0 }}>Register here</button>.</p>
              : <p>Already have a vault? <button type="button" onClick={() => switchMode('login')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', fontSize: 'inherit', padding: 0 }}>Log in here</button>.</p>
            }
            <p style={{ marginTop: '8px', opacity: 0.7 }}>Each passcode is a private vault — no email needed.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
