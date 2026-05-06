package com.demohackathon.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.demohackathon.demo.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByFirstName(String firstName);
    List<Contact> findByLastName(String lastName);
    List<Contact> findByEmail(String email);
}
