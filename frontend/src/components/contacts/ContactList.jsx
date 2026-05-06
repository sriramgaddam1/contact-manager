import { useMemo, useRef } from 'react'
import ContactCard from './ContactCard'
import EmptyState from '@/components/ui/EmptyState'
import useContactStore from '@/store/contactStore'
import { useContacts } from '@/hooks/useContacts'
import {
  fullName,
  getContactAlphaKey,
  sortContactsAlphabetically,
} from '@/utils/formatters'

const ALPHABET_KEYS = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

function Skeleton() {
  return (
    <div
      style={{
        height: 72,
        borderRadius: 'var(--radius-lg)',
        background: '#EEF2FB',
        animation: 'shimmer 1.4s ease-in-out infinite',
      }}
    />
  )
}

export default function ContactList({ selectedId, onSelect }) {
  const { isLoading } = useContacts()
  const { contacts, searchQuery, setSearch } = useContactStore()
  const sectionRefs = useRef({})

  const filteredContacts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const matchingContacts = contacts.filter((contact) => {
      if (!normalizedQuery) return true

      return (
        fullName(contact).toLowerCase().includes(normalizedQuery) ||
        contact.email?.toLowerCase().includes(normalizedQuery) ||
        contact.phoneNumber?.toLowerCase().includes(normalizedQuery)
      )
    })

    return sortContactsAlphabetically(matchingContacts)
  }, [contacts, searchQuery])

  const groupedContacts = useMemo(() => {
    const groups = ALPHABET_KEYS.reduce((acc, key) => {
      acc[key] = []
      return acc
    }, {})

    filteredContacts.forEach((contact) => {
      groups[getContactAlphaKey(contact)].push(contact)
    })

    return groups
  }, [filteredContacts])

  const visibleKeys = ALPHABET_KEYS.filter((key) => groupedContacts[key]?.length)

  const scrollToSection = (key) => {
    sectionRefs.current[key]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <aside
      style={{
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid var(--border)' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 10,
          }}
        >
          All Contacts
        </p>

        <div style={{ position: 'relative' }}>
          <svg
            style={{
              position: 'absolute',
              left: 11,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 34px 9px 34px',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 13.5,
              outline: 'none',
              background: '#F5F7FC',
              color: 'var(--text-primary)',
              transition: `all var(--t) var(--ease)`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)'
              e.target.style.background = '#fff'
              e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)'
              e.target.style.background = '#F5F7FC'
              e.target.style.boxShadow = 'none'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: 17,
                cursor: 'pointer',
                lineHeight: 1,
              }}
              aria-label="Clear search"
            >
              x
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '10px 16px 6px' }}>
        <span style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 500 }}>
          {isLoading ? 'Loading...' : `${filteredContacts.length} contact${filteredContacts.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 30px' }}>
        <div
          style={{
            overflowY: 'auto',
            padding: '0 10px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
          ) : filteredContacts.length === 0 ? (
            <EmptyState title="No contacts found" subtitle="Try a different search term" />
          ) : (
            visibleKeys.map((key) => (
              <section
                key={key}
                ref={(node) => {
                  sectionRefs.current[key] = node
                }}
              >
                <div
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    padding: '4px 2px 8px',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 76%, rgba(255,255,255,0) 100%)',
                    color: 'var(--text-muted)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                  }}
                >
                  {key}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {groupedContacts[key].map((contact, index) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onClick={onSelect}
                      selected={selectedId === contact.id}
                      delay={index * 30}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        <div
          style={{
            borderLeft: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 2px 10px 0',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateRows: `repeat(${ALPHABET_KEYS.length}, minmax(0, 1fr))`,
              gap: 2,
              width: '100%',
            }}
          >
            {ALPHABET_KEYS.map((key) => {
              const disabled = !groupedContacts[key]?.length

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => !disabled && scrollToSection(key)}
                  disabled={disabled}
                  aria-label={`Jump to ${key}`}
                  style={{
                    minHeight: 16,
                    border: 'none',
                    background: 'transparent',
                    color: disabled ? '#CCD4E3' : '#0C2D6B',
                    fontSize: 10,
                    fontWeight: disabled ? 600 : 800,
                    borderRadius: 6,
                    transition: `all var(--t) var(--ease)`,
                  }}
                >
                  {key}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
