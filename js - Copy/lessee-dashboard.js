// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Check if user is logged in and has correct role
window.addEventListener("load", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  if (currentUser.role !== "lessee" && currentUser.role !== "both") {
    alert("Access denied. You do not have permission to view this page.");
    window.location.href = "login.html";
  }
});
