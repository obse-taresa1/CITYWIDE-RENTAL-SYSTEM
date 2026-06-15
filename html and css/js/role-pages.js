(function () {
  const samples = {
    listings: [
      { id: "canon-eos-dslr-kit", title: "Canon EOS DSLR Kit", price: "ETB 6,000/day", status: "Active", views: 318, image: "images/canon.png" },
      { id: "toyota-rav4-2023", title: "Toyota RAV4 2023", price: "ETB 8,500/day", status: "Active", views: 420, image: "images/Toyota RAV4.jpg" },
      { id: "dewalt-power-drill-set", title: "DeWalt Power Drill Set", price: "ETB 2,300/day", status: "Pending", views: 144, image: "images/dewalt.png" },
    ],
    bookings: [
      { id: "B-1001", itemId: "canon-eos-dslr-kit", title: "Canon EOS DSLR Kit", lessor: "Sarah M.", renter: "Alex Rivera", dates: "Jun 15 - Jun 17", status: "Active", paymentMethod: "Telebirr", totalDue: 45500 },
      { id: "B-1002", itemId: "toyota-rav4-2023", title: "Toyota RAV4 2023", lessor: "AutoRent Co.", renter: "Jamie Lee", dates: "Jun 22 - Jun 25", status: "Upcoming", paymentMethod: "CBE Birr", totalDue: 81200 },
      { id: "B-0998", itemId: "dewalt-power-drill-set", title: "DeWalt Power Drill Set", lessor: "Mike T.", renter: "Alex Rivera", dates: "May 8 - May 10", status: "Completed", paymentMethod: "E-birr", totalDue: 18200 },
    ],
    favorites: [
      { id: "toyota-rav4-2023", title: "Toyota RAV4 2023", price: "ETB 8,500/day", image: "images/Toyota RAV4.jpg" },
      { id: "4k-home-theater-projector", title: "4K Home Theater Projector", price: "ETB 3,600/day", image: "images/projector.png" },
    ],
    messages: [
      { name: "Sarah M.", role: "Lessor", text: "The camera kit is available for your dates.", time: "2m", unread: 2 },
      { name: "Jamie Lee", role: "Renter", text: "Can I pick up the drill set tomorrow morning?", time: "18m", unread: 1 },
      { name: "AutoRent Co.", role: "Lessor", text: "Your booking request was approved.", time: "1h", unread: 0 },
    ],
    notifications: [
      { title: "Booking approved", text: "Toyota RAV4 booking was approved.", type: "Booking update" },
      { title: "New message", text: "Sarah M. replied to your camera inquiry.", type: "Message alert" },
      { title: "Listing status", text: "DeWalt Power Drill Set is now active.", type: "Listing update" },
    ],
  };

  function read(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return Array.isArray(value) && value.length ? value : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function user() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null") || {};
    } catch (error) {
      return {};
    }
  }

  function role() {
    return (user().role || "lessee").toLowerCase();
  }

  function page() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function main() {
    return document.querySelector("main");
  }

  function emptyState(title, text, href, label) {
    return `<div class="card card-custom p-4 text-center">
      <i class="bi bi-inbox text-accent-custom dashboard-empty-icon"></i>
      <h5>${title}</h5>
      <p class="text-muted">${text}</p>
      <a href="${href}" class="btn btn-primary-custom">${label}</a>
    </div>`;
  }

  function badge(status) {
    const cls = status === "Active" || status === "Completed" ? "badge-active" : "badge-pending";
    return `<span class="badge-status ${cls}">${status}</span>`;
  }

  function formatETB(amount) {
    return window.CityRentPaymentService?.formatETB(amount) || `ETB ${Number(amount || 0).toLocaleString("en-ET")}`;
  }

  function paymentInfo(item) {
    const method = item.paymentMethod || "Telebirr";
    const total = item.totalDue ? ` - ${formatETB(item.totalDue)}` : "";
    return `<p class="small mb-0"><strong>Payment Method:</strong> ${method}${total}</p>`;
  }

  function listingPrice(value) {
    if (typeof value === "number") return `${formatETB(value)}/day`;
    return value || `${formatETB(0)}/day`;
  }

  function renderBookingPage() {
    const target = main();
    if (!target) return;
    if (new URLSearchParams(window.location.search).get("itemId")) return;
    const bookings = read("bookings", samples.bookings);
    const isRequests = role() === "lessor" || window.location.hash === "#requests";
    const isHistory = window.location.hash === "#history";

    if (isRequests) {
      target.innerHTML = `<h1 class="h3 mb-4">Booking Requests</h1>
        <div class="card card-custom p-4">
          <div class="table-responsive"><table class="table table-hover mb-0">
            <thead><tr><th>Request</th><th>Renter</th><th>Dates</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>${bookings.map((item) => `<tr><td>${item.title}${paymentInfo(item)}</td><td>${item.renter || "Renter"}</td><td>${item.dates || `${item.startDate || "Not set"} - ${item.endDate || "Not set"}`}</td><td>${badge(item.status)}</td><td><button class="btn btn-sm btn-success me-1">Approve</button><button class="btn btn-sm btn-outline-danger">Reject</button></td></tr>`).join("")}</tbody>
          </table></div>
        </div>`;
      return;
    }

    const list = isHistory ? bookings.filter((item) => item.status === "Completed") : bookings.filter((item) => item.status !== "Completed");
    target.innerHTML = `<h1 class="h3 mb-4">${isHistory ? "Booking History" : "My Bookings"}</h1>
      ${list.length ? `<div class="row g-4">${list.map((item) => `<div class="col-md-6"><div class="card card-custom p-4 h-100"><div class="d-flex justify-content-between gap-3"><div><h5>${item.title}</h5><p class="text-muted mb-1">${item.dates || `${item.startDate || "Not set"} - ${item.endDate || "Not set"}`}</p><p class="small mb-0">Lessor: ${item.lessor || "CityRent owner"}</p>${paymentInfo(item)}</div>${badge(item.status)}</div><div class="mt-3 d-flex gap-2 flex-wrap"><a class="btn btn-sm btn-outline-custom" href="item-details.html?id=${item.itemId}">Details</a>${isHistory ? `<a class="btn btn-sm btn-primary-custom" href="item-details.html?id=${item.itemId}">Review</a>` : `<button class="btn btn-sm btn-outline-danger">Cancel Booking</button>`}</div></div></div>`).join("")}</div>` : emptyState("No bookings yet", "Start with Browse Listings and book your first rental.", "items.html", "Browse Listings")}`;
  }

  function renderListingDashboard() {
    const target = main();
    if (!target || page() !== "dashboard.html") return;
    const listings = read("listings", samples.listings);
    if (window.location.hash === "#statistics") {
      target.innerHTML = `<h1 class="h3 mb-4">Listing Statistics</h1>
        <div class="dashboard-cards mb-4">
          <div class="card card-custom stat-card"><div class="stat-icon blue"><i class="bi bi-eye"></i></div><div><p class="text-muted mb-0 small">Total Views</p><h3>${listings.reduce((sum, item) => sum + Number(item.views || 0), 0)}</h3></div></div>
          <div class="card card-custom stat-card"><div class="stat-icon green"><i class="bi bi-calendar-check"></i></div><div><p class="text-muted mb-0 small">Booking Rate</p><h3>68%</h3></div></div>
          <div class="card card-custom stat-card"><div class="stat-icon orange"><i class="bi bi-star"></i></div><div><p class="text-muted mb-0 small">Avg Rating</p><h3>4.8</h3></div></div>
        </div>
        <div class="card card-custom p-4">
          <h5 class="mb-3">Popular Listings</h5>
          <div class="table-responsive"><table class="table table-hover mb-0">
            <thead><tr><th>Listing</th><th>Views</th><th>Bookings</th><th>Performance</th></tr></thead>
            <tbody>${listings.map((item, index) => `<tr><td>${item.title}</td><td>${item.views}</td><td>${8 - index}</td><td>${badge(index === 0 ? "Active" : "Pending")}</td></tr>`).join("")}</tbody>
          </table></div>
        </div>`;
      return;
    }

    target.innerHTML = `<h1 class="h3 mb-4">My Listings</h1>
      <div class="dashboard-cards mb-4">
        <div class="card card-custom stat-card"><div class="stat-icon blue"><i class="bi bi-box-seam"></i></div><div><p class="text-muted mb-0 small">Total Listings</p><h3>${listings.length}</h3></div></div>
        <div class="card card-custom stat-card"><div class="stat-icon green"><i class="bi bi-eye"></i></div><div><p class="text-muted mb-0 small">Listing Views</p><h3>${listings.reduce((sum, item) => sum + Number(item.views || 0), 0)}</h3></div></div>
        <div class="card card-custom stat-card"><div class="stat-icon orange"><i class="bi bi-cash-coin"></i></div><div><p class="text-muted mb-0 small">Monthly Earnings</p><h3>ETB 109,200</h3></div></div>
      </div>
      ${listings.length ? `<div class="row g-4">${listings.map((item) => `<div class="col-md-6 col-xl-4"><article class="card card-custom dashboard-listing-card h-100"><img src="${item.image}" alt="${item.title}"><div class="p-3"><div class="d-flex justify-content-between align-items-start gap-2"><h5>${item.title}</h5>${badge(item.status)}</div><p class="text-primary-custom fw-bold">${listingPrice(item.price)}</p><div class="d-flex gap-2"><a href="item-details.html?id=${item.id}" class="btn btn-sm btn-outline-custom">View</a><button class="btn btn-sm btn-primary-custom">Edit</button><button class="btn btn-sm btn-outline-danger">Delete</button></div></div></article></div>`).join("")}</div>` : emptyState("No listings yet", "Create your first listing and start receiving rental requests.", "list-item.html", "Create First Listing")}`;
  }

  function renderFavorites() {
    if (page() !== "items.html" || window.location.hash !== "#favorites") return;
    const container = document.querySelector(".section-listings .container");
    if (!container || document.querySelector("[data-favorites-panel]")) return;
    const favorites = read("favorites", samples.favorites);
    container.insertAdjacentHTML("afterbegin", `<div class="card card-custom p-4 mb-4" data-favorites-panel><div class="d-flex justify-content-between align-items-center mb-3"><div><span class="section-label">SAVED ITEMS</span><h2 class="h4 mb-0">Wishlist/Favorites</h2></div><a href="items.html" class="btn btn-outline-custom btn-sm">Browse Listings</a></div>${favorites.length ? `<div class="row g-3">${favorites.map((item) => `<div class="col-md-6"><div class="favorite-row"><img src="${item.image}" alt="${item.title}"><div><strong>${item.title}</strong><p class="text-muted mb-0">${listingPrice(item.price)}</p></div><div class="ms-auto d-flex gap-2"><a href="item-details.html?id=${item.id}" class="btn btn-sm btn-primary-custom">Book</a><button class="btn btn-sm btn-outline-danger">Remove</button></div></div></div>`).join("")}</div>` : emptyState("No saved items", "Save listings you want to rent later.", "items.html", "Browse Listings")}</div>`);
  }

  function renderMessages() {
    if (page() !== "messages.html") return;
    const target = main();
    const messages = read("messages", samples.messages);
    if (!target) return;
    const heading = role() === "lessor" ? "Messages from Renters" : role() === "both" ? "Unified Messaging Center" : "Messages with Lessors";
    target.innerHTML = `<h1 class="h4 mb-3">${heading}</h1><div class="chat-container"><aside class="chat-sidebar"><div class="p-3 border-bottom"><input type="search" class="form-control form-control-sm" placeholder="Search conversations..."></div><div class="chat-user-list">${messages.map((item, index) => `<div class="chat-user-item ${index === 0 ? "active" : ""}"><div class="chat-avatar">${item.name.charAt(0)}</div><div class="flex-grow-1 min-width-0"><strong class="d-block">${item.name}</strong><small class="text-muted text-truncate d-block">${item.text}</small></div>${item.unread ? `<span class="badge bg-danger">${item.unread}</span>` : `<small class="text-muted">${item.time}</small>`}</div>`).join("")}</div></aside><section class="chat-main"><div class="chat-header"><div><strong>${messages[0]?.name || "Conversation"}</strong><small class="text-muted d-block">${messages[0]?.role || "CityRent user"}</small></div></div><div class="chat-messages"><div class="message-bubble received">${messages[0]?.text || "No messages yet."}</div><div class="message-bubble sent">Thanks, I will follow up through CityRent.</div></div><div class="chat-input-area"><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-paperclip"></i></button><input type="text" class="form-control" placeholder="Type a message..."><button class="btn btn-primary-custom"><i class="bi bi-send-fill"></i></button></div></section></div>`;
  }

  function renderProfile() {
    if (page() !== "profile.html") return;
    const target = main();
    const account = user();
    if (!target) return;

    if (window.location.hash === "#earnings") {
      target.innerHTML = `<h1 class="h3 mb-4">Earnings</h1>
        <div class="dashboard-cards mb-4">
          <div class="card card-custom stat-card"><div class="stat-icon blue"><i class="bi bi-cash-coin"></i></div><div><p class="text-muted mb-0 small">Revenue Summary</p><h3>ETB 369,200</h3></div></div>
          <div class="card card-custom stat-card"><div class="stat-icon green"><i class="bi bi-graph-up"></i></div><div><p class="text-muted mb-0 small">Monthly Earnings</p><h3>ETB 109,200</h3></div></div>
          <div class="card card-custom stat-card"><div class="stat-icon orange"><i class="bi bi-calendar-check"></i></div><div><p class="text-muted mb-0 small">Booking Income</p><h3>24</h3></div></div>
        </div>
        <div class="card card-custom p-4">
          <h5 class="mb-3">Booking Income Statistics</h5>
          <div class="table-responsive"><table class="table table-hover mb-0">
            <thead><tr><th>Month</th><th>Bookings</th><th>Income</th><th>Status</th></tr></thead>
            <tbody><tr><td>June</td><td>8</td><td>ETB 109,200</td><td>${badge("Active")}</td></tr><tr><td>May</td><td>11</td><td>ETB 158,600</td><td>${badge("Completed")}</td></tr><tr><td>April</td><td>5</td><td>ETB 101,400</td><td>${badge("Completed")}</td></tr></tbody>
          </table></div>
        </div>`;
      return;
    }

    target.innerHTML = `<h1 class="h3 mb-4">Profile Settings</h1><div class="row g-4"><div class="col-lg-4"><div class="card card-custom p-4 text-center"><img src="https://i.pravatar.cc/120?img=33" alt="Profile" class="profile-avatar mx-auto mb-3"><h5>${account.name || account.fullName || "CityRent User"}</h5><p class="text-muted mb-3">${account.email || "user@cityrent.com"}</p><button class="btn btn-outline-custom">Change Profile Picture</button></div></div><div class="col-lg-8"><div class="card card-custom p-4 mb-4"><h5>Personal Information</h5><div class="row g-3"><div class="col-md-6"><label class="form-label">Full Name</label><input class="form-control" value="${account.name || account.fullName || ""}"></div><div class="col-md-6"><label class="form-label">Email</label><input class="form-control" value="${account.email || ""}"></div><div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" placeholder="+1 (555) 000-0000"></div><div class="col-md-6"><label class="form-label">Role</label><input class="form-control" value="${role()}" disabled></div></div></div><div class="card card-custom p-4 mb-4"><h5>Change Password</h5><div class="row g-3"><div class="col-md-6"><input type="password" class="form-control" placeholder="New password"></div><div class="col-md-6"><input type="password" class="form-control" placeholder="Confirm password"></div></div></div>${role() === "lessor" || role() === "both" ? `<div class="card card-custom p-4 mb-4"><h5>Business Information</h5><input class="form-control mb-3" placeholder="Business name"><textarea class="form-control" rows="3" placeholder="Pickup policy or business notes"></textarea></div>` : `<div class="card card-custom p-4 mb-4"><h5>Account Settings</h5><div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Email booking updates</label></div><div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Message notifications</label></div></div>`}<div class="card card-custom p-4"><h5>Request Role Change</h5><form data-role-request-form class="row g-3"><div class="col-md-6"><label class="form-label">Requested Role</label><select class="form-select" name="requestedRole"><option value="lessee">Renter</option><option value="lessor">Lessor</option><option value="both">Both</option></select></div><div class="col-md-6"><label class="form-label">Reason</label><input class="form-control" name="reason" placeholder="Why do you need this role?"></div><div class="col-12"><button class="btn btn-primary-custom" type="submit">Submit Request</button><p class="small mt-2 mb-0" data-role-request-message></p></div></form></div></div></div>`;
  }

  function saveRoleRequest(event) {
    const form = event.target;
    if (!form.matches("[data-role-request-form]")) return;
    event.preventDefault();
    const account = user();
    const requests = read("roleRequests", []);
    const formData = new FormData(form);
    requests.push({
      id: `RR-${Date.now()}`,
      userId: account.id || account.email || "",
      userName: account.fullname || account.name || account.email || "CityRent user",
      currentRole: role(),
      requestedRole: formData.get("requestedRole"),
      reason: formData.get("reason") || "No reason provided.",
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("roleRequests", JSON.stringify(requests));
    form.reset();
    const message = document.querySelector("[data-role-request-message]");
    if (message) {
      message.className = "small mt-2 mb-0 text-success";
      message.textContent = "Role change request sent to admin.";
    }
  }

  function renderNotifications() {
    if (page() !== "notifications.html") return;
    const target = main();
    const notifications = read("notifications", samples.notifications);
    if (!target) return;
    target.innerHTML = `<h1 class="h3 mb-4">Notifications</h1><div class="row g-3">${notifications.map((item) => `<div class="col-lg-6"><div class="card card-custom p-4 h-100"><span class="badge-status badge-pending mb-2">${item.type}</span><h5>${item.title}</h5><p class="text-muted mb-0">${item.text}</p></div></div>`).join("")}</div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (["admin", "superadmin", "supervisor"].includes(role())) return;
    renderBookingPage();
    renderListingDashboard();
    renderFavorites();
    renderMessages();
    renderProfile();
    renderNotifications();
  });
  document.addEventListener("submit", saveRoleRequest);
})();
