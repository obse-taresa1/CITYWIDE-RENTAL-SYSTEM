(function () {
  const STORE_KEY = "itemReviews";
  const COMPLETED_KEY = "completedRentals";

  const defaults = {
    "canon-eos-dslr-kit": [
      { reviewId: "rv-1", userId: "seed-sarah", userName: "Sarah", stars: 5, comment: "Great item and clean.", date: "2026-06-13", hidden: false },
      { reviewId: "rv-2", userId: "seed-john", userName: "John", stars: 4, comment: "Good experience.", date: "2026-06-12", hidden: false },
    ],
    "toyota-rav4-2023": [
      { reviewId: "rv-3", userId: "seed-maya", userName: "Maya", stars: 5, comment: "Smooth pickup and very clean vehicle.", date: "2026-06-10", hidden: false },
    ],
    "dewalt-power-drill-set": [
      { reviewId: "rv-4", userId: "seed-lee", userName: "Lee", stars: 5, comment: "Worked perfectly for my project.", date: "2026-06-09", hidden: false },
    ],
  };

  function readStore() {
    try {
      const store = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (store && typeof store === "object") return store;
    } catch (error) {
      localStorage.removeItem(STORE_KEY);
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(defaults));
    return JSON.parse(JSON.stringify(defaults));
  }

  function writeStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      return null;
    }
  }

  function userId(user) {
    return user?.id || user?.email || "";
  }

  function completedRentals() {
    try {
      return JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");
    } catch (error) {
      return [];
    }
  }

  function hasCompletedRental(itemId, user) {
    const id = userId(user);
    const completedFromRentals = completedRentals().some(
      (rental) => rental.itemId === itemId && rental.userId === id && rental.status === "completed",
    );
    let completedFromBookings = false;
    try {
      completedFromBookings = JSON.parse(localStorage.getItem("bookings") || "[]").some(
        (booking) => booking.itemId === itemId && booking.userId === id && String(booking.status).toLowerCase() === "completed",
      );
    } catch (error) {
      completedFromBookings = false;
    }
    return completedFromRentals || completedFromBookings;
  }

  function visibleReviews(itemId) {
    return (readStore()[itemId] || []).filter((review) => !review.hidden);
  }

  function allReviews() {
    const store = readStore();
    return Object.entries(store).flatMap(([itemId, reviews]) =>
      reviews.map((review) => ({ ...review, itemId })),
    );
  }

  function stats(itemId) {
    const reviews = visibleReviews(itemId);
    const count = reviews.length;
    const total = reviews.reduce((sum, review) => sum + Number(review.stars || 0), 0);
    return {
      average: count ? Number((total / count).toFixed(1)) : 0,
      count,
      reviews,
    };
  }

  function stars(value) {
    const rounded = Math.round(Number(value || 0));
    return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
  }

  function itemIdFromCard(card) {
    const link = card.querySelector('a[href*="item-details.html?id="]');
    if (!link) return "";
    return new URL(link.href, window.location.href).searchParams.get("id") || "";
  }

  function renderListingRatings() {
    document.querySelectorAll(".motorx-card").forEach((card) => {
      const itemId = itemIdFromCard(card);
      if (!itemId) return;
      const itemStats = stats(itemId);
      let row = card.querySelector("[data-card-rating]");
      if (!row) {
        row = document.createElement("div");
        row.className = "card-rating-row";
        row.dataset.cardRating = "true";
        const price = card.querySelector(".card-price");
        price?.insertAdjacentElement("beforebegin", row);
      }
      row.innerHTML = `<span class="rating-stars">${stars(itemStats.average)}</span> <strong>${itemStats.average || "New"}</strong>`;
      card.closest("[class*='col-']")?.setAttribute("data-rating-average", String(itemStats.average));
      card.closest("[class*='col-']")?.setAttribute("data-rating-count", String(itemStats.count));
    });
  }

  function installListingSort() {
    document.querySelectorAll(".section-listings").forEach((section) => {
      const grid = section.querySelector(".listings-grid");
      const header = section.querySelector(".listings-header");
      if (!grid || !header || header.querySelector("[data-sort-items]")) return;

      const wrap = document.createElement("div");
      wrap.className = "listing-sort-wrap";
      wrap.innerHTML = `<label for="listing-sort" class="form-label mb-1">Sort</label>
        <select id="listing-sort" class="form-select form-select-sm" data-sort-items>
          <option value="newest">Newest</option>
          <option value="highest-rated">Highest Rated</option>
          <option value="most-reviewed">Most Reviewed</option>
          <option value="price">Price</option>
        </select>`;
      header.appendChild(wrap);

      wrap.querySelector("select").addEventListener("change", (event) => {
        const cards = Array.from(grid.querySelectorAll(".listing-col"));
        const value = event.target.value;
        cards.sort((a, b) => {
          if (value === "highest-rated") return Number(b.dataset.ratingAverage || 0) - Number(a.dataset.ratingAverage || 0);
          if (value === "most-reviewed") return Number(b.dataset.ratingCount || 0) - Number(a.dataset.ratingCount || 0);
          if (value === "price") return priceOf(a) - priceOf(b);
          return 0;
        });
        cards.forEach((card) => grid.appendChild(card));
      });
    });
  }

  function priceOf(wrapper) {
    const text = wrapper.querySelector(".card-price")?.textContent || "";
    return Number(text.match(/\d+(\.\d+)?/)?.[0] || 0);
  }

  function renderDetailsRating(itemId) {
    const target = document.querySelector("[data-item-reviews]");
    if (!target) return;
    const itemStats = stats(itemId);
    const summary = document.getElementById("item-rating");
    if (summary) {
      summary.textContent = itemStats.count
        ? `${itemStats.average} / 5 · ${itemStats.count} reviews`
        : "New item · No reviews yet";
    }
    const user = currentUser();
    const existing = user ? visibleReviews(itemId).find((review) => review.userId === userId(user)) : null;
    const canReview = Boolean(user && hasCompletedRental(itemId, user));
    const buttonText = existing ? "Edit Review" : canReview ? "Write Review" : "Complete Rental to Review";
    const disabled = canReview ? "" : "disabled";
    const helper = canReview ? "" : `<p class="text-muted small mb-0">Complete a rental to write a review.</p>`;

    target.innerHTML = `<div class="card card-custom p-4 mt-3">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <div class="rating-stars rating-stars-lg">${stars(itemStats.average)}</div>
          <strong>${itemStats.average || "New"} / 5</strong>
          <span class="text-muted">(${itemStats.count} reviews)</span>
        </div>
        <button type="button" class="btn btn-primary-custom" data-open-review ${disabled}>${buttonText}</button>
      </div>
      ${helper}
      <div class="review-list mt-4">${renderReviewList(itemStats.reviews)}</div>
      <div class="review-success mt-3" data-review-success hidden>Review saved successfully.</div>
    </div>`;
  }

  function renderReviewList(reviews) {
    if (!reviews.length) return `<p class="text-muted mb-0">No reviews yet.</p>`;
    return reviews
      .map(
        (review) => `<article class="review-item">
          <div class="rating-stars">${stars(review.stars)}</div>
          <p class="mb-1">${review.comment || "No comment provided."}</p>
          <small class="text-muted">— ${review.userName || "CityRent user"}</small>
        </article>`,
      )
      .join("");
  }

  function upsertReview(itemId, review) {
    const store = readStore();
    const reviews = store[itemId] || [];
    const index = reviews.findIndex((entry) => entry.userId === review.userId);
    if (index >= 0) reviews[index] = { ...reviews[index], ...review };
    else reviews.push({ ...review, reviewId: `rv-${Date.now()}`, date: new Date().toISOString().slice(0, 10), hidden: false });
    store[itemId] = reviews;
    writeStore(store);
    renderAll();
  }

  function hideReview(itemId, reviewId) {
    mutateReview(itemId, reviewId, (review) => ({ ...review, hidden: true }));
  }

  function deleteReview(itemId, reviewId) {
    const store = readStore();
    store[itemId] = (store[itemId] || []).filter((review) => review.reviewId !== reviewId);
    writeStore(store);
    renderAll();
  }

  function mutateReview(itemId, reviewId, mutate) {
    const store = readStore();
    store[itemId] = (store[itemId] || []).map((review) => (review.reviewId === reviewId ? mutate(review) : review));
    writeStore(store);
    renderAll();
  }

  function renderAdminReviews() {
    const body = document.getElementById("admin-reviews-body");
    if (!body) return;
    const reviews = allReviews();
    body.innerHTML = reviews.length
      ? reviews
          .map(
            (review) => `<tr>
              <td>${review.itemId}</td>
              <td>${review.userName || review.userId}</td>
              <td><span class="rating-stars">${stars(review.stars)}</span></td>
              <td>${review.comment || ""}</td>
              <td>${review.hidden ? '<span class="badge-status badge-pending">Hidden</span>' : '<span class="badge-status badge-active">Visible</span>'}</td>
              <td>
                <button class="btn btn-sm btn-outline-secondary me-1" data-hide-review="${review.itemId}|${review.reviewId}">Hide</button>
                <button class="btn btn-sm btn-outline-danger" data-delete-review="${review.itemId}|${review.reviewId}">Delete</button>
              </td>
            </tr>`,
          )
          .join("")
      : `<tr><td colspan="6" class="text-muted">No reviews yet.</td></tr>`;
  }

  function renderAll() {
    renderListingRatings();
    installListingSort();
    const activeItemId = document.body.dataset.activeItemId;
    if (activeItemId) renderDetailsRating(activeItemId);
    renderAdminReviews();
  }

  document.addEventListener("DOMContentLoaded", () => {
    readStore();
    renderAll();
    document.addEventListener("click", (event) => {
      const hide = event.target.closest("[data-hide-review]");
      const del = event.target.closest("[data-delete-review]");
      if (hide) {
        const [itemId, reviewId] = hide.dataset.hideReview.split("|");
        hideReview(itemId, reviewId);
      }
      if (del) {
        const [itemId, reviewId] = del.dataset.deleteReview.split("|");
        deleteReview(itemId, reviewId);
      }
    });
  });

  window.CityRentRatings = {
    stats,
    stars,
    currentUser,
    userId,
    hasCompletedRental,
    upsertReview,
    renderAll,
  };
})();
