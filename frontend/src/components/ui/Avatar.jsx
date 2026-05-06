import { getInitials, getAvatarColor } from '@/utils/formatters'

export default function Avatar({ contact, size = 44 }) {
  const color = getAvatarColor(contact)
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${color}1A`,
      border: `2px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.33, color,
      flexShrink: 0, letterSpacing: '0.03em', userSelect: 'none',
    }}>
      {getInitials(contact)}
    </div>
  )
}