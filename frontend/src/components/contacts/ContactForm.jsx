import { useState, useEffect } from 'react'
import Modal  from '@/components/ui/Modal'
import Input  from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useCreateContact, useUpdateContact } from '@/hooks/useContacts'

// Exactly mirrors your Spring Boot Contact model
const EMPTY = { firstName: '', lastName: '', email: '', phoneNumber: '' }

export default function ContactForm({ isOpen, onClose, editingContact }) {
  const [form,   setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const createMutation = useCreateContact()
  const updateMutation = useUpdateContact()
  const busy = createMutation.isLoading || updateMutation.isLoading

  useEffect(() => {
    setForm(editingContact ? {
      firstName:   editingContact.firstName   || '',
      lastName:    editingContact.lastName    || '',
      email:       editingContact.email       || '',
      phoneNumber: editingContact.phoneNumber || '',
    } : EMPTY)
    setErrors({})
  }, [editingContact, isOpen])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim())                               e.firstName   = 'First name is required'
    if (!form.phoneNumber.trim())                             e.phoneNumber = 'Phone number is required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))      e.email       = 'Enter a valid email'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async () => {
    if (!validate() || busy) return
    try {
      if (editingContact) await updateMutation.mutateAsync({ id: editingContact.id, data: form })
      else                await createMutation.mutateAsync(form)
      onClose()
    } catch (_) {}
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingContact ? 'Edit Contact' : 'New Contact'}>
      <div style={{ display:'flex', flexDirection:'column', gap:15 }}>

        {/* First name + Last name side by side */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Input
            label="First Name" required
            value={form.firstName} onChange={set('firstName')}
            placeholder="Jane" error={errors.firstName}
          />
          <Input
            label="Last Name"
            value={form.lastName} onChange={set('lastName')}
            placeholder="Smith"
          />
        </div>

        {/* Email */}
        <Input
          label="Email"  type="email"
          value={form.email} onChange={set('email')}
          placeholder="jane@example.com" error={errors.email}
        />

        {/* Phone number — nullable=false in your model */}
        <Input
          label="Phone Number" required  type="tel"
          value={form.phoneNumber} onChange={set('phoneNumber')}
          placeholder="+91 98765 43210" error={errors.phoneNumber}
        />

        {/* Submit */}
        <Button
          onClick={handleSubmit} disabled={busy}
          style={{ marginTop:6, width:'100%', justifyContent:'center', padding:'13px 0', fontSize:14.5, borderRadius:'var(--radius-md)' }}
        >
          {busy ? 'Saving…' : editingContact ? 'Save Changes' : 'Add Contact'}
        </Button>
      </div>
    </Modal>
  )
}