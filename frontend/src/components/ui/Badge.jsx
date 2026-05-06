import { TAG_STYLES } from '@/utils/constants'

export default function Badge({ label }) {
  const s = TAG_STYLES[label] || { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.text,
      fontSize: 11, fontWeight: 700,
      padding: '3px 9px', borderRadius: 100,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {label}
    </span>
  )
}