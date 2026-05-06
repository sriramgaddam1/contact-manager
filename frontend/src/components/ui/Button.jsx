import { useState } from 'react'

const VARIANTS = {
  primary:   (h) => ({ background: h ? 'var(--accent-hover)' : 'var(--accent)', color: '#fff', border: 'none', boxShadow: h ? 'var(--shadow-accent)' : '0 2px 8px var(--accent-glow)' }),
  secondary: (h) => ({ background: h ? '#F0F3FA' : 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }),
  danger:    (h) => ({ background: h ? '#C53030' : 'var(--danger)', color: '#fff', border: 'none' }),
  ghost:     (h) => ({ background: h ? '#F4F6FB' : 'transparent', color: 'var(--text-secondary)', border: 'none' }),
}

const SIZES = {
  sm: { fontSize: 12.5, padding: '6px 14px', borderRadius: 'var(--radius-sm)' },
  md: { fontSize: 13.5, padding: '10px 20px', borderRadius: 'var(--radius-md)' },
  lg: { fontSize: 15,   padding: '13px 28px', borderRadius: 'var(--radius-md)' },
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, style: ex = {}, icon }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600,
        letterSpacing: '0.01em', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transform: hov && !disabled ? 'translateY(-1px)' : 'translateY(0)',
        transition: `all var(--t) var(--ease)`,
        ...SIZES[size], ...VARIANTS[variant](hov && !disabled), ...ex,
      }}
    >
      {icon}{children}
    </button>
  )
}