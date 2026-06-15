// Load current user data and role change request status
window.addEventListener("load", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Set current role
  document.getElementById("currentRole").value =
    currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

  // Check for existing role change request
  const roleChangeRequests = JSON.parse(
    localStorage.getItem("roleChangeRequests") || "[]",
  );
  const existingRequest = roleChangeRequests.find(
    (r) => r.userEmail === currentUser.email && r.status === "Pending",
  );

  if (existingRequest) {
    document.getElementById("roleChangeStatus").style.display = "block";
    document.getElementById("requestId").textContent =
      existingRequest.requestId;
    document.getElementById("requestedRoleDisplay").textContent =
      existingRequest.requestedRole.charAt(0).toUpperCase() +
      existingRequest.requestedRole.slice(1);
    document.getElementById("requestStatus").textContent =
      existingRequest.status;
    document.getElementById("requestDate").textContent = new Date(
      existingRequest.requestDate,
    ).toLocaleDateString();
  }
});

// Submit role change request
function submitRoleChangeRequest() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    alert("Please log in to submit a role change request");
    return;
  }

  const requestedRole = document.getElementById("requestedRole").value;
  const reason = document.getElementById("roleChangeReason").value;

  if (!requestedRole) {
    alert("Please select a new role");
    return;
  }

  // Validate that requested role is one of the allowed user roles (lessee, lessor, both)
  const allowedRoles = ["lessee", "lessor", "both"];
  if (!allowedRoles.includes(requestedRole)) {
    alert(
      "Invalid role selection. You can only request to change to Lessee, Lessor, or Both.",
    );
    return;
  }

  // Validate that current user role is also a user role (not admin or superadmin)
  if (!allowedRoles.includes(currentUser.role)) {
    alert(
      "Admins and Super Admins cannot change their roles through this system.",
    );
    return;
  }

  if (requestedRole === currentUser.role) {
    alert("You cannot request to change to the same role");
    return;
  }

  if (!reason.trim()) {
    alert("Please provide a reason for the role change");
    return;
  }

  // Check for existing pending request
  const roleChangeRequests = JSON.parse(
    localStorage.getItem("roleChangeRequests") || "[]",
  );
  const existingRequest = roleChangeRequests.find(
    (r) => r.userEmail === currentUser.email && r.status === "Pending",
  );

  if (existingRequest) {
    alert(
      "You already have a pending role change request. Please wait for it to be processed.",
    );
    return;
  }

  // Create new role change request
  const newRequest = {
    requestId: "R-" + Date.now(),
    userName: currentUser.fullname,
    userEmail: currentUser.email,
    currentRole: currentUser.role,
    requestedRole: requestedRole,
    reason: reason,
    requestDate: new Date().toISOString(),
    status: "Pending",
  };

  roleChangeRequests.push(newRequest);
  localStorage.setItem(
    "roleChangeRequests",
    JSON.stringify(roleChangeRequests),
  );

  // Update UI to show request status
  document.getElementById("roleChangeStatus").style.display = "block";
  document.getElementById("requestId").textContent = newRequest.requestId;
  document.getElementById("requestedRoleDisplay").textContent =
    requestedRole.charAt(0).toUpperCase() + requestedRole.slice(1);
  document.getElementById("requestStatus").textContent = "Pending";
  document.getElementById("requestDate").textContent =
    new Date().toLocaleDateString();

  alert(
    "Role change request submitted successfully! An admin will review your request.",
  );
}
