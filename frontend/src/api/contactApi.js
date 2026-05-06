import axios from 'axios'

//in env file
const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
const baseURL = configuredBaseUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
const CONTACTS_PATH = '/api/contacts'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API]', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

// Payload shape matches your Spring Boot Contact model exactly
// { firstName, lastName, email, phoneNumber }
export const contactApi = {
  getAllContacts:        () => api.get(CONTACTS_PATH),
  getContactById:        (id) => api.get(`${CONTACTS_PATH}/${id}`),
  getContactsByFirstName: (firstName) =>
    api.get(`${CONTACTS_PATH}/search/firstName`, { params: { firstName } }),
  getContactsByLastName: (lastName) =>
    api.get(`${CONTACTS_PATH}/search/lastName`, { params: { lastName } }),
  getContactsByEmail: (email) =>
    api.get(`${CONTACTS_PATH}/search/email`, { params: { email } }),
  createContact:        (data) => api.post(CONTACTS_PATH, data),
  updateContact:        (id, data) => api.put(`${CONTACTS_PATH}/${id}`, data),
  deleteContact:        (id) => api.delete(`${CONTACTS_PATH}/${id}`),
  deleteAllContacts:    () => api.delete(CONTACTS_PATH),

  // Backward-compatible aliases for existing callers.
  getAll:              () => api.get(CONTACTS_PATH),
  getById:             (id) => api.get(`${CONTACTS_PATH}/${id}`),
  searchByFirstName:   (firstName) => api.get(`${CONTACTS_PATH}/search/firstName`, { params: { firstName } }),
  searchByLastName:    (lastName) => api.get(`${CONTACTS_PATH}/search/lastName`, { params: { lastName } }),
  searchByEmail:       (email) => api.get(`${CONTACTS_PATH}/search/email`, { params: { email } }),
  create:              (data) => api.post(CONTACTS_PATH, data),
  update:              (id, data) => api.put(`${CONTACTS_PATH}/${id}`, data),
  delete:              (id) => api.delete(`${CONTACTS_PATH}/${id}`),
  deleteAll:           () => api.delete(CONTACTS_PATH),
}
