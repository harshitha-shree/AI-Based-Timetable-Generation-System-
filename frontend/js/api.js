// Base URL of the Spring Boot backend
const API_BASE = "http://localhost:8080/api";

async function apiRequest(path, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, options);
  let data = null;
  try { data = await res.json(); } catch (e) { /* no body */ }

  if (!res.ok) {
    const message = (data && data.message) ? data.message : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

function requireLogin() {
  const username = localStorage.getItem("tt_username");
  if (!username) {
    window.location.href = "login.html";
  }
  return username;
}

function logout() {
  localStorage.removeItem("tt_username");
  window.location.href = "login.html";
}

function setActiveAdminChip() {
  const el = document.getElementById("adminName");
  if (el) el.textContent = localStorage.getItem("tt_username") || "Admin";
}
