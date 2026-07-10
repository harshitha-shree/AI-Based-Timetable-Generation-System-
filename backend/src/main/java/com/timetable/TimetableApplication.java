package com.timetable;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.timetable.entity.*;
import com.timetable.repository.*;

@SpringBootApplication
public class TimetableApplication {

    public static void main(String[] args) {
        SpringApplication.run(TimetableApplication.class, args);
    }

    /**
     * Seeds a couple of classrooms on startup so timetable generation
     * has rooms to assign, if none exist yet.
     */
    @Bean
    public CommandLineRunner seedData(ClassroomRepository classroomRepository) {
        return args -> {
            if (classroomRepository.count() == 0) {
                classroomRepository.save(new Classroom(null, "Lecture Hall 1", "LECTURE"));
                classroomRepository.save(new Classroom(null, "Lecture Hall 2", "LECTURE"));
                classroomRepository.save(new Classroom(null, "Lecture Hall 3", "LECTURE"));
                classroomRepository.save(new Classroom(null, "Lab 1", "LAB"));
                classroomRepository.save(new Classroom(null, "Lab 2", "LAB"));
                classroomRepository.save(new Classroom(null, "Lab 3", "LAB"));
            }
        };
    }
}
