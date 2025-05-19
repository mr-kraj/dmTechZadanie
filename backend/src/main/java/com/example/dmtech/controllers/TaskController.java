package com.example.dmtech.controllers;

import com.example.dmtech.models.Task;
import com.example.dmtech.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getAllTasks (){
        return this.service.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable long id){
        return service.getTaskById(id).map(task -> ResponseEntity.ok(task)).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> createNewTask(@RequestBody Task newTask){
        return ResponseEntity.ok(service.saveTask(newTask));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Task> deleteTaskById(@PathVariable long id){
        try {
            service.getTaskById(id).get();
            this.service.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable long id, @RequestBody Task.Status newStatus){
        try {
            service.getTaskById(id).get();
            this.service.updateTaskStatusById(id, newStatus);
            return ResponseEntity.ok().build();
    } catch (NoSuchElementException e){
        return ResponseEntity.notFound().build();
    }
    }
}


