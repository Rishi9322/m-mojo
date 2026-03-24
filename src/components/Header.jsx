export default function Header({ darkMode, onToggleDark, userId, onLogout }) {
  return (
    <header className="header" role="banner">
      <div className="header-brand">
        <div className="header-logo" aria-hidden="true">🌿</div>
        <div>
          <h1 className="header-title">ExpenseTrack</h1>
          <p className="header-tagline">Smart spending, clear insights.</p>
        </div>
      </div>

      <div className="header-actions">
        {userId && (
          <button className="auth-btn" onClick={onLogout} aria-label="Sign Out">
            <span role="img" aria-hidden="true" style={{ fontSize: '14px' }}>🔒</span>
            Sign Out
          </button>
        )}
        <button
          id="dark-mode-toggle"
          className="dark-mode-toggle"
          onClick={onToggleDark}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={darkMode}
        >
          {darkMode ? '☀️' : '🌙'} {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </header>
  )
}
