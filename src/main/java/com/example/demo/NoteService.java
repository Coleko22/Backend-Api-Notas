package com.example.demo;

import com.example.demo.Note;
import com.example.demo.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    // Obtener todas las notas
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // Obtener nota por ID
    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    // Crear o actualizar nota
    public Note saveNote(Note note) {
        // Ejemplo de validación sencilla:
        if (note.getTitle() == null || note.getTitle().isEmpty()) {
            throw new IllegalArgumentException("El título no puede estar vacío");
        }
        return noteRepository.save(note);
    }

    // Eliminar nota
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}