// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Add Admin function
function addAdmin() {
  const fullname = document.getElementById("adminFullname").value.trim();
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;
  const role = document.getElementById("adminRole").value;

  // Validation
  if (!fullname || !email || !password || !role) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Password validation (minimum 8 characters)
  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email)) {
    alert("An account with this email already exists");
    return;
  }

  // Create admin user
  const newAdmin = {
    id: Date.now(),
    fullname: fullname,
    email: email,
    phone: "",
    password: password,
    role: role,
    createdAt: new Date().toISOString(),
  };

  users.push(newAdmin);
  localStorage.setItem("users", JSON.stringify(users));

  // Close modal and refresh
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addAdminModal"),
  );
  modal.hide();

  // Clear form
  document.getElementById("addAdminForm").reset();

  alert(`Admin ${fullname} has been created successfully!`);

  // Reload page to show new admin in table
  location.reload();
}

// Check if user is logged in and has super admin role
window.addEventListener("load", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  if (currentUser.role !== "superadmin") {
    alert("Access denied. You do not have permission to view this page.");
    window.location.href = "login.html";
  }

  // Add event listener to Add Admin button
  const addAdminBtn = document.querySelector(
    "#addAdminModal .btn-primary-custom",
  );
  if (addAdminBtn) {
    addAdminBtn.addEventListener("click", addAdmin);
  }
});
