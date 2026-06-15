(function () {
  const catalog = {
    "canon-eos-dslr-kit": { title: "Canon EOS DSLR Kit", pricePerDay: 6000, deposit: 26000, location: "Addis Ababa", image: "images/canon.png" },
    "toyota-rav4-2023": { title: "Toyota RAV4 2023", pricePerDay: 8500, deposit: 45500, location: "Addis Ababa", image: "images/Toyota RAV4.jpg" },
    "dewalt-power-drill-set": { title: "DeWalt Power Drill Set", pricePerDay: 2300, deposit: 10400, location: "Bole", image: "images/dewalt.png" },
    "gaming-laptop-rtx-4070": { title: "Gaming Laptop RTX 4070", pricePerDay: 4500, deposit: 39000, location: "Kazanchis", image: "images/pc.png" },
    "4k-home-theater-projector": { title: "4K Home Theater Projector", pricePerDay: 3600, deposit: 19500, location: "Piassa", image: "images/projector.png" },
    "electric-pressure-washer": { title: "Electric Pressure Washer", pricePerDay: 2800, deposit: 13000, location: "Megenagna", image: "images/waterpp.png" },
    "gopro-hero-12": { title: "GoPro Hero 12", pricePerDay: 3200, deposit: 13000, location: "Addis Ababa", image: "images/catag360.png" },
    "sony-mirrorless-kit": { title: "Sony Mirrorless Kit", pricePerDay: 7800, deposit: 31200, location: "Addis Ababa", image: "images/catagsony.png" },
    "50mm-prime-lens": { title: "50mm Prime Lens", pricePerDay: 2000, deposit: 7800, location: "Addis Ababa", image: "images/catagsony4k.png" },
    "portable-lighting-kit": { title: "Portable Lighting Kit", pricePerDay: 2300, deposit: 9400, location: "Addis Ababa", image: "images/catagkit.png" },
    "360-action-camera": { title: "360 Action Camera", pricePerDay: 3900, deposit: 15600, location: "Addis Ababa", image: "images/catag360.png" },
    "55-smart-tv-4k": { title: '55" Smart TV 4K', pricePerDay: 5200, deposit: 20800, location: "Addis Ababa", image: "images/electrotv.png" },
    "portable-bluetooth-speaker": { title: "Portable Bluetooth Speaker", pricePerDay: 1000, deposit: 5200, location: "Addis Ababa", image: "images/electrospkear.png" },
    "noise-cancelling-headphones": { title: "Noise-Cancelling Headphones", pricePerDay: 1500, deposit: 6200, location: "Addis Ababa", image: "images/electroheadset.png" },
    "modern-sectional-sofa": { title: "Modern Sectional Sofa", pricePerDay: 7200, deposit: 32500, location: "Addis Ababa", image: "images/furnsofa.png" },
    "standing-desk-adjustable": { title: "Standing Desk Adjustable", pricePerDay: 1500, deposit: 6200, location: "Addis Ababa", image: "images/furndesk.png" },
    "solid-wood-dining-table": { title: "Solid Wood Dining Table", pricePerDay: 5200, deposit: 20800, location: "Addis Ababa", image: "images/furndinning.png" },
    "leather-armchair": { title: "Leather Armchair", pricePerDay: 2300, deposit: 9400, location: "Addis Ababa", image: "images/furnchair.png" },
    "open-bookshelf": { title: "Open Bookshelf", pricePerDay: 1300, deposit: 5200, location: "Addis Ababa", image: "images/furnshelf.png" },
    "mountain-bike-pro": { title: "Mountain Bike Pro", pricePerDay: 2000, deposit: 15600, location: "Entoto", image: "images/sportbick.png" },
    "golf-set": { title: "Golf set", pricePerDay: 2600, deposit: 10400, location: "Addis Ababa", image: "images/sportgolf.png" },
    "single-kayak": { title: "Single Kayak", pricePerDay: 2800, deposit: 11400, location: "Addis Ababa", image: "images/sportkeay.png" },
    "stand-up-paddleboard": { title: "Stand-Up Paddleboard", pricePerDay: 2300, deposit: 9400, location: "Addis Ababa", image: "images/sportpandel.png" },
    "climbing-gear-set": { title: "Climbing Gear Set", pricePerDay: 3200, deposit: 13000, location: "Addis Ababa", image: "images/sportclim.png" },
    "electric-lawn-mower": { title: "Electric Lawn Mower", pricePerDay: 3900, deposit: 15600, location: "Addis Ababa", image: "images/toollaw.png" },
    "circular-saw-pro": { title: "Circular Saw Pro", pricePerDay: 2600, deposit: 10400, location: "Addis Ababa", image: "images/toolsaw.png" },
    "orbital-sander": { title: "Orbital Sander", pricePerDay: 1300, deposit: 5200, location: "Addis Ababa", image: "images/toolorbit.png" },
    "honda-civic-2022": { title: "Honda Civic 2022", pricePerDay: 6000, deposit: 26000, location: "Addis Ababa", image: "images/vehhonda.png" },
    "ford-transit-van": { title: "Ford Transit Van", pricePerDay: 10400, deposit: 41600, location: "Addis Ababa", image: "images/vehford.png" },
    "mini-cooper-2020": { title: "Mini Cooper 2020", pricePerDay: 6500, deposit: 26000, location: "Addis Ababa", image: "images/vehcooper.png" },
    "7-seater-suv": { title: "7-Seater SUV", pricePerDay: 11700, deposit: 46800, location: "Addis Ababa", image: "images/vehsvu.png" },
  };

  let activeSummary = null;

  function formatETB(amount) {
    return window.CityRentPaymentService?.formatETB(amount) || `ETB ${Number(amount || 0).toLocaleString("en-ET")}`;
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

  function itemFor(itemId) {
    return catalog[itemId] || catalog["canon-eos-dslr-kit"];
  }

  function t(value) {
    return window.CityRentI18n?.t(value) || value;
  }

  function daysBetween() {
    const start = document.getElementById("start-date")?.value;
    const end = document.getElementById("end-date")?.value;
    if (!start || !end) return 1;
    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);
    const days = Math.ceil((endDate - startDate) / 86400000);
    return Math.max(days, 1);
  }

  function selectedPaymentMethod() {
    return document.querySelector('input[name="payment"]:checked')?.value || "Telebirr";
  }

  function buildSummary(item) {
    const days = daysBetween();
    const rentalTotal = item.pricePerDay * days;
    const serviceFee = Math.round(rentalTotal * 0.1);
    const tax = Math.round(rentalTotal * 0.15);
    const totalDue = rentalTotal + serviceFee + tax + item.deposit;
    return { days, rentalTotal, serviceFee, tax, totalDue, item };
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  }

  function updateSummary(item) {
    activeSummary = buildSummary(item);
    setText("[data-summary-rental-label]", `${formatETB(item.pricePerDay)} x ${activeSummary.days} day${activeSummary.days === 1 ? "" : "s"}`);
    setText("[data-summary-rental-total]", formatETB(activeSummary.rentalTotal));
    setText("[data-summary-service-fee]", formatETB(activeSummary.serviceFee));
    setText("[data-summary-tax]", formatETB(activeSummary.tax));
    setText("[data-summary-deposit]", formatETB(item.deposit));
    setText("[data-summary-total]", formatETB(activeSummary.totalDue));
  }

  function userBookings() {
    const user = currentUser();
    const id = user?.id || user?.email || "";
    return readBookings().filter((booking) => booking.userId === id);
  }

  function bookingPaymentDetails(booking) {
    const paymentMethod = booking.paymentMethod || "Telebirr";
    const total = booking.totalDue ? ` - ${formatETB(booking.totalDue)}` : "";
    return `<p class="small mb-0"><strong>Payment Method:</strong> ${paymentMethod}${total}</p>`;
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
              <td>${booking.title}${bookingPaymentDetails(booking)}</td>
              <td>${booking.startDate || "Not set"} - ${booking.endDate || "Not set"}</td>
              <td><span class="badge-status badge-active">${t(booking.status)}</span></td>
              <td>
                ${
                  isCompleted
                    ? `<a class="btn btn-sm btn-primary-custom" href="item-details.html?id=${encodeURIComponent(booking.itemId)}">${t("Review")}</a>`
                    : `<button class="btn btn-sm btn-outline-custom" data-complete-booking="${booking.id}">${t("Mark Completed")}</button>`
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
            <h2 class="h5 mb-1">${itemId ? t("Continue Booking") : t("Start a Booking")}</h2>
            <p class="text-muted mb-0">${itemId ? itemFor(itemId).title : "Renters and both-role users can book items from here."}</p>
          </div>
          <div class="d-flex flex-wrap gap-2">
            ${itemId ? `<a class="btn btn-primary-custom" href="booking.html?itemId=${encodeURIComponent(itemId)}"><i class="bi bi-calendar-check"></i> ${t("Continue Booking")}</a>` : ""}
            <a class="btn btn-outline-custom" href="items.html"><i class="bi bi-search"></i> ${t("Browse Listings")}</a>
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
    window.CityRentI18n?.refresh();
  }

  function hydrateBookingPage() {
    if (!window.location.pathname.endsWith("booking.html")) return;
    if (!canBook()) return;
    const itemId = pendingItemId() || "canon-eos-dslr-kit";
    localStorage.setItem("pendingRental", itemId);
    const item = itemFor(itemId);

    setText("[data-booking-item-title]", item.title);
    setText("[data-booking-item-meta]", `${formatETB(item.pricePerDay)}/day - ${item.location}`);
    const image = document.querySelector("[data-booking-item-image]");
    if (image) image.src = item.image;
    updateSummary(item);

    document.getElementById("start-date")?.addEventListener("change", () => updateSummary(item));
    document.getElementById("end-date")?.addEventListener("change", () => updateSummary(item));

    const confirm = document.querySelector("[data-confirm-booking]");
    confirm?.addEventListener("click", async () => {
      const user = currentUser();
      const bookings = readBookings();
      const paymentMethod = selectedPaymentMethod();
      const bookingId = `B-${Date.now()}`;
      const paymentMessage = document.querySelector("[data-payment-message]");
      const summary = activeSummary || buildSummary(item);

      confirm.disabled = true;
      if (paymentMessage) {
        paymentMessage.className = "small mt-3 mb-0 text-muted";
        paymentMessage.textContent = `Processing ${paymentMethod} payment...`;
      }

      try {
        const payment = await window.CityRentPaymentService.processPayment(paymentMethod, {
          amount: summary.totalDue,
          bookingId,
        });

        bookings.push({
          id: bookingId,
          itemId,
          title: item.title,
          userId: user?.id || user?.email || "",
          renter: user?.fullname || user?.name || user?.email || "Renter",
          startDate: document.getElementById("start-date")?.value || "",
          endDate: document.getElementById("end-date")?.value || "",
          status: "Active",
          paymentMethod,
          paymentTransactionId: payment.transactionId,
          currency: "ETB",
          locale: "Ethiopia",
          pricePerDay: item.pricePerDay,
          rentalDays: summary.days,
          rentalTotal: summary.rentalTotal,
          serviceFee: summary.serviceFee,
          tax: summary.tax,
          deposit: item.deposit,
          totalDue: summary.totalDue,
          createdAt: new Date().toISOString(),
        });
        writeBookings(bookings);
        localStorage.removeItem("pendingRental");

        setText("[data-success-payment-method]", paymentMethod);
        setText("[data-success-total]", formatETB(summary.totalDue));
        if (paymentMessage) {
          paymentMessage.className = "small mt-3 mb-0 text-success";
          paymentMessage.textContent = `${paymentMethod} payment successful.`;
        }
        window.location.hash = "booking-confirmed";
        window.CityRentI18n?.refresh();
      } catch (error) {
        confirm.disabled = false;
        if (paymentMessage) {
          paymentMessage.className = "small mt-3 mb-0 text-danger";
          paymentMessage.textContent = error.message || "Payment failed. Please try again.";
        }
      }
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
