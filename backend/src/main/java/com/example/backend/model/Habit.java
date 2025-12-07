package com.example.backend.model;

public class Habit {
    private Long id;
    private String name;
    private String frequency;
    private boolean status; // true = completed, false = not completed
    private String note;

    public Habit() {}

    public Habit(String name, String frequency, boolean status, String note) {
        this.name = name;
        this.frequency = frequency;
        this.status = status;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
