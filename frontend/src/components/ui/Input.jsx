import { useState } from 'react'

export default function Input({ label, value, onChange, placeholder, type = 'text', required, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {label}{required && <span style={{ color: 'var(--danger)', marginLeft: 3 }}>*</span>}
        </label>
      )}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          padding: '11px 14px', fontSize: 14, width: '100%', outline: 'none',
          background: focused ? '#fff' : '#F5F7FC',
          color: 'var(--text-primary)',
          border: `1.5px solid ${error ? 'var(--danger)' : focused ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focused ? '0 0 0 3px var(--accent-glow)' : 'none',
          transition: `all var(--t) var(--ease)`,
        }}
      />
      {error && <span style={{ fontSize: 11.5, color: 'var(--danger)', fontWeight: 500 }}>{error}</span>}
    </div>
  )
}