package com.timetable.repository;

import com.timetable.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByDepartment(String department);
    List<Subject> findByDepartmentAndSemester(String department, String semester);
}
