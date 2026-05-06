import { useState } from 'react'
import Topbar        from '@/components/layout/Topbar'
import ContactList   from '@/components/contacts/ContactList'
import ContactDetail from '@/components/contacts/ContactDetail'
import ContactForm   from '@/components/contacts/ContactForm'
import useContactStore from '@/store/contactStore'

export default function App() {
  const { selectedContact, setSelected } = useContactStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editing,  setEditing]  = useState(null)

  const openAdd  = ()        => { setEditing(null);    setFormOpen(true) }
  const openEdit = (contact) => { setEditing(contact); setFormOpen(true) }
  const closeForm = ()       => { setFormOpen(false);  setEditing(null)  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>
      <Topbar onAdd={openAdd} />

      <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', flex:1, overflow:'hidden' }}>
        <ContactList selectedId={selectedContact?.id} onSelect={setSelected} />

        <main style={{ padding:'30px 36px', overflowY:'auto', background:'var(--bg)' }}>
          <ContactDetail
            contact={selectedContact}
            onEdit={openEdit}
            onDelete={() => setSelected(null)}
          />
        </main>
      </div>

      <ContactForm isOpen={formOpen} onClose={closeForm} editingContact={editing} />
    </div>
  )
}