requireLogin();
setActiveAdminChip();

const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const viewBtn = document.getElementById("viewBtn");
const viewAlert = document.getElementById("viewAlert");

function showAlert(message) {
  viewAlert.textContent = message;
  viewAlert.className = "alert show alert-error";
}

async function loadTimetable() {
  viewAlert.classList.remove("show");
  const department = document.getElementById("department").value;
  const semester = document.getElementById("semester").value;

  try {
    const meta = await apiRequest("/timetable/meta");
    const days = meta.days;          // Monday..Friday
    const timeSlots = meta.timeSlots; // 5 slots, lunch inserted visually after index 2

    const entries = await apiRequest(`/timetable?department=${encodeURIComponent(department)}&semester=${encodeURIComponent(semester)}`);

    // Build a lookup: day -> slot -> entry
    const lookup = {};
    entries.forEach(e => {
      lookup[e.dayOfWeek] = lookup[e.dayOfWeek] || {};
      lookup[e.dayOfWeek][e.timeSlot] = e;
    });

    // Header row
    tableHead.innerHTML = `<th>Time / Day</th>` + days.map(d => `<th>${d}</th>`).join("") + `<th>Saturday</th>`;

    tableBody.innerHTML = "";

    timeSlots.forEach((slot, idx) => {
      let row = `<tr><td><strong>${slot}</strong></td>`;
      days.forEach(day => {
        const entry = lookup[day] && lookup[day][slot];
        if (entry) {
          row += `<td><div class="cell-subject">${entry.subjectName}</div><div class="cell-faculty">${entry.facultyName} &bull; ${entry.roomName}</div></td>`;
        } else {
          row += `<td class="empty">-</td>`;
        }
      });
      row += `<td class="empty">-</td>`;
      row += `</tr>`;
      tableBody.innerHTML += row;

      // Insert a lunch break row after the 3rd period (index 2)
      if (idx === 2) {
        tableBody.innerHTML += `<tr><td class="lunch">12:15 - 1:15</td><td class="lunch" colspan="${days.length + 1}">Lunch Break</td></tr>`;
      }
    });

    if (entries.length === 0) {
      showAlert("No timetable found for this department/semester yet. Generate one first.");
    }
  } catch (err) {
    showAlert(err.message || "Failed to load timetable.");
  }
}

viewBtn.addEventListener("click", loadTimetable);

// Load default view on page load
loadTimetable();
