package com.timetable.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "timetable_entry")
public class TimetableEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String semester;

    @Column(name = "academic_year", nullable = false)
    private String academicYear;

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek; // Monday..Saturday

    @Column(name = "time_slot", nullable = false)
    private String timeSlot; // e.g. "9:00 - 10:00"

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "faculty_name")
    private String facultyName;

    @Column(name = "room_name")
    private String roomName;

    public TimetableEntry() {}

    public TimetableEntry(Long id, String department, String semester, String academicYear,
                           String dayOfWeek, String timeSlot, String subjectName,
                           String facultyName, String roomName) {
        this.id = id;
        this.department = department;
        this.semester = semester;
        this.academicYear = academicYear;
        this.dayOfWeek = dayOfWeek;
        this.timeSlot = timeSlot;
        this.subjectName = subjectName;
        this.facultyName = facultyName;
        this.roomName = roomName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }

    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }
}
