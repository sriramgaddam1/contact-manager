import { useEffect, useState } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) setTimeout(() => setShow(true), 10)
    else setShow(false)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(12,18,37,0.55)',
        backdropFilter: show ? 'blur(5px)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        opacity: show ? 1 : 0, transition: `opacity 0.22s var(--ease), backdrop-filter 0.22s var(--ease)`,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
          padding: '30px', width: '100%', maxWidth: 460,
          boxShadow: 'var(--shadow-lg)',
          animation: show ? 'popIn 0.3s var(--spring) forwards' : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
          <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{title}</h3>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 9, border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--text-muted)', fontSize: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}