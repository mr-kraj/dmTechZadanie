package com.example.dmtech.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Task {
    @GeneratedValue @Id
    private long id;
    private String name;
    private String desc;
    private Task.Category category;
    private Task.Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public enum Category {
        RESTOCK,
        INVENTORY,
        BEST_BY_DATE_CHECK,
        PROMOTION_MANAGEMENT,
        CLEANING
    }

    public enum Status {
        NEW,
        IN_PROGRESS,
        FINISHED,
        CANCELLED
    }
}


