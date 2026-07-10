package com.timetable.service;

import com.timetable.entity.Faculty;
import com.timetable.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public List<Faculty> getAll() {
        return facultyRepository.findAll();
    }

    public Faculty create(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public Faculty update(Long id, Faculty updated) {
        Faculty existing = facultyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Faculty not found with id " + id));
        existing.setName(updated.getName());
        existing.setDepartment(updated.getDepartment());
        existing.setEmail(updated.getEmail());
        return facultyRepository.save(existing);
    }

    public void delete(Long id) {
        facultyRepository.deleteById(id);
    }

    public long count() {
        return facultyRepository.count();
    }
}
