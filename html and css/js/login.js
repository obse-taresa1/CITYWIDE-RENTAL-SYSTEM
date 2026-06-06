// Email validation function
const DEFAULT_SUPER_ADMIN = {
  id: "SA-DEFAULT",
  fullname: "Super Admin",
  email: "superadmin@citywide.com",
  phone: "",
  password: "SuperAdmin123",
  role: "superadmin",
  createdAt: "2026-01-01T00:00:00.000Z",
  systemAccount: true,
};

function seedDefaultSuperAdmin() {
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem("users") || "[]");
  } catch (error) {
    users = [];
  }

  const hasDefaultSuperAdmin = users.some(
    (user) =>
      user.email &&
      user.email.toLowerCase() === DEFAULT_SUPER_ADMIN.email.toLowerCase(),
  );

  const hasAnySuperAdmin = users.some((user) => user.role === "superadmin");
  if (!hasDefaultSuperAdmin && !hasAnySuperAdmin) {
    users.push(DEFAULT_SUPER_ADMIN);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    const dedupedUsers = users.filter((user, index, allUsers) => {
      if (user.role !== "superadmin") return true;
      return (
        allUsers.findIndex((candidate) => candidate.role === "superadmin") ===
        index
      );
    });
    localStorage.setItem("users", JSON.stringify(dedupedUsers));
  }
}

seedDefaultSuperAdmin();

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Role-based routing function
function routeBasedOnRole(role) {
  switch (role.toLowerCase()) {
    case "lessee":
      return "lessee-dashboard.html";
    case "lessor":
      return "lessor-dashboard.html";
    case "both":
      return "both-dashboard.html";
    case "admin":
      return "admin.html";
    case "superadmin":
      return "super-admin-dashboard.html";
    default:
      return "dashboard.html";
  }
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
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (currentUser) {
    const dashboardUrl = routeBasedOnRole(currentUser.role);
    window.location.href = dashboardUrl;
  }
});
