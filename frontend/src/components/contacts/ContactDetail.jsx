import { useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { useDeleteContact } from '@/hooks/useContacts'
import { fullName, getAvatarColor } from '@/utils/formatters'

function InfoRow({ svg, label, value, href }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        background: '#F7F9FD',
        border: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'var(--accent-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {svg}
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 10.5,
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </p>
        {href ? (
          <a href={href} style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600 }}>
            {value}
          </a>
        ) : (
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'var(--text-primary)',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ContactDetail({ contact, onEdit, onDelete }) {
  const [visible, setVisible] = useState(false)
  const deleteMutation = useDeleteContact()

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 40)
    return () => clearTimeout(t)
  }, [contact?.id])

  if (!contact) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState
          title="No contact selected"
          subtitle="Pick someone from the list to view their details"
        />
      </div>
    )
  }

  const color = getAvatarColor(contact)
  const name = fullName(contact)

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return
    await deleteMutation.mutateAsync(contact.id)
    onDelete()
  }

  return (
    <div
      style={{
        maxWidth: 560,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(14px)',
        transition: 'opacity 0.28s var(--ease), transform 0.28s var(--ease)',
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${color}14 0%, ${color}05 100%)`,
          border: `1px solid ${color}28`,
          borderRadius: 'var(--radius-xl)',
          padding: '24px 24px 22px',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 18,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0, flex: 1 }}>
            <Avatar contact={contact} size={68} />
            <div style={{ minWidth: 0 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {name}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(contact)}
              icon={
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              }
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isLoading}
              icon={
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
              }
            >
              {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <InfoRow
          label="First Name"
          value={contact.firstName || '-'}
          svg={
            <>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </>
          }
        />

        <InfoRow
          label="Last Name"
          value={contact.lastName || '-'}
          svg={
            <>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </>
          }
        />

        {contact.email && (
          <InfoRow
            label="Email"
            value={contact.email}
            href={`mailto:${contact.email}`}
            svg={
              <>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </>
            }
          />
        )}

        <InfoRow
          label="Phone Number"
          value={contact.phoneNumber || '-'}
          href={contact.phoneNumber ? `tel:${contact.phoneNumber}` : undefined}
          svg={
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.85 11 19.79 19.79 0 0 1 1.77 2.38a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 6.91a16 16 0 0 0 6 6l1-1a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          }
        />
      </div>
    </div>
  )
}
