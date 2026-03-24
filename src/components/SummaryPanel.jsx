const CAT_COLORS = {
  Food:       '#F97316',
  Travel:     '#3B82F6',
  Marketing:  '#8B5CF6',
  Utilities:  '#F59E0B',
  Other:      '#6B7280',
}

const CAT_EMOJIS = {
  Food: '🍕',
  Travel: '✈️',
  Marketing: '📊',
  Utilities: '⚡',
  Other: '📦',
}

export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  // Build category totals
  const catTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const categories = Object.entries(catTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => ({
      name,
      amount,
      pct: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: CAT_COLORS[name] || '#6B7280',
      emoji: CAT_EMOJIS[name] || '📦',
    }))

  return (
    <div className="card">
      <div className="card-inner">
        <p className="summary-label">Total Spent This Month</p>
        <p className="summary-total" id="total-amount">
          ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        {expenses.length > 0 && (
          <span className="summary-badge">
            📈 {expenses.length} expense{expenses.length !== 1 ? 's' : ''} tracked
          </span>
        )}

        {categories.length > 0 && (
          <>
            <div className="summary-divider" />
            <div className="category-breakdown">
              {categories.map(cat => (
                <div key={cat.name} className="category-row">
                  <div className="category-label-group">
                    <span className="pill-emoji" style={{ fontSize: '13px' }}>{cat.emoji}</span>
                    <span className="category-name">{cat.name}</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-bar"
                      style={{ width: `${cat.pct}%`, background: cat.color }}
                      role="progressbar"
                      aria-valuenow={cat.pct}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                  <div className="category-amount-group">
                    <div className="category-amount">
                      ${cat.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="category-pct">{cat.pct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {expenses.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '12px' }}>
            No expenses yet — add one to see your breakdown.
          </p>
        )}
      </div>
    </div>
  )
}
