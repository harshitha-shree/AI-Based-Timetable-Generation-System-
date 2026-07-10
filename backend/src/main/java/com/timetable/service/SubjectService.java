package com.timetable.service;

import com.timetable.entity.Subject;
import com.timetable.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getAll() {
        return subjectRepository.findAll();
    }

    public Subject create(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject update(Long id, Subject updated) {
        Subject existing = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id " + id));
        existing.setName(updated.getName());
        existing.setDepartment(updated.getDepartment());
        existing.setFacultyId(updated.getFacultyId());
        existing.setLab(updated.isLab());
        existing.setSemester(updated.getSemester());
        return subjectRepository.save(existing);
    }

    public void delete(Long id) {
        subjectRepository.deleteById(id);
    }

    public long count() {
        return subjectRepository.count();
    }

    public List<Subject> getByDepartmentAndSemester(String department, String semester) {
        return subjectRepository.findByDepartmentAndSemester(department, semester);
    }
}
