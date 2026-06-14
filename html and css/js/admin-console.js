(function () {
  if (!window.CityRentI18n && !document.querySelector('script[src="js/shared-ui.js"]')) {
    const sharedScript = document.createElement("script");
    sharedScript.src = "js/shared-ui.js";
    document.head.appendChild(sharedScript);
  }

  const adminPages = {
    "dashboard.html": ["bi-speedometer2", "Dashboard"],
    "users.html": ["bi-people", "Users"],
    "listings.html": ["bi-box-seam", "Listings"],
    "messages.html": ["bi-envelope", "Messages"],
    "role-requests.html": ["bi-arrow-repeat", "Role Requests"],
    "reports.html": ["bi-flag", "Reports"],
    "statistics.html": ["bi-bar-chart", "Statistics"],
    "settings.html": ["bi-gear", "Settings"],
  };

  const superPages = {
    "super-dashboard.html": ["bi-command", "Control Center"],
    "admin-management.html": ["bi-person-badge", "Admin Management"],
    "user-management.html": ["bi-people", "User Management"],
    "listing-management.html": ["bi-box-seam", "Listing Management"],
    "contact-messages.html": ["bi-envelope", "Contact Messages"],
    "role-requests.html": ["bi-arrow-repeat", "Role Requests"],
    "analytics.html": ["bi-graph-up-arrow", "Analytics"],
    "activity-logs.html": ["bi-journal-text", "Activity Logs"],
    "system-settings.html": ["bi-sliders", "System Settings"],
  };

  const sampleUsers = [
    ["Alex Rivera", "alex@email.com", "lessee", "Active"],
    ["Sarah Mitchell", "sarah@email.com", "lessor", "Active"],
    ["EventPro LLC", "contact@eventpro.com", "both", "Pending"],
  ];
  const sampleListings = [
    ["Canon EOS DSLR Kit", "Cameras", "$45/day", "Pending"],
    ["Toyota RAV4 2023", "Vehicles", "$65/day", "Active"],
    ["DeWalt Power Drill Set", "Tools", "$18/day", "Active"],
  ];
  const sampleMessages = [
    ["Maya Patel", "maya@email.com", "Account onboarding", "Unread"],
    ["Jordan Lee", "jordan@email.com", "Listing verification", "Read"],
    ["City Sports", "hello@citysports.com", "Bulk rental support", "Unread"],
  ];
  const sampleReports = [
    ["R-2081", "Late return complaint", "Open"],
    ["R-2082", "Damaged projector", "In Review"],
    ["R-2083", "Payment dispute", "Resolved"],
  ];
  let managementActionsInstalled = false;

  function page() {
    return window.location.pathname.split("/").pop() || "dashboard.html";
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      return null;
    }
  }

  function role() {
    return (currentUser()?.role || "").toLowerCase();
  }

  function readArray(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) && value.length ? value : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function readUsers() {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      return Array.isArray(users) ? users : [];
    } catch (error) {
      return [];
    }
  }

  function readStore(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function contactMessages() {
    return readStore("contactMessages").map((message) => ({
      id: message.id || message.messageId || `CM-${Date.now()}`,
      name: message.name || message.senderName || "Visitor",
      email: message.email || message.senderEmail || "",
      subject: message.subject || "General message",
      message: message.message || "",
      status: (message.status || "unread").toLowerCase(),
      createdAt: message.createdAt || message.submittedAt || new Date().toISOString(),
    }));
  }

  function roleRequests() {
    return readStore("roleRequests").map((request) => ({
      id: request.id || request.requestId || `RR-${Date.now()}`,
      userId: request.userId || request.userEmail || "",
      userName: request.userName || request.name || request.userEmail || "User",
      currentRole: request.currentRole || "lessee",
      requestedRole: request.requestedRole || "both",
      reason: request.reason || "Role update requested.",
      status: (request.status || "pending").toLowerCase(),
      createdAt: request.createdAt || new Date().toISOString(),
    }));
  }

  function listings() {
    return readStore("listings");
  }

  function statusBadge(status) {
    const normalized = (status || "").toLowerCase();
    const cls = normalized === "approved" || normalized === "read" || normalized === "active" ? "badge-active" : normalized === "rejected" ? "badge-dispute" : "badge-pending";
    return `<span class="badge-status ${cls}">${status}</span>`;
  }

  function adminRows() {
    const admins = readUsers().filter((user) => (user.role || "").toLowerCase() === "admin");
    return admins.length
      ? admins.map((admin) => [admin.fullname || admin.name || "Admin", admin.email, admin.role, admin.createdBy || "Super Admin"])
      : [["No admins yet", "Create the first admin account", "admin", "-"]];
  }

  function setAdminFormMessage(text, type) {
    const message = document.getElementById("create-admin-message");
    if (!message) return;
    message.textContent = text;
    message.className = `admin-form-message ${type === "success" ? "text-success" : "text-danger"}`;
    message.hidden = false;
  }

  function refreshAdminManagementTable() {
    const body = document.getElementById("admin-management-body");
    if (!body) return;
    body.innerHTML = adminRows()
      .map(
        (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}<td><button class="btn btn-sm btn-outline-custom me-1">Edit</button><button class="btn btn-sm btn-outline-danger">Delete</button></td></tr>`,
      )
      .join("");
  }

  function createAdminAccount(event) {
    event.preventDefault();
    const fullname = document.getElementById("new-admin-fullname")?.value.trim();
    const email = document.getElementById("new-admin-email")?.value.trim().toLowerCase();
    const password = document.getElementById("new-admin-password")?.value;
    const creator = currentUser();

    if (!fullname || !email || !password) {
      setAdminFormMessage("Full name, email, and password are required.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAdminFormMessage("Enter a valid email address.", "error");
      return;
    }

    const users = readUsers();
    if (users.some((user) => (user.email || "").toLowerCase() === email)) {
      setAdminFormMessage("An account with this email already exists.", "error");
      return;
    }

    const newAdmin = {
      id: Date.now(),
      fullname,
      email,
      password,
      role: "admin",
      createdBy: creator?.fullname || creator?.name || creator?.email || "Super Admin",
      createdAt: new Date().toISOString(),
    };

    try {
      users.push(newAdmin);
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      setAdminFormMessage("Could not save admin account. Please check browser storage.", "error");
      return;
    }

    event.target.reset();
    refreshAdminManagementTable();
    setAdminFormMessage("Admin account created successfully.", "success");
  }

  function installAdminManagementHandlers() {
    const form = document.getElementById("create-admin-form");
    if (form) form.addEventListener("submit", createAdminAccount);
  }

  function rerenderCurrentPage() {
    const currentPage = page();
    const mode = canRenderAdmin(currentPage);
    if (!mode) return;
    shell(mode, mode === "super" ? superContent(currentPage) : adminContent(currentPage));
    installAdminManagementHandlers();
    installManagementActions();
  }

  function updateListingStatus(id, status) {
    writeStore(
      "listings",
      listings().map((listing) => (listing.id === id ? { ...listing, status } : listing)),
    );
    rerenderCurrentPage();
  }

  function updateMessage(id, action) {
    const data = contactMessages();
    if (action === "view") {
      const message = data.find((entry) => entry.id === id);
      if (message) alert(`${message.subject}\n\n${message.message}`);
      return;
    }
    const next = action === "delete" ? data.filter((entry) => entry.id !== id) : data.map((entry) => (entry.id === id ? { ...entry, status: "read" } : entry));
    writeStore("contactMessages", next);
    rerenderCurrentPage();
  }

  function updateRoleRequest(id, action) {
    const requests = roleRequests();
    const request = requests.find((entry) => entry.id === id);
    if (!request) return;
    if (action === "view") {
      alert(`${request.userName}\n${request.currentRole} → ${request.requestedRole}\n\n${request.reason}`);
      return;
    }
    const nextRequests = requests.map((entry) => (entry.id === id ? { ...entry, status: action === "approve" ? "approved" : "rejected" } : entry));
    writeStore("roleRequests", nextRequests);

    if (action === "approve") {
      const users = readUsers().map((user) => {
        const matchById = String(user.id || "") === String(request.userId || "");
        const matchByEmail = (user.email || "").toLowerCase() === String(request.userId || "").toLowerCase();
        return matchById || matchByEmail ? { ...user, role: request.requestedRole } : user;
      });
      writeStore("users", users);
    }

    rerenderCurrentPage();
  }

  function installManagementActions() {
    if (managementActionsInstalled) return;
    managementActionsInstalled = true;
    document.addEventListener("click", (event) => {
      const listing = event.target.closest("[data-listing-action]");
      if (listing) {
        updateListingStatus(listing.dataset.id, listing.dataset.listingAction === "approve" ? "approved" : "rejected");
        return;
      }
      const message = event.target.closest("[data-message-action]");
      if (message) {
        updateMessage(message.dataset.id, message.dataset.messageAction);
        return;
      }
      const request = event.target.closest("[data-request-action]");
      if (request) {
        updateRoleRequest(request.dataset.id, request.dataset.requestAction);
      }
    });
  }

  function canRenderAdmin(currentPage) {
    const isAdminPage = Boolean(adminPages[currentPage]);
    const isSuperPage = Boolean(superPages[currentPage]);
    const userRole = role();

    if (isSuperPage) {
      if (currentPage === "role-requests.html" && ["admin", "supervisor"].includes(userRole)) return "admin";
      if (userRole === "superadmin") return "super";
      window.location.href = userRole === "admin" ? "dashboard.html" : "login.html";
      return "";
    }

    if (isAdminPage && ["admin", "superadmin", "supervisor"].includes(userRole)) {
      return currentPage === "dashboard.html" && userRole === "superadmin" ? "super" : "admin";
    }

    const protectedAdminOnly = ["users.html", "listings.html", "reports.html", "statistics.html", "settings.html"];
    if (protectedAdminOnly.includes(currentPage)) window.location.href = "login.html";
    return "";
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }

  function navItems(items, active) {
    const unreadMessages = contactMessages().filter((message) => message.status === "unread").length;
    const pendingRequests = roleRequests().filter((request) => request.status === "pending").length;
    return Object.entries(items)
      .map(([href, [icon, label]]) => {
        const count =
          ["messages.html", "contact-messages.html"].includes(href)
            ? unreadMessages
            : href === "role-requests.html"
              ? pendingRequests
              : 0;
        return `<a href="${href}" class="${href === active ? "active" : ""}"><i class="bi ${icon}"></i><span>${label}</span>${count ? `<b class="admin-nav-badge">${count}</b>` : ""}</a>`;
      })
      .join("");
  }

  function shell(type, content) {
    const isSuper = type === "super";
    const title = isSuper ? "Super Admin Control Center" : "Admin Management Panel";
    const subtitle = isSuper ? "Premium system control" : "Platform operations";
    const menu = isSuper ? superPages : adminPages;
    const active = page();
    document.body.className = `admin-console ${isSuper ? "super-console" : "ops-console"}`;
    document.body.innerHTML = `<input type="checkbox" id="admin-sidebar-toggle" class="admin-sidebar-check" aria-label="Toggle sidebar">
      <aside class="admin-console-sidebar">
        <div class="admin-console-brand"><i class="bi ${isSuper ? "bi-shield-shaded" : "bi-shield-lock"}"></i><div><strong>${title}</strong><span>${subtitle}</span></div></div>
        <nav>${navItems(menu, active)}</nav>
      </aside>
      <div class="admin-console-main">
        <header class="admin-console-topbar">
          <label for="admin-sidebar-toggle" class="btn btn-sm btn-outline-custom d-lg-none"><i class="bi bi-list"></i></label>
          <div><span class="admin-eyebrow">${isSuper ? "SUPER ADMIN" : "ADMIN"}</span><h1>${menu[active]?.[1] || "Dashboard"}</h1></div>
          <div class="admin-console-actions"><button class="theme-toggle-btn" type="button" data-admin-theme><i class="bi bi-moon-fill"></i></button><a href="index.html" class="btn btn-sm btn-outline-custom" onclick="localStorage.removeItem('currentUser')">Logout</a></div>
        </header>
        <main class="admin-console-content">${content}</main>
      </div>`;

    document.querySelector("[data-admin-theme]")?.addEventListener("click", () => {
      setTheme((document.documentElement.dataset.theme || "light") === "dark" ? "light" : "dark");
    });
    setTheme(localStorage.getItem("theme") || "light");
    window.CityRentI18n?.installLanguageControls();
    window.CityRentI18n?.refresh();
  }

  function statCards(cards) {
    return `<div class="admin-stat-grid">${cards.map(([label, value, icon]) => `<div class="admin-stat-card"><i class="bi ${icon}"></i><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>`;
  }

  function table(headers, rows, actions = "") {
    return `<div class="card card-custom admin-panel-card"><div class="table-responsive"><table class="table table-hover mb-0"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}${actions ? "<th>Actions</th>" : ""}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}${actions}</tr>`).join("")}</tbody></table></div></div>`;
  }

  function listingRows() {
    const data = listings();
    return data.length
      ? data.map((item) => [
          item.title || "Untitled",
          item.category || "General",
          `$${Number(item.price || 0).toFixed(0)}/day`,
          statusBadge(item.status || "pending"),
          item.ownerName || "Owner",
          item.id,
        ])
      : [["No listings", "Create listings from a lessor account", "-", statusBadge("pending"), "-", ""]];
  }

  function messageRows() {
    const data = contactMessages();
    return data.length
      ? data.map((message) => [
          message.name,
          message.email,
          message.subject,
          statusBadge(message.status),
          new Date(message.createdAt).toLocaleDateString(),
          message.id,
        ])
      : [["No messages", "-", "-", statusBadge("read"), "-", ""]];
  }

  function requestRows() {
    const data = roleRequests();
    return data.length
      ? data.map((request) => [
          request.userName,
          request.currentRole,
          request.requestedRole,
          request.reason,
          statusBadge(request.status),
          request.id,
        ])
      : [["No requests", "-", "-", "Role change requests will appear here.", statusBadge("pending"), ""]];
  }

  function renderListingsTable() {
    const rows = listingRows();
    return `<div class="admin-toolbar"><input class="form-control" placeholder="Search listings"><select class="form-select"><option>All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></select></div>
      <div class="card card-custom admin-panel-card"><div class="table-responsive"><table class="table table-hover mb-0">
        <thead><tr><th>Listing</th><th>Category</th><th>Price</th><th>Status</th><th>Owner</th><th>Actions</th></tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.slice(0, 5).map((cell) => `<td>${cell}</td>`).join("")}<td>${row[5] ? `<button class="btn btn-sm btn-success me-1" data-listing-action="approve" data-id="${row[5]}">Approve</button><button class="btn btn-sm btn-outline-danger" data-listing-action="reject" data-id="${row[5]}">Reject</button>` : "-"}</td></tr>`).join("")}</tbody>
      </table></div></div>`;
  }

  function renderMessagesTable() {
    const unread = contactMessages().filter((message) => message.status === "unread").length;
    const rows = messageRows();
    return `${statCards([["Total Messages", contactMessages().length, "bi-envelope"], ["Unread Messages", unread, "bi-bell"], ["Recent Messages", contactMessages().slice(-5).length, "bi-clock-history"]])}
      <div class="card card-custom admin-panel-card"><div class="table-responsive"><table class="table table-hover mb-0">
        <thead><tr><th>Sender</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.slice(0, 5).map((cell) => `<td>${cell}</td>`).join("")}<td>${row[5] ? `<button class="btn btn-sm btn-outline-custom me-1" data-message-action="view" data-id="${row[5]}">View</button><button class="btn btn-sm btn-primary-custom me-1" data-message-action="read" data-id="${row[5]}">Mark Read</button><button class="btn btn-sm btn-outline-danger" data-message-action="delete" data-id="${row[5]}">Delete</button>` : "-"}</td></tr>`).join("")}</tbody>
      </table></div></div>`;
  }

  function renderRequestsTable() {
    const requests = roleRequests();
    const pending = requests.filter((request) => request.status === "pending").length;
    const approved = requests.filter((request) => request.status === "approved").length;
    const rejected = requests.filter((request) => request.status === "rejected").length;
    const rows = requestRows();
    return `${statCards([["Pending Requests", pending, "bi-hourglass"], ["Approved Requests", approved, "bi-check-circle"], ["Rejected Requests", rejected, "bi-x-circle"]])}
      <div class="card card-custom admin-panel-card"><div class="table-responsive"><table class="table table-hover mb-0">
        <thead><tr><th>User</th><th>Current Role</th><th>Requested Role</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.slice(0, 5).map((cell) => `<td>${cell}</td>`).join("")}<td>${row[5] ? `<button class="btn btn-sm btn-outline-custom me-1" data-request-action="view" data-id="${row[5]}">View</button><button class="btn btn-sm btn-success me-1" data-request-action="approve" data-id="${row[5]}">Approve</button><button class="btn btn-sm btn-outline-danger" data-request-action="reject" data-id="${row[5]}">Reject</button>` : "-"}</td></tr>`).join("")}</tbody>
      </table></div></div>`;
  }

  function adminContent(currentPage) {
    const users = readArray("users", sampleUsers).map((u) => Array.isArray(u) ? u : [u.fullname || u.name || "User", u.email, u.role, "Active"]);
    const messages = contactMessages();
    const requestData = roleRequests();
    const listingData = listings();
    if (currentPage === "dashboard.html") return `${statCards([["Total Users", users.length, "bi-people"], ["Total Listings", listingData.length, "bi-box-seam"], ["Total Messages", messages.length, "bi-envelope"], ["Pending Requests", requestData.filter((r) => r.status === "pending").length, "bi-arrow-repeat"]])}<section class="admin-two-col"><div class="card card-custom admin-panel-card"><h2>Dashboard Overview</h2><p class="text-muted">Monitor listings, contact messages, role requests, and platform support workload.</p><div class="admin-chart-bars"><span style="height:60%"></span><span style="height:78%"></span><span style="height:45%"></span><span style="height:88%"></span><span style="height:70%"></span></div></div><div class="card card-custom admin-panel-card"><h2>Recent Activity</h2><ul class="admin-activity"><li>${listingData.length} listings in localStorage</li><li>${messages.filter((m) => m.status === "unread").length} unread contact messages</li><li>${requestData.filter((r) => r.status === "pending").length} pending role requests</li></ul></div></section>`;
    if (currentPage === "users.html") return `<div class="admin-toolbar"><input class="form-control" placeholder="Search users"><select class="form-select"><option>All roles</option><option>Lessee</option><option>Lessor</option><option>Both</option></select></div>${table(["Name", "Email", "Role", "Status"], users, '<td><button class="btn btn-sm btn-outline-custom">View</button></td>')}`;
    if (currentPage === "listings.html") return renderListingsTable();
    if (currentPage === "messages.html") return renderMessagesTable();
    if (currentPage === "role-requests.html") return renderRequestsTable();
    if (currentPage === "reports.html") return table(["Report ID", "Complaint", "Status"], sampleReports, '<td><button class="btn btn-sm btn-success">Resolve</button></td>');
    if (currentPage === "statistics.html") return `${statCards([["Listings", listingData.length, "bi-box-seam"], ["Approved", listingData.filter((l) => l.status === "approved").length, "bi-check-circle"], ["Messages", messages.length, "bi-envelope"], ["Requests", requestData.length, "bi-arrow-repeat"]])}<div class="card card-custom admin-panel-card"><h2>Platform Statistics</h2><div class="admin-chart-bars"><span style="height:45%"></span><span style="height:64%"></span><span style="height:82%"></span><span style="height:55%"></span><span style="height:96%"></span><span style="height:73%"></span></div></div>`;
    return `<div class="card card-custom admin-panel-card"><h2>Settings</h2><div class="row g-3"><div class="col-md-6"><label class="form-label">Platform Name</label><input class="form-control" value="CityRent"></div><div class="col-md-6"><label class="form-label">Support Email</label><input class="form-control" value="support@cityrent.com"></div><div class="col-12"><button class="btn btn-primary-custom">Save Settings</button></div></div></div>`;
  }

  function superContent(currentPage) {
    const users = readUsers();
    const admins = users.filter((u) => (u.role || "").toLowerCase() === "admin");
    const listingData = listings();
    const messages = contactMessages();
    const requests = roleRequests();
    const lessors = users.filter((u) => ["lessor", "both"].includes((u.role || "").toLowerCase())).length;
    const renters = users.filter((u) => ["lessee", "both"].includes((u.role || "").toLowerCase())).length;
    if (currentPage === "super-dashboard.html" || currentPage === "dashboard.html") return `${statCards([["Total Users", users.length || "0", "bi-people"], ["Total Admins", admins.length || "0", "bi-person-badge"], ["Total Listings", listingData.length, "bi-box-seam"], ["Pending Requests", requests.filter((r) => r.status === "pending").length, "bi-hourglass"]])}<section class="admin-two-col"><div class="card card-custom admin-panel-card"><h2>System Statistics</h2><div class="admin-chart-bars premium"><span style="height:80%"></span><span style="height:62%"></span><span style="height:92%"></span><span style="height:70%"></span></div></div><div class="card card-custom admin-panel-card"><h2>Recent Actions</h2><ul class="admin-activity"><li>${messages.length} contact messages stored</li><li>${requests.length} role requests stored</li><li>${listingData.length} listings tracked</li></ul></div></section><div class="admin-quick-actions"><a class="btn btn-primary-custom" href="admin-management.html">Create Admin</a><a class="btn btn-outline-custom" href="analytics.html">View Analytics</a><a class="btn btn-outline-custom" href="system-settings.html">System Settings</a></div>`;
    if (currentPage === "admin-management.html") return `<div class="card card-custom admin-panel-card"><h2>Create Admin</h2><form id="create-admin-form" class="row g-3" novalidate><div class="col-md-4"><label class="form-label" for="new-admin-fullname">Full Name</label><input id="new-admin-fullname" class="form-control" placeholder="Admin Name" required></div><div class="col-md-4"><label class="form-label" for="new-admin-email">Email</label><input id="new-admin-email" type="email" class="form-control" placeholder="admin@example.com" required></div><div class="col-md-4"><label class="form-label" for="new-admin-password">Password</label><input id="new-admin-password" type="password" class="form-control" placeholder="Password" required></div><div class="col-12"><p id="create-admin-message" class="admin-form-message" hidden></p><button type="submit" class="btn btn-primary-custom">Create Admin</button></div></form></div><div class="card card-custom admin-panel-card"><h2>Admin Accounts</h2><div class="table-responsive"><table class="table table-hover mb-0"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Created By</th><th>Actions</th></tr></thead><tbody id="admin-management-body">${adminRows().map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}<td><button class="btn btn-sm btn-outline-custom me-1">Edit</button><button class="btn btn-sm btn-outline-danger">Delete</button></td></tr>`).join("")}</tbody></table></div></div>`;
    if (currentPage === "role-requests.html") return renderRequestsTable();
    if (currentPage === "analytics.html") return `${statCards([["Total Listings", listingData.length, "bi-box-seam"], ["Total Messages", messages.length, "bi-envelope"], ["Total Requests", requests.length, "bi-arrow-repeat"], ["Total Users", users.length, "bi-people"], ["Total Lessors", lessors, "bi-shop"], ["Total Renters", renters, "bi-bag-check"]])}<div class="card card-custom admin-panel-card"><h2>Growth Statistics</h2><div class="admin-chart-bars premium"><span style="height:40%"></span><span style="height:58%"></span><span style="height:76%"></span><span style="height:88%"></span><span style="height:94%"></span></div></div>`;
    if (currentPage === "activity-logs.html") return table(["Time", "Actor", "Action"], [["Today", "Super Admin", "Created admin account"], ["Yesterday", "Admin User", "Resolved report"], ["Jun 13", "System", "Backup completed"]]);
    if (currentPage === "system-settings.html") return `<div class="row g-4"><div class="col-lg-4"><div class="card card-custom admin-panel-card"><h2>Platform Configuration</h2><input class="form-control mb-3" value="CityRent"><button class="btn btn-primary-custom">Save</button></div></div><div class="col-lg-4"><div class="card card-custom admin-panel-card"><h2>Theme Settings</h2><select class="form-select"><option>System Default</option><option>Light</option><option>Dark</option></select></div></div><div class="col-lg-4"><div class="card card-custom admin-panel-card"><h2>Security Settings</h2><div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Require strong passwords</label></div></div></div></div>`;
    if (currentPage === "contact-messages.html") return renderMessagesTable();
    if (currentPage === "user-management.html") return adminContent("users.html");
    if (currentPage === "listing-management.html") return renderListingsTable();
    return superContent("super-dashboard.html");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = page();
    const mode = canRenderAdmin(currentPage);
    if (!mode) return;
    shell(mode, mode === "super" ? superContent(currentPage) : adminContent(currentPage));
    installAdminManagementHandlers();
    installManagementActions();
  });
})();
