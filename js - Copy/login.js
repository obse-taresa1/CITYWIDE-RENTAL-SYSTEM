// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Role-based routing function
function routeBasedOnRole(role) {
  switch (role.toLowerCase()) {
    case "admin":
      return "dashboard.html";
    case "supervisor":
      return "dashboard.html";
    case "lessee":
    case "renter":
      return "lessee-dashboard.html";
    case "lessor":
      return "lessor-dashboard.html";
    case "both":
      return "both-dashboard.html";
    case "superadmin":
      return "super-dashboard.html";
    default:
      return "login.html";
  }
}

function continuePendingRental(user) {
  const pendingRental = localStorage.getItem("pendingRental");
  const redirectAfterLogin = localStorage.getItem("redirectAfterLogin") || "";
  const redirectUrl = redirectAfterLogin
    ? new URL(redirectAfterLogin, window.location.href)
    : null;
  const itemId =
    pendingRental ||
    (redirectUrl && redirectUrl.searchParams.get("id")) ||
    (redirectUrl && redirectUrl.searchParams.get("itemId")) ||
    "";
  const action =
    (redirectUrl && redirectUrl.searchParams.get("action")) ||
    (pendingRental || (redirectUrl && redirectUrl.pathname.endsWith("booking.html")) ? "rent" : "");

  localStorage.removeItem("redirectAfterLogin");

  if (itemId && action === "rent") {
    localStorage.setItem("pendingRental", itemId);
    const role = (user.role || "").toLowerCase();
    const allowed = ["renter", "lessee", "both"].includes(role);
    if (allowed) {
      window.location.href = `booking.html?itemId=${encodeURIComponent(itemId)}`;
      return true;
    }

    const messages = {
      lessor: "Lessors cannot rent items. Change your role to Both if you want to rent and list items.",
      admin: "Administrators cannot rent items.",
      supervisor: "Administrators cannot rent items.",
      superadmin: "Super Administrators cannot rent items.",
    };
    sessionStorage.setItem("rentAccessMessage", messages[role] || "Please log in to rent this item.");
    window.location.href = `item-details.html?id=${encodeURIComponent(itemId)}`;
    return true;
  }

  return false;
}

// Form submission handler
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Email validation
  if (!validateEmail(email)) {
    alert("Please enter a valid email address (e.g., user@example.com)");
    return;
  }

  // Password validation (minimum 8 characters)
  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find user by email and password
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password. Please try again.");
    return;
  }

  // Store current user in session
  localStorage.setItem("currentUser", JSON.stringify(user));

  if (continuePendingRental(user)) return;

  // Route based on role
  const dashboardUrl = routeBasedOnRole(user.role);
  window.location.href = dashboardUrl;
});

function showLoginNotice() {
  const message = sessionStorage.getItem("rentAccessMessage");
  const form = document.querySelector("form");
  if (!message || !form || document.querySelector("[data-login-notice]")) return;

  form.insertAdjacentHTML(
    "afterbegin",
    `<div class="alert alert-warning" data-login-notice>${message}</div>`,
  );
  sessionStorage.removeItem("rentAccessMessage");
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Check if user is already logged in
window.addEventListener("load", function () {
  showLoginNotice();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (currentUser) {
    if (continuePendingRental(currentUser)) return;
    const dashboardUrl = routeBasedOnRole(currentUser.role);
    window.location.href = dashboardUrl;
  }
});
