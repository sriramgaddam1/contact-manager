import { create } from 'zustand'
import { sortContactsAlphabetically } from '@/utils/formatters'

const useContactStore = create((set) => ({
  contacts:        [],
  selectedContact: null,
  searchQuery:     '',

  setContacts:  (contacts) => set({ contacts: sortContactsAlphabetically(contacts) }),
  setSelected:  (c)        => set({ selectedContact: c }),
  setSearch:    (q)        => set({ searchQuery: q }),

  addContact: (contact) =>
    set((s) => ({ contacts: sortContactsAlphabetically([...s.contacts, contact]) })),

  updateContact: (updated) =>
    set((s) => ({
      contacts: sortContactsAlphabetically(
        s.contacts.map((c) => (c.id === updated.id ? updated : c))
      ),
      selectedContact:
        s.selectedContact?.id === updated.id ? updated : s.selectedContact,
    })),

  removeContact: (id) =>
    set((s) => ({
      contacts:        s.contacts.filter((c) => c.id !== id),
      selectedContact: s.selectedContact?.id === id ? null : s.selectedContact,
    })),
}))

export default useContactStore
