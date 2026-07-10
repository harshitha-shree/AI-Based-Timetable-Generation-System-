package com.timetable.controller;

import com.timetable.entity.Classroom;
import com.timetable.repository.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    @Autowired
    private ClassroomRepository classroomRepository;

    @GetMapping
    public List<Classroom> getAll() {
        return classroomRepository.findAll();
    }

    @PostMapping
    public Classroom create(@RequestBody Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        classroomRepository.deleteById(id);
    }
}
