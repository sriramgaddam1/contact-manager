import { useQuery, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { contactApi } from '@/api/contactApi'
import useContactStore from '@/store/contactStore'

export function useContacts() {
  const { setContacts } = useContactStore()
  return useQuery('contacts', async () => {
    const res = await contactApi.getAllContacts()
    setContacts(res.data)
    return res.data
  })
}

export function useContact(id, enabled = true) {
  return useQuery(
    ['contact', id],
    async () => contactApi.getContactById(id).then((res) => res.data),
    { enabled: enabled && Boolean(id) }
  )
}

export function useSearchContactsByFirstName(firstName, enabled = true) {
  return useQuery(
    ['contacts', 'search', 'firstName', firstName],
    async () => contactApi.getContactsByFirstName(firstName).then((res) => res.data),
    { enabled: enabled && Boolean(firstName) }
  )
}

export function useSearchContactsByLastName(lastName, enabled = true) {
  return useQuery(
    ['contacts', 'search', 'lastName', lastName],
    async () => contactApi.getContactsByLastName(lastName).then((res) => res.data),
    { enabled: enabled && Boolean(lastName) }
  )
}

export function useSearchContactsByEmail(email, enabled = true) {
  return useQuery(
    ['contacts', 'search', 'email', email],
    async () => contactApi.getContactsByEmail(email).then((res) => res.data),
    { enabled: enabled && Boolean(email) }
  )
}

export function useCreateContact() {
  const qc = useQueryClient()
  const { addContact } = useContactStore()
  return useMutation(
    (data) => contactApi.createContact(data).then((r) => r.data),
    {
      onSuccess: (c) => { addContact(c); qc.invalidateQueries('contacts'); toast.success('Contact added!') },
      onError:   ()  => toast.error('Failed to add contact'),
    }
  )
}

export function useUpdateContact() {
  const qc = useQueryClient()
  const { updateContact } = useContactStore()
  return useMutation(
    ({ id, data }) => contactApi.updateContact(id, data).then((r) => r.data),
    {
      onSuccess: (c) => { updateContact(c); qc.invalidateQueries('contacts'); toast.success('Contact updated!') },
      onError:   ()  => toast.error('Failed to update contact'),
    }
  )
}

export function useDeleteContact() {
  const qc = useQueryClient()
  const { removeContact } = useContactStore()
  return useMutation(
    (id) => contactApi.deleteContact(id).then(() => id),
    {
      onSuccess: (id) => { removeContact(id); qc.invalidateQueries('contacts'); toast.success('Contact deleted') },
      onError:   ()   => toast.error('Failed to delete contact'),
    }
  )
}

export function useDeleteAllContacts() {
  const qc = useQueryClient()
  const { setContacts, setSelected } = useContactStore()
  return useMutation(
    () => contactApi.deleteAllContacts().then((r) => r.data),
    {
      onSuccess: () => {
        setContacts([])
        setSelected(null)
        qc.invalidateQueries('contacts')
        toast.success('All contacts deleted')
      },
      onError: () => toast.error('Failed to delete contacts'),
    }
  )
}
