import { AVATAR_COLORS } from './constants'

// Combine firstName + lastName safely
export const fullName = (contact) =>
  [contact?.firstName, contact?.lastName].filter(Boolean).join(' ') || '-'

export const contactSortValue = (contact) =>
  fullName(contact).trim().toLocaleLowerCase()

export const getContactAlphaKey = (contact) => {
  const firstCharacter = fullName(contact).trim().charAt(0).toUpperCase()
  return /^[A-Z]$/.test(firstCharacter) ? firstCharacter : '#'
}

export const sortContactsAlphabetically = (contacts = []) =>
  [...contacts].sort((a, b) => {
    const byName = contactSortValue(a).localeCompare(contactSortValue(b), undefined, {
      sensitivity: 'base',
      numeric: true,
    })

    return byName || String(a.id ?? '').localeCompare(String(b.id ?? ''))
  })

// Two-letter initials from firstName + lastName
export const getInitials = (contact) => {
  const f = contact?.firstName?.[0] ?? ''
  const l = contact?.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || '?'
}

// Deterministic color from first name
export const getAvatarColor = (contact) => {
  const code = (contact?.firstName ?? '').charCodeAt(0) || 65
  return AVATAR_COLORS[code % AVATAR_COLORS.length]
}
