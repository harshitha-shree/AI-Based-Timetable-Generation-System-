const registerForm = document.getElementById("registerForm");
const alertBox = document.getElementById("alertBox");

function showAlert(message, type = "error") {
  alertBox.textContent = message;
  alertBox.className = `alert show alert-${type}`;
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showAlert("Passwords do not match.");
    return;
  }

  try {
    await apiRequest("/auth/register", "POST", { username, password });
    showAlert("Registration successful! Redirecting to login...", "success");
    setTimeout(() => { window.location.href = "login.html"; }, 1200);
  } catch (err) {
    showAlert(err.message || "Registration failed.");
  }
});
