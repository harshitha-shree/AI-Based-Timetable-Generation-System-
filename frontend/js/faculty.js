requireLogin();
setActiveAdminChip();

// ---------- Tabs ----------
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

function showAlert(id, message, type = "error") {
  const box = document.getElementById(id);
  box.textContent = message;
  box.className = `alert show alert-${type}`;
  setTimeout(() => box.classList.remove("show"), 3000);
}

// ---------- Faculty ----------
const facultyForm = document.getElementById("facultyForm");
const facultyTableBody = document.getElementById("facultyTableBody");
const facultySubmitBtn = document.getElementById("facultySubmitBtn");

async function loadFaculty() {
  const facultyList = await apiRequest("/faculty");
  facultyTableBody.innerHTML = "";
  facultyList.forEach(f => {
    facultyTableBody.innerHTML += `
      <tr>
        <td>${f.id}</td>
        <td>${f.name}</td>
        <td>${f.department}</td>
        <td>${f.email}</td>
        <td>
          <button class="action-icon edit" onclick="editFaculty(${f.id}, '${escapeQuotes(f.name)}', '${f.department}', '${escapeQuotes(f.email)}')">&#9998;</button>
          <button class="action-icon delete" onclick="deleteFaculty(${f.id})">&#128465;</button>
        </td>
      </tr>`;
  });
  populateFacultyDropdown(facultyList);
}

function populateFacultyDropdown(facultyList) {
  const select = document.getElementById("subjectFaculty");
  const current = select.value;
  select.innerHTML = `<option value="">Unassigned</option>`;
  facultyList.forEach(f => {
    select.innerHTML += `<option value="${f.id}">${f.name} (${f.department})</option>`;
  });
  select.value = current;
}

function escapeQuotes(str) {
  return (str || "").replace(/'/g, "\\'");
}

function editFaculty(id, name, department, email) {
  document.getElementById("facultyId").value = id;
  document.getElementById("facultyName").value = name;
  document.getElementById("facultyDepartment").value = department;
  document.getElementById("facultyEmail").value = email;
  facultySubmitBtn.textContent = "Update Faculty";
}

async function deleteFaculty(id) {
  if (!confirm("Delete this faculty member?")) return;
  try {
    await apiRequest(`/faculty/${id}`, "DELETE");
    loadFaculty();
  } catch (err) {
    showAlert("facultyAlert", err.message);
  }
}

facultyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("facultyId").value;
  const payload = {
    name: document.getElementById("facultyName").value.trim(),
    department: document.getElementById("facultyDepartment").value,
    email: document.getElementById("facultyEmail").value.trim(),
  };

  try {
    if (id) {
      await apiRequest(`/faculty/${id}`, "PUT", payload);
    } else {
      await apiRequest("/faculty", "POST", payload);
    }
    facultyForm.reset();
    document.getElementById("facultyId").value = "";
    facultySubmitBtn.textContent = "+ Add Faculty";
    loadFaculty();
  } catch (err) {
    showAlert("facultyAlert", err.message);
  }
});

// ---------- Subjects ----------
const subjectForm = document.getElementById("subjectForm");
const subjectTableBody = document.getElementById("subjectTableBody");
const subjectSubmitBtn = document.getElementById("subjectSubmitBtn");

async function loadSubjects() {
  const subjects = await apiRequest("/subjects");
  subjectTableBody.innerHTML = "";
  subjects.forEach(s => {
    subjectTableBody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.department}</td>
        <td>${s.semester}</td>
        <td>${s.lab ? "Lab" : "Lecture"}</td>
        <td>
          <button class="action-icon edit" onclick='editSubject(${JSON.stringify(s)})'>&#9998;</button>
          <button class="action-icon delete" onclick="deleteSubject(${s.id})">&#128465;</button>
        </td>
      </tr>`;
  });
}

function editSubject(s) {
  document.getElementById("subjectId").value = s.id;
  document.getElementById("subjectName").value = s.name;
  document.getElementById("subjectDepartment").value = s.department;
  document.getElementById("subjectSemester").value = s.semester;
  document.getElementById("subjectFaculty").value = s.facultyId || "";
  document.getElementById("subjectIsLab").value = s.lab ? "true" : "false";
  subjectSubmitBtn.textContent = "Update Subject";
}

async function deleteSubject(id) {
  if (!confirm("Delete this subject?")) return;
  try {
    await apiRequest(`/subjects/${id}`, "DELETE");
    loadSubjects();
  } catch (err) {
    showAlert("subjectAlert", err.message);
  }
}

subjectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("subjectId").value;
  const facultyIdValue = document.getElementById("subjectFaculty").value;
  const payload = {
    name: document.getElementById("subjectName").value.trim(),
    department: document.getElementById("subjectDepartment").value,
    semester: document.getElementById("subjectSemester").value,
    facultyId: facultyIdValue ? parseInt(facultyIdValue) : null,
    lab: document.getElementById("subjectIsLab").value === "true",
  };

  try {
    if (id) {
      await apiRequest(`/subjects/${id}`, "PUT", payload);
    } else {
      await apiRequest("/subjects", "POST", payload);
    }
    subjectForm.reset();
    document.getElementById("subjectId").value = "";
    subjectSubmitBtn.textContent = "+ Add Subject";
    loadSubjects();
  } catch (err) {
    showAlert("subjectAlert", err.message);
  }
});

loadFaculty();
loadSubjects();
