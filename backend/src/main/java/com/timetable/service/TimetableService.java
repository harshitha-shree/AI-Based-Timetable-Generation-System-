package com.timetable.service;

import com.timetable.dto.GenerateRequest;
import com.timetable.entity.Classroom;
import com.timetable.entity.Faculty;
import com.timetable.entity.Subject;
import com.timetable.entity.TimetableEntry;
import com.timetable.repository.ClassroomRepository;
import com.timetable.repository.FacultyRepository;
import com.timetable.repository.SubjectRepository;
import com.timetable.repository.TimetableEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TimetableService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private TimetableEntryRepository timetableEntryRepository;

    private static final List<String> DAYS = List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday");

    private static final List<String> TIME_SLOTS = List.of(
            "9:00 - 10:00",
            "10:00 - 11:00",
            "11:15 - 12:15",
            "1:15 - 2:15",
            "2:15 - 3:15"
    );

    /**
     * Simple constraint-based generation:
     *  - Cycles through the department/semester's subjects to fill every
     *    day/period slot.
     *  - Picks a Lab room for lab subjects and a Lecture Hall for others,
     *    rotating rooms so the same room isn't double-booked in the same
     *    day/period.
     *  - Ensures no faculty member is assigned to two different subjects
     *    in the same day/period.
     */
    public List<TimetableEntry> generate(GenerateRequest request) {
        String department = request.department;
        String semester = request.semester;
        String academicYear = request.academicYear;

        List<Subject> subjects = subjectRepository.findByDepartmentAndSemester(department, semester);
        if (subjects.isEmpty()) {
            subjects = subjectRepository.findByDepartment(department);
        }
        if (subjects.isEmpty()) {
            throw new RuntimeException("No subjects found for department '" + department
                    + "'. Please add subjects before generating a timetable.");
        }

        Map<Long, Faculty> facultyById = new HashMap<>();
        for (Faculty f : facultyRepository.findAll()) {
            facultyById.put(f.getId(), f);
        }

        List<Classroom> lectureRooms = classroomRepository.findByType("LECTURE");
        List<Classroom> labRooms = classroomRepository.findByType("LAB");
        if (lectureRooms.isEmpty()) lectureRooms = List.of(new Classroom(null, "Room 101", "LECTURE"));
        if (labRooms.isEmpty()) labRooms = List.of(new Classroom(null, "Lab 1", "LAB"));

        // Wipe any previous generation for this exact department/semester/year
        timetableEntryRepository.deleteByDepartmentAndSemesterAndAcademicYear(department, semester, academicYear);

        List<TimetableEntry> generated = new ArrayList<>();

        // Track which faculty is already busy at a given (day, slot) to avoid clashes
        Set<String> facultyBusy = new HashSet<>();

        int subjectPointer = 0;
        int lectureRoomPointer = 0;
        int labRoomPointer = 0;

        for (String day : DAYS) {
            for (String slot : TIME_SLOTS) {
                Subject chosen = null;
                Faculty chosenFaculty = null;

                // Try to find a subject whose faculty is free in this slot;
                // fall back to plain round robin if everyone is "busy"
                // (only relevant when there are very few subjects/faculty).
                for (int attempt = 0; attempt < subjects.size(); attempt++) {
                    Subject candidate = subjects.get((subjectPointer + attempt) % subjects.size());
                    Faculty candidateFaculty = candidate.getFacultyId() != null
                            ? facultyById.get(candidate.getFacultyId())
                            : null;
                    String busyKey = day + "|" + slot + "|" + (candidateFaculty != null ? candidateFaculty.getId() : "none");

                    if (candidateFaculty == null || !facultyBusy.contains(busyKey)) {
                        chosen = candidate;
                        chosenFaculty = candidateFaculty;
                        subjectPointer = (subjectPointer + attempt + 1) % subjects.size();
                        if (candidateFaculty != null) {
                            facultyBusy.add(busyKey);
                        }
                        break;
                    }
                }

                if (chosen == null) {
                    // everyone busy - just take the next one anyway
                    chosen = subjects.get(subjectPointer % subjects.size());
                    subjectPointer = (subjectPointer + 1) % subjects.size();
                    chosenFaculty = chosen.getFacultyId() != null ? facultyById.get(chosen.getFacultyId()) : null;
                }

                String roomName;
                if (chosen.isLab()) {
                    roomName = labRooms.get(labRoomPointer % labRooms.size()).getName();
                    labRoomPointer++;
                } else {
                    roomName = lectureRooms.get(lectureRoomPointer % lectureRooms.size()).getName();
                    lectureRoomPointer++;
                }

                TimetableEntry entry = new TimetableEntry(
                        null,
                        department,
                        semester,
                        academicYear,
                        day,
                        slot,
                        chosen.getName(),
                        chosenFaculty != null ? chosenFaculty.getName() : "TBA",
                        roomName
                );
                generated.add(entry);
            }
        }

        return timetableEntryRepository.saveAll(generated);
    }

    public List<TimetableEntry> getTimetable(String department, String semester) {
        return timetableEntryRepository.findByDepartmentAndSemester(department, semester);
    }

    public List<String> getDays() {
        return DAYS;
    }

    public List<String> getTimeSlots() {
        return TIME_SLOTS;
    }
}
