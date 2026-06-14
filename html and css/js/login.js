// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Role-based routing function
function routeBasedOnRole(role) {
  switch (role.toLowerCase()) {
    case "admin":
      return "admin.html";
    case "supervisor":
      return "admin.html";
    case "lessee":
    case "renter":
      return "lessee-dashboard.html";
    case "lessor":
      return "lessor-dashboard.html";
    case "both":
      return "both-dashboard.html";
    case "superadmin":
      return "super-admin-dashboard.html";
    default:
      return "login.html";
  }
}

function continuePendingRental() {
  const redirectAfterLogin = localStorage.getItem("redirectAfterLogin") || "";
  if (!redirectAfterLogin) return false;

  let redirectUrl;
  try {
    redirectUrl = new URL(redirectAfterLogin, window.location.href);
  } catch (error) {
    localStorage.removeItem("redirectAfterLogin");
    return false;
  }

  const page = redirectUrl.pathname.split("/").pop();
  const itemId = redirectUrl.searchParams.get("id") || redirectUrl.searchParams.get("itemId") || "";
  const isRentAttempt =
    redirectUrl.origin === window.location.origin &&
    itemId &&
    (redirectUrl.searchParams.get("action") === "rent" || page === "booking.html");

  localStorage.removeItem("redirectAfterLogin");

  if (!isRentAttempt) {
    return false;
  }

  localStorage.setItem("pendingRental", itemId);
  window.location.href = `item-details.html?id=${encodeURIComponent(itemId)}&action=rent`;
  return true;
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

  if (continuePendingRental()) return;

  // Route based on role
  const dashboardUrl = routeBasedOnRole(user.role);
  window.location.href = dashboardUrl;
});

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Check if user is already logged in
window.addEventListener("load", function () {
  sessionStorage.removeItem("rentAccessMessage");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (currentUser) {
    if (continuePendingRental()) return;
    const dashboardUrl = routeBasedOnRole(currentUser.role);
    window.location.href = dashboardUrl;
  }
});
