const loginForm = document.getElementById("loginForm");
const alertBox = document.getElementById("alertBox");

function showAlert(message, type = "error") {
  alertBox.textContent = message;
  alertBox.className = `alert show alert-${type}`;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    const result = await apiRequest("/auth/login", "POST", { username, password });
    localStorage.setItem("tt_username", result.username);
    window.location.href = "dashboard.html";
  } catch (err) {
    showAlert(err.message || "Login failed. Please check your credentials.");
  }
});
