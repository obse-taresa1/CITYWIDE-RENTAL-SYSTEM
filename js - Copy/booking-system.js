(function () {
  const itemTitles = {
    "canon-eos-dslr-kit": "Canon EOS DSLR Kit",
    "toyota-rav4-2023": "Toyota RAV4 2023",
    "dewalt-power-drill-set": "DeWalt Power Drill Set",
    "gaming-laptop-rtx-4070": "Gaming Laptop RTX 4070",
    "4k-home-theater-projector": "4K Home Theater Projector",
  };

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

  function canBook() {
    return ["renter", "lessee", "both"].includes(role());
  }

  function readBookings() {
    try {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      return Array.isArray(bookings) ? bookings : [];
    } catch (error) {
      return [];
    }
  }

  function writeBookings(bookings) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  function pendingItemId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("itemId") || localStorage.getItem("pendingRental") || "";
  }

  function itemTitle(itemId) {
    return itemTitles[itemId] || "Selected rental item";
  }

  function userBookings() {
    const user = currentUser();
    const id = user?.id || user?.email || "";
    return readBookings().filter((booking) => booking.userId === id);
  }

  function markBookingCompleted(bookingId) {
    const user = currentUser();
    const userId = user?.id || user?.email || "";
    let completedItemId = "";
    const nextBookings = readBookings().map((booking) => {
      if (booking.id !== bookingId) return booking;
      completedItemId = booking.itemId;
      return { ...booking, status: "Completed", completedAt: new Date().toISOString() };
    });
    writeBookings(nextBookings);

    if (completedItemId) {
      let rentals = [];
      try {
        rentals = JSON.parse(localStorage.getItem("completedRentals") || "[]");
      } catch (error) {
        rentals = [];
      }
      const exists = rentals.some(
        (rental) => rental.itemId === completedItemId && rental.userId === userId && rental.status === "completed",
      );
      if (!exists) {
        rentals.push({
          rentalId: bookingId,
          itemId: completedItemId,
          userId,
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        localStorage.setItem("completedRentals", JSON.stringify(rentals));
      }
    }
  }

  function dashboardBookingPanel() {
    if (!["lessee-dashboard.html", "both-dashboard.html"].some((page) => window.location.pathname.endsWith(page))) return;
    if (!canBook()) return;
    const main = document.querySelector("main");
    if (!main || document.querySelector("[data-dashboard-booking-panel]")) return;

    const itemId = pendingItemId();
    const bookings = userBookings();
    const rows = bookings.length
      ? bookings
          .slice(-3)
          .reverse()
          .map((booking) => {
            const isCompleted = String(booking.status).toLowerCase() === "completed";
            return `<tr>
              <td>${booking.title}</td>
              <td>${booking.startDate || "Not set"} - ${booking.endDate || "Not set"}</td>
              <td><span class="badge-status badge-active">${booking.status}</span></td>
              <td>
                ${
                  isCompleted
                    ? `<a class="btn btn-sm btn-primary-custom" href="item-details.html?id=${encodeURIComponent(booking.itemId)}">Review</a>`
                    : `<button class="btn btn-sm btn-outline-custom" data-complete-booking="${booking.id}">Mark Completed</button>`
                }
              </td>
            </tr>`;
          })
          .join("")
      : `<tr><td colspan="4" class="text-muted">No bookings yet. Browse listings and start your first booking.</td></tr>`;

    main.insertAdjacentHTML(
      "afterbegin",
      `<section class="card card-custom p-4 mb-4" data-dashboard-booking-panel>
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <span class="section-label">BOOKING CENTER</span>
            <h2 class="h5 mb-1">${itemId ? "Continue Your Booking" : "Start a Booking"}</h2>
            <p class="text-muted mb-0">${itemId ? itemTitle(itemId) : "Renters and both-role users can book items from here."}</p>
          </div>
          <div class="d-flex flex-wrap gap-2">
            ${itemId ? `<a class="btn btn-primary-custom" href="booking.html?itemId=${encodeURIComponent(itemId)}"><i class="bi bi-calendar-check"></i> Continue Booking</a>` : ""}
            <a class="btn btn-outline-custom" href="items.html"><i class="bi bi-search"></i> Browse Listings</a>
          </div>
        </div>
        <div class="table-responsive mt-4">
          <table class="table table-hover mb-0">
            <thead><tr><th>Item</th><th>Dates</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`,
    );
  }

  function hydrateBookingPage() {
    if (!window.location.pathname.endsWith("booking.html")) return;
    if (!canBook()) return;
    const itemId = pendingItemId() || "canon-eos-dslr-kit";
    localStorage.setItem("pendingRental", itemId);
    const title = itemTitle(itemId);
    const heading = document.querySelector(".card-custom h5");
    if (heading) heading.textContent = title;

    const confirm = document.querySelector('a[href="#booking-confirmed"]');
    confirm?.addEventListener("click", () => {
      const user = currentUser();
      const bookings = readBookings();
      bookings.push({
        id: `B-${Date.now()}`,
        itemId,
        title,
        userId: user?.id || user?.email || "",
        renter: user?.fullname || user?.name || user?.email || "Renter",
        startDate: document.getElementById("start-date")?.value || "",
        endDate: document.getElementById("end-date")?.value || "",
        status: "Active",
        createdAt: new Date().toISOString(),
      });
      writeBookings(bookings);
      localStorage.removeItem("pendingRental");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    dashboardBookingPanel();
    hydrateBookingPage();
  });
  document.addEventListener("click", (event) => {
    const complete = event.target.closest("[data-complete-booking]");
    if (!complete) return;
    markBookingCompleted(complete.dataset.completeBooking);
    dashboardBookingPanel();
    window.location.reload();
  });
})();
