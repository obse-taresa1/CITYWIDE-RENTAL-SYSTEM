(function () {
  let selectedStars = 0;

  function modal() {
    let node = document.getElementById("review-modal");
    if (node) return node;

    node = document.createElement("div");
    node.id = "review-modal";
    node.className = "review-modal-backdrop";
    node.hidden = true;
    node.innerHTML = `<div class="review-modal-card" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
      <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h2 id="review-modal-title" class="h5 mb-1">Write Review</h2>
          <p class="text-muted small mb-0">Rate this rental experience.</p>
        </div>
        <button type="button" class="btn-close" data-close-review aria-label="Close"></button>
      </div>
      <form id="review-form">
        <div class="review-star-picker mb-3" data-review-stars aria-label="Choose rating">
          ${[1, 2, 3, 4, 5].map((value) => `<button type="button" class="review-star-button" data-star="${value}" aria-label="${value} stars">★</button>`).join("")}
        </div>
        <div class="mb-3">
          <label for="review-comment" class="form-label">Comment</label>
          <textarea id="review-comment" class="form-control" rows="4" placeholder="Share details about condition, pickup, or overall experience."></textarea>
        </div>
        <p class="review-modal-message small mb-3" data-review-modal-message hidden></p>
        <button type="submit" class="btn btn-primary-custom w-100" data-submit-review>Submit Review</button>
      </form>
    </div>`;
    document.body.appendChild(node);
    return node;
  }

  function currentItemId() {
    return document.body.dataset.activeItemId || new URLSearchParams(window.location.search).get("id") || "";
  }

  function userReview(itemId, user) {
    const itemStats = window.CityRentRatings?.stats(itemId);
    const id = window.CityRentRatings?.userId(user);
    return itemStats?.reviews?.find((review) => review.userId === id) || null;
  }

  function setStars(value) {
    selectedStars = value;
    modal()
      .querySelectorAll("[data-star]")
      .forEach((star) => {
        star.classList.toggle("is-active", Number(star.dataset.star) <= value);
      });
  }

  function setMessage(text, isError) {
    const message = modal().querySelector("[data-review-modal-message]");
    message.textContent = text;
    message.hidden = !text;
    message.classList.toggle("text-danger", Boolean(isError));
    message.classList.toggle("text-success", !isError);
  }

  function openReviewModal() {
    const itemId = currentItemId();
    const user = window.CityRentRatings?.currentUser();

    if (!user) {
      localStorage.setItem("redirectAfterLogin", `item-details.html?id=${encodeURIComponent(itemId)}`);
      window.location.href = "login.html";
      return;
    }

    if (!window.CityRentRatings?.hasCompletedRental(itemId, user)) {
      setMessage("Complete this rental before writing a review.", true);
      return;
    }

    const existing = userReview(itemId, user);
    modal().querySelector("#review-modal-title").textContent = existing ? "Edit Review" : "Write Review";
    modal().querySelector("#review-comment").value = existing?.comment || "";
    setStars(Number(existing?.stars || 0));
    setMessage("", false);
    modal().hidden = false;
  }

  function closeReviewModal() {
    modal().hidden = true;
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-open-review]")) openReviewModal();
    if (event.target.closest("[data-close-review]") || event.target.id === "review-modal") closeReviewModal();

    const star = event.target.closest("[data-star]");
    if (star) setStars(Number(star.dataset.star));
  });

  document.addEventListener("mouseover", (event) => {
    const star = event.target.closest("[data-star]");
    if (star) setStars(Number(star.dataset.star));
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "review-form") return;
    event.preventDefault();

    const itemId = currentItemId();
    const user = window.CityRentRatings?.currentUser();
    const submit = modal().querySelector("[data-submit-review]");

    if (!selectedStars) {
      setMessage("Please select a 1-5 star rating.", true);
      return;
    }

    submit.disabled = true;
    submit.textContent = "Saving...";
    window.CityRentRatings.upsertReview(itemId, {
      userId: window.CityRentRatings.userId(user),
      userName: user?.name || user?.fullName || user?.email || "CityRent user",
      stars: selectedStars,
      comment: modal().querySelector("#review-comment").value.trim(),
      date: new Date().toISOString().slice(0, 10),
      hidden: false,
    });

    setMessage("Review saved successfully.", false);
    submit.disabled = false;
    submit.textContent = "Submit Review";
    setTimeout(closeReviewModal, 700);
  });
})();
