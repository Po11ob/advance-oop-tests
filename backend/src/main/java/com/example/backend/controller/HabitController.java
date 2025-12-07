package com.example.backend.controller;

import com.example.backend.model.Habit;
import com.example.backend.repository.HabitRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/habits")
@CrossOrigin(origins = "*")
public class HabitController {

    private final HabitRepository repository;

    public HabitController(HabitRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(h -> ResponseEntity.ok((Object) h))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found"));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Habit habit) {
        Habit saved = repository.save(habit);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replace(@PathVariable Long id, @RequestBody Habit habit) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(habit.getName());
                    existing.setFrequency(habit.getFrequency());
                    existing.setStatus(habit.isStatus());
                    existing.setNote(habit.getNote());
                    Habit saved = repository.save(existing);
                    return ResponseEntity.ok((Object) saved);
                })
                .orElseGet(() -> {
                    habit.setId(id);
                    Habit saved = repository.save(habit);
                    return ResponseEntity.status(HttpStatus.CREATED).body((Object) saved);
                });
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patch(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return repository.findById(id)
                .map(existing -> {
                    if (updates.containsKey("name")) existing.setName((String) updates.get("name"));
                    if (updates.containsKey("frequency")) existing.setFrequency((String) updates.get("frequency"));
                    if (updates.containsKey("note")) existing.setNote((String) updates.get("note"));
                    if (updates.containsKey("status")) {
                        Object s = updates.get("status");
                        if (s instanceof Boolean) existing.setStatus((Boolean) s);
                        else if (s instanceof Number) existing.setStatus(((Number) s).intValue() != 0);
                        else if (s instanceof String) existing.setStatus(Boolean.parseBoolean((String) s));
                    }
                    Habit saved = repository.save(existing);
                    return ResponseEntity.ok((Object) saved);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
