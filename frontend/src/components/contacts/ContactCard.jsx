import { useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import { fullName } from '@/utils/formatters'
import { getAvatarColor } from '@/utils/formatters'

export default function ContactCard({ contact, onClick, selected, delay = 0 }) {
  const [mounted, setMounted] = useState(false)
  const [hov, setHov]         = useState(false)
  const color = getAvatarColor(contact)
  const name  = fullName(contact)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      onClick={() => onClick(contact)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 13,
        padding: '13px 14px', borderRadius: 'var(--radius-lg)',
        border: `${selected ? 2 : 1}px solid ${selected ? 'var(--accent)' : hov ? 'var(--border-focus)' : 'var(--border)'}`,
        background: selected ? 'var(--accent-light)' : hov ? '#F8FAFF' : 'var(--surface)',
        cursor: 'pointer',
        boxShadow: selected ? 'var(--shadow-accent)' : hov ? 'var(--shadow-sm)' : 'none',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.25s var(--ease), transform 0.25s var(--ease),
                     border var(--t) var(--ease), background var(--t) var(--ease),
                     box-shadow var(--t) var(--ease)`,
      }}
    >
      <Avatar contact={contact} size={44} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Full name */}
        <p style={{
          margin: 0, fontWeight: 700, fontSize: 14.5,
          color: selected ? 'var(--accent)' : 'var(--text-primary)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          transition: 'color var(--t) var(--ease)',
        }}>
          {name}
        </p>
        {/* Phone */}
        <p style={{ margin: '2px 0 0', fontSize: 12.5, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {contact.phoneNumber || '—'}
        </p>
      </div>

      {/* Chevron */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={selected ? 'var(--accent)' : '#C8D2E8'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink:0, transform: hov ? 'translateX(2px)' : 'none', transition:`all var(--t) var(--ease)` }}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  )
}