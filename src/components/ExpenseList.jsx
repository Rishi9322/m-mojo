import ExpenseItem from './ExpenseItem'

export default function ExpenseList({ expenses, onDelete }) {
  return (
    <section className="expense-list-section" aria-label="Expense list">
      <div className="expense-list-header">
        <h2 className="expense-list-title">Recent Expenses</h2>
        <span className="expense-count-badge">
          {expenses.length} item{expenses.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="expense-grid">
        {expenses.length === 0 ? (
          <div className="empty-state" id="empty-state">
            <div className="empty-icon">🧾</div>
            <p className="empty-title">Your expense canvas is empty</p>
            <p className="empty-subtitle">Add your first expense above to start tracking your spending.</p>
          </div>
        ) : (
          expenses
            .slice()
            .reverse()
            .map(expense => (
              <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
            ))
        )}
      </div>
    </section>
  )
}
