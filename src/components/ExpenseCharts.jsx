import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
  Title as ChartTitle,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
  ChartTitle,
)

const CAT_COLORS = {
  Food:      '#F97316',
  Travel:    '#3B82F6',
  Marketing: '#8B5CF6',
  Utilities: '#F59E0B',
  Other:     '#6B7280',
}

const CAT_BG = {
  Food:      'rgba(249,115,22,0.15)',
  Travel:    'rgba(59,130,246,0.15)',
  Marketing: 'rgba(139,92,246,0.15)',
  Utilities: 'rgba(245,158,11,0.15)',
  Other:     'rgba(107,114,128,0.15)',
}

export default function ExpenseCharts({ expenses }) {
  if (expenses.length === 0) return null

  // ── Doughnut: category totals ──────────────────────────────────
  const catTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const catLabels  = Object.keys(catTotals)
  const catValues  = catLabels.map(k => catTotals[k])
  const catColors  = catLabels.map(k => CAT_COLORS[k] || '#6B7280')

  const doughnutData = {
    labels: catLabels,
    datasets: [{
      data: catValues,
      backgroundColor: catColors,
      borderColor: catColors,
      borderWidth: 2,
      hoverOffset: 8,
    }],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { family: 'Inter', size: 12, weight: '600' },
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-primary').trim() || '#111827',
        },
      },
      tooltip: {
        callbacks: {
          label: ctx => ` $${ctx.parsed.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        },
        bodyFont: { family: 'Inter', size: 13 },
        titleFont: { family: 'Inter', size: 13, weight: '700' },
      },
    },
  }

  // ── Bar: top 8 individual expenses ────────────────────────────
  const sorted  = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 8)
  const barLabels = sorted.map(e => e.name.length > 14 ? e.name.slice(0, 13) + '…' : e.name)
  const barColors = sorted.map(e => CAT_COLORS[e.category] || '#6B7280')
  const barBgColors = sorted.map(e => CAT_BG[e.category] || 'rgba(107,114,128,0.15)')

  const barData = {
    labels: barLabels,
    datasets: [{
      label: 'Amount (USD)',
      data: sorted.map(e => e.amount),
      backgroundColor: barBgColors,
      borderColor: barColors,
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` $${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          title: ctx => sorted[ctx[0].dataIndex]?.name || ctx[0].label,
        },
        bodyFont: { family: 'Inter', size: 13 },
        titleFont: { family: 'Inter', size: 13, weight: '700' },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Inter', size: 11, weight: '600' },
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-secondary').trim() || '#6B7280',
        },
        border: { display: false },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-secondary').trim() || '#6B7280',
          callback: v => `$${v}`,
        },
        border: { display: false },
      },
    },
  }

  return (
    <section className="charts-section" aria-label="Expense charts">
      <div className="charts-header">
        <h2 className="expense-list-title">Spending Analytics</h2>
        <span className="expense-count-badge">Chart.js</span>
      </div>

      <div className="charts-grid">
        {/* Doughnut */}
        <div className="card chart-card">
          <div className="card-inner">
            <p className="chart-card-title">
              <span className="card-title-chip">🥧</span>
              Category Breakdown
            </p>
            <div className="chart-canvas-wrap" style={{ height: 240 }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Bar */}
        <div className="card chart-card">
          <div className="card-inner">
            <p className="chart-card-title">
              <span className="card-title-chip">📊</span>
              Top Expenses
            </p>
            <div className="chart-canvas-wrap" style={{ height: 240 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
