package com.example.demo;

import com.example.demo.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    // Por ahora vacío → JpaRepository ya te da CRUD listo
}
