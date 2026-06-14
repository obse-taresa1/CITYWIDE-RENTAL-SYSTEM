(function () {
  function pendingRentalKey() {
    return "pendingRental";
  }

  function handleRent(itemId) {
    const button = document.querySelector("[data-rent-now]");
    if (button) {
      button.disabled = true;
      button.textContent = "Checking...";
    }

    const returnUrl = `item-details.html?id=${encodeURIComponent(itemId)}&action=rent`;

    if (!window.CityRentAuthGuard?.isAuthenticated()) {
      localStorage.setItem("redirectAfterLogin", returnUrl);
      localStorage.setItem(pendingRentalKey(), itemId);
      const message = document.querySelector("[data-auth-message]");
      if (message) message.hidden = false;
      window.location.href = "login.html";
      return;
    }

    const user = window.CityRentAuthGuard.getCurrentUser();
    localStorage.setItem(pendingRentalKey(), itemId);
    window.CityRentDashboardRouter.redirectToDashboardByRole(user.role, itemId);
  }

  function consumePendingRental() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("itemId");
    const action = params.get("action");
    let pendingItemId = localStorage.getItem(pendingRentalKey());

    if (itemId && action === "rent") {
      pendingItemId = itemId;
    }

    if (!pendingItemId) return;

    const notice = document.createElement("div");
    notice.className = "rental-start-notice card card-custom p-3 mb-4";
    notice.innerHTML = `<strong>Rental checkout ready.</strong><span> Starting booking flow for selected item.</span>
      <div class="mt-2 d-flex flex-wrap gap-2">
        <a class="btn btn-primary-custom btn-sm" href="booking.html?itemId=${encodeURIComponent(pendingItemId)}">Continue Checkout</a>
        <button type="button" class="btn btn-outline-primary btn-sm" data-complete-rental="${pendingItemId}">Mark Rental Completed</button>
        <a class="btn btn-outline-secondary btn-sm disabled" data-review-after-complete href="item-details.html?id=${encodeURIComponent(pendingItemId)}">Review Item</a>
      </div>`;

    const main = document.querySelector("main");
    if (main) main.insertAdjacentElement("afterbegin", notice);
    localStorage.removeItem(pendingRentalKey());
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      return null;
    }
  }

  function markCompleted(itemId) {
    const user = currentUser();
    if (!user) return;
    const userId = user.id || user.email;
    const rentals = JSON.parse(localStorage.getItem("completedRentals") || "[]");
    const exists = rentals.some(
      (rental) => rental.itemId === itemId && rental.userId === userId && rental.status === "completed",
    );

    if (!exists) {
      rentals.push({
        rentalId: `rental-${Date.now()}`,
        itemId,
        userId,
        status: "completed",
        completedAt: new Date().toISOString(),
      });
      localStorage.setItem("completedRentals", JSON.stringify(rentals));
    }
  }

  window.CityRentRentalFlow = {
    handleRent,
    consumePendingRental,
  };

  document.addEventListener("DOMContentLoaded", consumePendingRental);
  document.addEventListener("click", (event) => {
    const complete = event.target.closest("[data-complete-rental]");
    if (!complete) return;
    markCompleted(complete.dataset.completeRental);
    complete.textContent = "Rental Completed";
    complete.disabled = true;
    const reviewLink = document.querySelector("[data-review-after-complete]");
    if (reviewLink) reviewLink.classList.remove("disabled");
  });
})();
