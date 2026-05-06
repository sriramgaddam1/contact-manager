import Button from '@/components/ui/Button'
import useContactStore from '@/store/contactStore'

export default function Topbar({ onAdd }) {
  const { contacts } = useContactStore()

  return (
    <header style={{
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      padding: '0 28px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Logo + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(108,99,255,0.4)',
        }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Contacts
            </span>
            <span style={{ background:'var(--accent-light)', color:'var(--accent)', fontSize:11, fontWeight:700, padding:'2px 9px', borderRadius:100 }}>
              {contacts.length}
            </span>
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 1 }}>Manage your people</p>
        </div>
      </div>

      {/* Add button */}
      <Button onClick={onAdd} icon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      }>
        Add Contact
      </Button>
    </header>
  )
}