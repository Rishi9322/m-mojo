import { useState } from 'react'

const CAT_EMOJIS = {
  Food: '🍕', Travel: '✈️', Marketing: '📊', Utilities: '⚡', Other: '📦',
}

export default function ExpenseItem({ expense, onDelete }) {
  const [removing, setRemoving] = useState(false)

  const handleDelete = () => {
    setRemoving(true)
    setTimeout(() => onDelete(expense.id), 200)
  }

  return (
    <div
      className={`expense-item${removing ? ' removing' : ''}`}
      data-cat={expense.category}
      id={`expense-${expense.id}`}
    >
      <div className="expense-item-top">
        <p className="expense-name">{expense.name}</p>
        <button
          className="delete-btn"
          onClick={handleDelete}
          aria-label={`Delete expense: ${expense.name}`}
          title="Delete"
        >
          ×
        </button>
      </div>

        <div className="expense-item-bottom">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="category-badge" data-cat={expense.category}>
              {CAT_EMOJIS[expense.category] || '🏷️'} {expense.category}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <span className="expense-amount">${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
    </div>
  )
}
