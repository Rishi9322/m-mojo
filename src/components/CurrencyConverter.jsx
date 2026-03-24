import { useState, useEffect, useRef } from 'react'

const CURRENCIES = [
  { code: 'USD', label: '🇺🇸 USD — US Dollar' },
  { code: 'EUR', label: '🇪🇺 EUR — Euro' },
  { code: 'GBP', label: '🇬🇧 GBP — Pound Sterling' },
  { code: 'INR', label: '🇮🇳 INR — Indian Rupee' },
  { code: 'CAD', label: '🇨🇦 CAD — Canadian Dollar' },
  { code: 'AUD', label: '🇦🇺 AUD — Australian Dollar' },
  { code: 'JPY', label: '🇯🇵 JPY — Japanese Yen' },
  { code: 'CHF', label: '🇨🇭 CHF — Swiss Franc' },
  { code: 'CNY', label: '🇨🇳 CNY — Chinese Yuan' },
  { code: 'SGD', label: '🇸🇬 SGD — Singapore Dollar' },
  { code: 'HKD', label: '🇭🇰 HKD — Hong Kong Dollar' },
  { code: 'MXN', label: '🇲🇽 MXN — Mexican Peso' },
  { code: 'BRL', label: '🇧🇷 BRL — Brazilian Real' },
  { code: 'AED', label: '🇦🇪 AED — UAE Dirham' },
  { code: 'SEK', label: '🇸🇪 SEK — Swedish Krona' },
  { code: 'NOK', label: '🇳🇴 NOK — Norwegian Krone' },
  { code: 'DKK', label: '🇩🇰 DKK — Danish Krone' },
  { code: 'KRW', label: '🇰🇷 KRW — South Korean Won' },
  { code: 'ZAR', label: '🇿🇦 ZAR — South African Rand' },
  { code: 'NZD', label: '🇳🇿 NZD — New Zealand Dollar' },
  { code: 'THB', label: '🇹🇭 THB — Thai Baht' },
  { code: 'TRY', label: '🇹🇷 TRY — Turkish Lira' },
  { code: 'SAR', label: '🇸🇦 SAR — Saudi Riyal' },
]

const SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹',
  CAD: 'CA$', AUD: 'A$', JPY: '¥', CHF: 'Fr',
  CNY: '¥', SGD: 'S$', HKD: 'HK$', MXN: 'MX$',
  BRL: 'R$', AED: 'د.إ', SEK: 'kr', NOK: 'kr',
  DKK: 'kr', KRW: '₩', ZAR: 'R', NZD: 'NZ$',
  THB: '฿', TRY: '₺', SAR: '﷼',
}

export default function CurrencyConverter({ totalUSD }) {
  const [currency, setCurrency] = useState('EUR')
  const [rate, setRate]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const abortRef                = useRef(null)

  useEffect(() => {
    if (currency === 'USD') {
      return
    }

    // Abort previous request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const url = `https://api.frankfurter.app/latest?from=USD&to=${currency}`

    const timer = setTimeout(() => controller.abort(), 8000)

    fetch(url, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`) ; return r.json() })
      .then(data => {
        setRate(data.rates[currency])
        setError(null)
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.')
        } else {
          setError('Could not fetch exchange rates. Check your connection.')
        }
        setRate(null)
      })
      .finally(() => {
        setLoading(false)
        clearTimeout(timer)
      })

    return () => { controller.abort(); clearTimeout(timer) }
  }, [currency])

  const effectiveRate = currency === 'USD' ? 1 : rate
  const converted = effectiveRate !== null ? totalUSD * effectiveRate : null
  const sym = SYMBOLS[currency] || currency

  return (
    <div className="converter-card" id="currency-converter">
      <p className="converter-title">🔄 Convert Total</p>
      <p className="converter-usd">
        ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>

      <div className="converter-row">
        <span className="converter-label">To</span>
        <select
          id="currency-select"
          className="converter-select"
          value={currency}
          onChange={e => {
            const nextCurrency = e.target.value
            setCurrency(nextCurrency)
            if (nextCurrency === 'USD') {
              setLoading(false)
              setError(null)
              return
            }
            setLoading(true)
            setError(null)
          }}
          aria-label="Select target currency"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="converter-status">
          <div className="spinner" role="status" aria-label="Loading exchange rates" />
          Fetching live rates…
        </div>
      )}

      {!loading && error && (
        <div className="converter-error" role="alert">
          ⚠ {error}
        </div>
      )}

      {!loading && !error && converted !== null && (
        <p className="converter-result" id="converted-amount">
          {sym}{converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      )}

      {!loading && !error && rate !== null && currency !== 'USD' && (
        <div className="converter-status" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
          1 USD = {rate} {currency} · Live rate
        </div>
      )}
    </div>
  )
}
