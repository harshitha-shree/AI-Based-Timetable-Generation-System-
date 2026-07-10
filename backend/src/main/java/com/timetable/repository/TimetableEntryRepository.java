package com.timetable.repository;

import com.timetable.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimetableEntryRepository extends JpaRepository<TimetableEntry, Long> {

    List<TimetableEntry> findByDepartmentAndSemester(String department, String semester);

    void deleteByDepartmentAndSemesterAndAcademicYear(String department, String semester, String academicYear);
}
