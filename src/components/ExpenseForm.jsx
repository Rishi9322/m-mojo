import { useState } from 'react'

const CATEGORIES = [
  { label: 'Food',       emoji: '🍕', color: '#F97316' },
  { label: 'Travel',     emoji: '✈️', color: '#3B82F6' },
  { label: 'Marketing',  emoji: '📊', color: '#8B5CF6' },
  { label: 'Utilities',  emoji: '⚡', color: '#F59E0B' },
  { label: 'Other',      emoji: '📦', color: '#6B7280' },
  { label: 'Custom',     emoji: '➕', color: '#9CA3AF' },
];

export default function ExpenseForm({ onAdd }) {
  const [name, setName]         = useState('')
  const [amount, setAmount]     = useState('')
  const [category, setCategory] = useState('Food')
  const [customCategory, setCustomCategory] = useState('')
  const [date, setDate]         = useState(() => new Date().toISOString().split('T')[0])
  const [errors, setErrors]     = useState({})
  const [success, setSuccess]   = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Expense name cannot be empty'
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      e.amount = 'Enter a valid positive amount'
    if (category === 'Custom' && !customCategory.trim())
      e.category = 'Custom category cannot be empty'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    onAdd({
      id:       crypto.randomUUID(),
      name:     name.trim(),
      amount:   parseFloat(parseFloat(amount).toFixed(2)),
      category: category === 'Custom' ? customCategory.trim() : category,
      date,
    })

    setErrors({})
    setSuccess(true)
    setTimeout(() => {
      setName('')
      setAmount('')
      setCategory('Food')
      setCustomCategory('')
      setDate(new Date().toISOString().split('T')[0])
      setSuccess(false)
    }, 1500)
  }

  return (
    <div className="card expense-form-card">
      <div className="card-inner">
        <h2 className="card-title">
          <span className="card-title-chip">+</span>
          New Expense
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Date */}
          <div className="form-group">
            <label className="form-label" htmlFor="expense-date">Date</label>
            <input
              id="expense-date"
              type="date"
              className="form-input"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="expense-name">Expense Name</label>
            <input
              id="expense-name"
              type="text"
              className="form-input"
              placeholder="e.g. Team lunch, Flights…"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
              autoComplete="off"
            />
            {errors.name && <p className="form-error">⚠ {errors.name}</p>}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="expense-amount">Amount (USD)</label>
            <div className="amount-wrapper">
              <span className="amount-prefix">$</span>
              <input
                id="expense-amount"
                type="number"
                min="0.01"
                step="0.01"
                className="form-input amount-input"
                placeholder="0.00"
                value={amount}
                onChange={e => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: '' })) }}
              />
            </div>
            {errors.amount && <p className="form-error">⚠ {errors.amount}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <div className="category-pills" role="group" aria-label="Select category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  type="button"
                  data-cat={cat.label}
                  className={`category-pill${category === cat.label ? ' active' : ''}`}
                  onClick={() => setCategory(cat.label)}
                  aria-pressed={category === cat.label}
                >
                  <span className="pill-emoji">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
            {category === 'Custom' && (
              <div className="custom-category" style={{ marginTop: '12px' }}>
                <input
                  type="text"
                  placeholder="Enter custom category"
                  className="form-input"
                  value={customCategory}
                  onChange={e => { setCustomCategory(e.target.value); setErrors(p => ({ ...p, category: '' })) }}
                />
                {errors.category && <p className="form-error">⚠ {errors.category}</p>}
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" id="add-expense-btn">
            {success ? '✓ Added!' : 'Add to Tracker →'}
          </button>
        </form>
      </div>
    </div>
  )
}
