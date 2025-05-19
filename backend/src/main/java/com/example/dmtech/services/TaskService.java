package com.example.dmtech.services;

import com.example.dmtech.models.Task;
import com.example.dmtech.repos.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAllTasks() {
        return this.repo.findAll();
    }

    public Optional<Task> getTaskById(long id){
        return this.repo.findById(id);
    }

    public Task saveTask(Task task){
        return this.repo.save(task);
    }

    public void deleteById(long id){
        this.repo.deleteById(id);
    }

    public void updateTaskCategoryById(long id, Task.Category category){
        Task task = getTaskById(id).get();
        task.setCategory(category);
        this.repo.save(task);
    }

    public void updateTaskStatusById(long id, Task.Status status){
        Task task = getTaskById(id).get();
        task.setStatus(status);
        this.repo.save(task);
    }

}
