package com.demohackathon.demo.controller;

//dependencies imports
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demohackathon.demo.model.Contact;
import com.demohackathon.demo.service.ContactService;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")

public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact createdContact = contactService.createContact(contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdContact);
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Optional<Contact> contact = contactService.getContactById(id);
        if (contact.isPresent()) {
            return ResponseEntity.ok(contact.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search/firstName")
    public ResponseEntity<List<Contact>> getContactsByFirstName(@RequestParam String firstName) {
        List<Contact> contacts = contactService.getContactsByFirstName(firstName);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/search/lastName")
    public ResponseEntity<List<Contact>> getContactsByLastName(@RequestParam String lastName) {
        List<Contact> contacts = contactService.getContactsByLastName(lastName);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/search/email")
    public ResponseEntity<List<Contact>> getContactsByEmail(@RequestParam String email) {
        List<Contact> contacts = contactService.getContactsByEmail(email);
        return ResponseEntity.ok(contacts);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contactDetails) {
        Contact updatedContact = contactService.updateContact(id, contactDetails);
        if (updatedContact != null) {
            return ResponseEntity.ok(updatedContact);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        if (contactService.deleteContact(id)) {
            return ResponseEntity.ok("Contact deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllContacts() {
        contactService.deleteAllContacts();
        return ResponseEntity.ok("All contacts deleted successfully");
    }
}
