package com.timetable.controller;

import com.timetable.repository.ClassroomRepository;
import com.timetable.service.FacultyService;
import com.timetable.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ClassroomRepository classroomRepository;

    @GetMapping("/stats")
    public Map<String, Long> stats() {
        return Map.of(
                "totalFaculty", facultyService.count(),
                "totalSubjects", subjectService.count(),
                "totalClassrooms", classroomRepository.count()
        );
    }
}
