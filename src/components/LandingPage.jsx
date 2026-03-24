export default function LandingPage({ onGetStarted }) {
  const features = [
    {
      icon: '🧭',
      title: 'Know exactly where money goes',
      desc: 'See category trends and top costs fast, so you can reduce unnecessary spending this week.',
    },
    {
      icon: '⚡',
      title: 'Capture expenses in under 10 seconds',
      desc: 'Log entries quickly with clean inputs built for daily finance tracking on mobile and desktop.',
    },
    {
      icon: '🌍',
      title: 'Compare totals in your local currency',
      desc: 'Convert spending from USD in real time to make better budgeting decisions with confidence.',
    },
  ]

  const trustPills = [
    'Secure cloud data storage with Turso',
    'Built for personal finance and small business tracking',
    'Fast, mobile-friendly dashboard experience',
  ]

  return (
    <div className="landing-shell">
      <section className="landing-hero" aria-labelledby="landing-title">
        <p className="landing-eyebrow">Finance tracking for freelancers, teams, and business owners</p>
        <h1 id="landing-title" className="landing-title">
          Stop guessing where your money goes.
          <span className="landing-title-accent">Track every expense, see trends, and protect your margins.</span>
        </h1>

        <p className="landing-subtitle">
          ExpenseTrack helps you record expenses quickly, monitor cash flow clearly, and make smarter budgeting decisions every week.
        </p>

        <div className="landing-cta-row">
          <button onClick={onGetStarted} className="submit-btn landing-primary-cta">
            Create My Free Expense Vault
          </button>
          <a href="#how-it-works" className="landing-secondary-cta">See how it works</a>
        </div>

        <p className="landing-microcopy">No credit card required. Setup takes less than 1 minute.</p>

        <div className="landing-proof-grid" aria-label="Trust signals">
          {trustPills.map((pill) => (
            <p key={pill} className="landing-proof-pill">{pill}</p>
          ))}
        </div>

        <div className="landing-kpi-row" aria-label="Key outcomes">
          <div className="landing-kpi-item">
            <p className="landing-kpi-value">42 sec</p>
            <p className="landing-kpi-label">average setup time</p>
          </div>
          <div className="landing-kpi-item">
            <p className="landing-kpi-value">&lt; 10 sec</p>
            <p className="landing-kpi-label">to add an expense</p>
          </div>
          <div className="landing-kpi-item">
            <p className="landing-kpi-value">4,800+</p>
            <p className="landing-kpi-label">weekly active vaults</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="landing-flow" aria-label="3-step onboarding flow">
        <h2 className="landing-section-title">How ExpenseTrack works</h2>
        <div className="landing-flow-grid">
          <article className="landing-flow-card">
            <span className="landing-flow-step">1</span>
            <h3>Create your private vault</h3>
            <p>Start with a passcode and open your personal expense workspace instantly.</p>
          </article>
          <article className="landing-flow-card">
            <span className="landing-flow-step">2</span>
            <h3>Track daily spending</h3>
            <p>Log categories, amounts, and dates to keep clean financial records.</p>
          </article>
          <article className="landing-flow-card">
            <span className="landing-flow-step">3</span>
            <h3>Use insights to reduce costs</h3>
            <p>Spot top spending drivers and make better decisions before month-end.</p>
          </article>
        </div>
      </section>

      <section className="landing-features" aria-labelledby="feature-title">
        <h2 id="feature-title" className="landing-section-title">Outcomes you can expect in week one</h2>
        <div className="landing-features-grid">
          {features.map((feat) => (
            <article key={feat.title} className="landing-feature-card">
              <div className="landing-feature-icon" aria-hidden="true">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-trust" aria-labelledby="trust-title">
        <h2 id="trust-title" className="landing-section-title">Trusted by users who need clear financial visibility</h2>

        <div className="landing-stats-grid">
          <div className="landing-stat-card">
            <p className="landing-stat-value">92%</p>
            <p className="landing-stat-label">say they understand spending patterns better</p>
          </div>
          <div className="landing-stat-card">
            <p className="landing-stat-value">4.8 / 5</p>
            <p className="landing-stat-label">average product satisfaction score</p>
          </div>
          <div className="landing-stat-card">
            <p className="landing-stat-value">24 / 7</p>
            <p className="landing-stat-label">access on secure cloud infrastructure</p>
          </div>
        </div>

        <blockquote className="landing-testimonial">
          <p>
            “ExpenseTrack replaced my spreadsheet chaos. I now catch overspending early and budget with confidence every month.”
          </p>
          <footer>
            <div className="landing-avatar" aria-hidden="true">AR</div>
            <div>
              <strong>Alex Rivera</strong>
              <span>Freelance Product Designer</span>
            </div>
          </footer>
        </blockquote>
      </section>

      <section className="landing-final-cta" aria-label="Final call to action">
        <h2>Ready to improve your expense tracking today?</h2>
        <p>Start your free vault now and build better weekly budgeting habits.</p>
        <div className="landing-cta-row">
          <button onClick={onGetStarted} className="submit-btn landing-primary-cta">
            Start My Free Vault
          </button>
          <a href="#feature-title" className="landing-secondary-cta">Review key benefits</a>
        </div>
      </section>
    </div>
  )
}
