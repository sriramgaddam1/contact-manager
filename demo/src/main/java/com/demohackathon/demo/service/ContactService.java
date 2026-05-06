package com.demohackathon.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demohackathon.demo.model.Contact;
import com.demohackathon.demo.repository.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    public List<Contact> getContactsByFirstName(String firstName) {
        return contactRepository.findByFirstName(firstName);
    }

    public List<Contact> getContactsByLastName(String lastName) {
        return contactRepository.findByLastName(lastName);
    }

    public List<Contact> getContactsByEmail(String email) {
        return contactRepository.findByEmail(email);
    }

    public Contact updateContact(Long id, Contact contactDetails) {
        Optional<Contact> contact = contactRepository.findById(id);
        if (contact.isPresent()) {
            Contact existingContact = contact.get();
            if (contactDetails.getFirstName() != null) {
                existingContact.setFirstName(contactDetails.getFirstName());
            }
            if (contactDetails.getLastName() != null) {
                existingContact.setLastName(contactDetails.getLastName());
            }
            if (contactDetails.getEmail() != null) {
                existingContact.setEmail(contactDetails.getEmail());
            }
            if (contactDetails.getPhoneNumber() != null) {
                existingContact.setPhoneNumber(contactDetails.getPhoneNumber());
            }
            return contactRepository.save(existingContact);
        }
        return null;
    }

    public boolean deleteContact(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void deleteAllContacts() {
        contactRepository.deleteAll();
    }
}
