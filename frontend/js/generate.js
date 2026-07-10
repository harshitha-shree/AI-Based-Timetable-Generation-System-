requireLogin();
setActiveAdminChip();

const generateForm = document.getElementById("generateForm");
const statusCard = document.getElementById("statusCard");
const statusList = document.getElementById("statusList");
const checkmark = document.getElementById("checkmark");
const generateBtn = document.getElementById("generateBtn");
const generateAlert = document.getElementById("generateAlert");

const STEPS = [
  "Collecting data...",
  "Checking constraints...",
  "AI is generating the best possible timetable...",
  "Timetable generated successfully!",
];

function showAlert(message) {
  generateAlert.textContent = message;
  generateAlert.className = "alert show alert-error";
}

function renderStep(index) {
  statusList.innerHTML = "";
  for (let i = 0; i <= index; i++) {
    statusList.innerHTML += `<div class="status-item"><span class="dot">&#10003;</span> ${STEPS[i]}</div>`;
  }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

generateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  generateAlert.classList.remove("show");

  const department = document.getElementById("department").value;
  const semester = document.getElementById("semester").value;
  const academicYear = document.getElementById("academicYear").value;

  statusCard.style.display = "block";
  checkmark.style.display = "none";
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  try {
    // Animate through the visual steps while the backend does the real work
    renderStep(0);
    await sleep(400);
    renderStep(1);
    await sleep(400);
    renderStep(2);

    await apiRequest("/timetable/generate", "POST", { department, semester, academicYear });

    renderStep(3);
    checkmark.style.display = "flex";
  } catch (err) {
    showAlert(err.message || "Failed to generate timetable.");
    statusCard.style.display = "none";
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "\u2699 Generate Timetable";
  }
});
