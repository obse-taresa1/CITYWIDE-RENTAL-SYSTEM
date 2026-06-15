// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Check if user is logged in and has admin role
window.addEventListener("load", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  if (currentUser.role !== "admin" && currentUser.role !== "superadmin") {
    alert("Access denied. You do not have permission to view this page.");
    window.location.href = "login.html";
  }
});

// Approve role change request
function approveRoleChange(requestId) {
  if (!confirm("Are you sure you want to approve this role change request?")) {
    return;
  }

  // Get role change requests from localStorage
  let roleChangeRequests = JSON.parse(
    localStorage.getItem("roleChangeRequests") || "[]",
  );

  // Find the request
  const requestIndex = roleChangeRequests.findIndex(
    (r) => r.requestId === requestId,
  );
  if (requestIndex === -1) {
    alert("Request not found");
    return;
  }

  const request = roleChangeRequests[requestIndex];

  // Validate that requested role is one of the allowed user roles (lessee, lessor, both)
  const allowedRoles = ["lessee", "lessor", "both"];
  if (!allowedRoles.includes(request.requestedRole)) {
    alert(
      "Invalid role change request. Users can only change to Lessee, Lessor, or Both. Admin roles must be assigned by Super Admin.",
    );
    return;
  }

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find the user and update their role
  const userIndex = users.findIndex((u) => u.email === request.userEmail);
  if (userIndex !== -1) {
    users[userIndex].role = request.requestedRole;
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Update request status
  roleChangeRequests[requestIndex].status = "Approved";
  localStorage.setItem(
    "roleChangeRequests",
    JSON.stringify(roleChangeRequests),
  );

  // Update the table row
  const row = event.target.closest("tr");
  row.querySelector(".badge-status").className = "badge-status badge-active";
  row.querySelector(".badge-status").textContent = "Approved";
  row.querySelector("td:last-child").innerHTML =
    '<button class="btn btn-sm btn-outline-secondary" disabled>Completed</button>';

  alert("Role change request approved successfully!");
}

// Reject role change request
function rejectRoleChange(requestId) {
  if (!confirm("Are you sure you want to reject this role change request?")) {
    return;
  }

  // Get role change requests from localStorage
  let roleChangeRequests = JSON.parse(
    localStorage.getItem("roleChangeRequests") || "[]",
  );

  // Find the request
  const requestIndex = roleChangeRequests.findIndex(
    (r) => r.requestId === requestId,
  );
  if (requestIndex === -1) {
    alert("Request not found");
    return;
  }

  // Update request status
  roleChangeRequests[requestIndex].status = "Rejected";
  localStorage.setItem(
    "roleChangeRequests",
    JSON.stringify(roleChangeRequests),
  );

  // Update the table row
  const row = event.target.closest("tr");
  row.querySelector(".badge-status").className = "badge-status badge-dispute";
  row.querySelector(".badge-status").textContent = "Rejected";
  row.querySelector("td:last-child").innerHTML =
    '<button class="btn btn-sm btn-outline-secondary" disabled>Rejected</button>';

  alert("Role change request rejected successfully!");
}
