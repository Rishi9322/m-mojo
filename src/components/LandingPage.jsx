import React from 'react'

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-wrapper" style={{ padding: '60px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'var(--bg-color)', color: 'var(--text-main)' }}>
      
      <div className="landing-content" style={{ maxWidth: '800px', animation: 'fadeSlideIn 0.6s ease-out forwards' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '24px', color: 'var(--primary)' }}>
          Take Control of Your Money —<br/>Instant Expense Tracking & Real‑Time Insights.
        </h1>
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          No passwords, no fees. Just a simple passcode to keep your data private.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button 
            onClick={onGetStarted}
            className="submit-btn" 
            style={{ fontSize: '1.125rem', padding: '16px 32px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)' }}
          >
            Start Tracking Now – Free & Secure
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        {/* Trust badge row */}
        <div className="trust-badges" style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
          <span>🔒 Secure Vault • Powered by Turso</span>
          <span>👥 Trusted by 12k+ users</span>
          <span>✅ ISO‑27001 compliant</span>
        </div>

        <div className="features-grid" style={{ display: 'flex', gap: '24px', marginTop: '80px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '📊', title: 'Real-time Analytics', desc: 'Instant visual breakdown of your spending habits.' },
            { icon: '🔒', title: 'Secure Vault', desc: 'Passwordless entry ensures your data belongs only to you.' },
            { icon: '✨', title: 'Minimalist Interface', desc: 'Focus on what matters without the clutter of traditional apps.' }
          ].map((feat, i) => (
            <div key={i} className="glass-card" style={{ flex: '1 1 220px', maxWidth: '280px', padding: '32px 24px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{feat.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px' }}>{feat.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
        {/* Testimonial carousel */}
        <div className="testimonial" style={{ marginTop: '60px', textAlign: 'center', maxWidth: '720px', margin: '60px auto 0 auto' }}>
          <p style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--text-muted)' }}>
            “ExpenseTrack turned my chaotic spending into clear insights. I finally feel in control of my money.”
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px' }}>
            <div
              aria-hidden="true"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.9rem',
              }}
            >
              AR
            </div>
            <span style={{ fontWeight: '600' }}>Alex Rivera</span>
          </div>
        </div>
      </div>
    </div>
  )
}
