(function () {
  function imageList(item) {
    const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    while (images.length < 4) images.push(images[0] || "images/canon.png");
    return images.slice(0, 4);
  }

  function renderGallery(item) {
    const images = imageList(item);
    const radios = images
      .map(
        (_, index) =>
          `<input type="radio" name="gal" id="gal-${index + 1}" class="gal-radio" ${index === 0 ? "checked" : ""}>`,
      )
      .join("");
    const stage = images
      .map(
        (src, index) =>
          `<img src="${src}" alt="${item.title}" class="gal-img gal-${index + 1}">`,
      )
      .join("");
    const thumbs = images
      .map(
        (src, index) =>
          `<label for="gal-${index + 1}"><img src="${src}" alt="${item.title} thumbnail"></label>`,
      )
      .join("");

    return `${radios}<div class="gallery-stage">${stage}</div><div class="gallery-thumbs">${thumbs}</div>`;
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function loadItemDetails() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id") || "canon-eos-dslr-kit";
    const item = window.CityRentItemService?.getItemById(itemId);
    const loading = document.querySelector("[data-item-loading]");
    const error = document.querySelector("[data-item-error]");
    const content = document.querySelector("[data-item-content]");

    window.setTimeout(() => {
      if (loading) loading.hidden = true;

      if (!item) {
        if (error) error.hidden = false;
        return;
      }

      document.title = `${item.title} - CityRent`;
      document.querySelector("[data-gallery]").innerHTML = renderGallery(item);
      setText("[data-item-title]", item.title);
      setText(
        "[data-item-meta]",
        `${item.rating} stars · ${item.reviews} reviews · ${item.location}`,
      );
      setText("[data-item-price]", item.pricePerDay);
      setText("[data-item-description]", item.description);
      setText("[data-owner-name]", item.owner.name);
      setText(
        "[data-owner-meta]",
        `${item.owner.verified ? "Verified · " : ""}Member since ${item.owner.memberSince}`,
      );
      setText(
        "[data-protection-details]",
        `Security deposit of $${item.protection.deposit} held until return. ${item.protection.details}`,
      );

      const ownerAvatar = document.querySelector("[data-owner-avatar]");
      if (ownerAvatar) ownerAvatar.src = item.owner.avatar;

      const rentButton = document.querySelector("[data-rent-now]");
      if (rentButton) {
        rentButton.disabled = false;
        rentButton.addEventListener("click", () => {
          window.CityRentRentalFlow.handleRent(item.id);
        });
      }

      if (content) content.hidden = false;

      if (params.get("action") === "rent" && window.CityRentAuthGuard?.isAuthenticated()) {
        window.CityRentRentalFlow.handleRent(item.id);
      }
    }, 250);
  }

  document.addEventListener("DOMContentLoaded", loadItemDetails);
})();
