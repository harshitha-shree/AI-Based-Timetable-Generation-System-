package com.timetable.controller;

import com.timetable.dto.GenerateRequest;
import com.timetable.entity.TimetableEntry;
import com.timetable.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @PostMapping("/generate")
    public ResponseEntity<?> generate(@RequestBody GenerateRequest request) {
        try {
            List<TimetableEntry> entries = timetableService.generate(request);
            return ResponseEntity.ok(entries);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", ex.getMessage()));
        }
    }

    @GetMapping
    public List<TimetableEntry> view(@RequestParam String department, @RequestParam String semester) {
        return timetableService.getTimetable(department, semester);
    }

    @GetMapping("/meta")
    public Map<String, List<String>> meta() {
        return Map.of(
                "days", timetableService.getDays(),
                "timeSlots", timetableService.getTimeSlots()
        );
    }
}
