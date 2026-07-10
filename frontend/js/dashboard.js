requireLogin();
setActiveAdminChip();

async function loadStats() {
  try {
    const stats = await apiRequest("/dashboard/stats");
    document.getElementById("totalFaculty").textContent = stats.totalFaculty;
    document.getElementById("totalSubjects").textContent = stats.totalSubjects;
    document.getElementById("totalClassrooms").textContent = stats.totalClassrooms;
  } catch (err) {
    console.error("Failed to load dashboard stats:", err.message);
  }
}

loadStats();
