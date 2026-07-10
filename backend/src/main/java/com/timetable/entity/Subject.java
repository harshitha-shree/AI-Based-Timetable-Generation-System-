package com.timetable.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    // Optional link to the faculty who teaches this subject.
    // Kept as a simple id reference to keep the model lightweight.
    @Column(name = "faculty_id")
    private Long facultyId;

    @Column(name = "is_lab")
    private boolean isLab = false;

    @Column(name = "semester")
    private String semester = "Semester 1";

    public Subject() {}

    public Subject(Long id, String name, String department, Long facultyId, boolean isLab, String semester) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.facultyId = facultyId;
        this.isLab = isLab;
        this.semester = semester;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Long getFacultyId() { return facultyId; }
    public void setFacultyId(Long facultyId) { this.facultyId = facultyId; }

    public boolean isLab() { return isLab; }
    public void setLab(boolean lab) { isLab = lab; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
}
