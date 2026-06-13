(function () {
  const STORE_KEY = "listings";
  const fallbackImage = "images/canon.png";

  function readListings() {
    try {
      const value = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeListings(value) {
    localStorage.setItem(STORE_KEY, JSON.stringify(value));
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      return null;
    }
  }

  function slug(value) {
    return value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function canCreateListing(user) {
    return ["lessor", "both"].includes((user?.role || "").toLowerCase());
  }

  function fileImages(input) {
    const files = Array.from(input?.files || []).slice(0, 8);
    if (!files.length) return Promise.resolve([fallbackImage]);
    return Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(fallbackImage);
            reader.readAsDataURL(file);
          }),
      ),
    );
  }

  async function handleListingForm(event) {
    const form = event.target;
    if (!form.matches("[data-listing-form]")) return;
    event.preventDefault();

    const user = currentUser();
    const message = document.querySelector("[data-listing-message]");
    if (!canCreateListing(user)) {
      if (message) message.textContent = "Only lessors and both-role users can create listings.";
      return;
    }

    const title = document.getElementById("item-name")?.value.trim();
    const description = document.getElementById("description")?.value.trim();
    const category = document.getElementById("category")?.value.trim();
    const price = Number(document.getElementById("price")?.value || 0);
    const location = document.getElementById("location")?.value.trim();

    if (!title || !description || !category || !price || !location) {
      if (message) message.textContent = "Please complete title, description, category, price, and location.";
      return;
    }

    const listings = readListings();
    listings.push({
      id: `${slug(title)}-${Date.now()}`,
      title,
      description,
      category,
      price,
      location,
      images: await fileImages(document.getElementById("images")),
      ownerId: user.id || user.email || "owner",
      ownerName: user.fullname || user.name || user.email || "CityRent owner",
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    writeListings(listings);
    form.reset();
    if (message) {
      message.classList.remove("text-danger");
      message.classList.add("text-success");
      message.textContent = "Listing saved for dashboard/admin demonstration. Browse pages still use hardcoded listings.";
    }
  }

  function updateStatus(id, status) {
    writeListings(readListings().map((listing) => (listing.id === id ? { ...listing, status } : listing)));
  }

  document.addEventListener("submit", handleListingForm);

  window.CityRentListings = {
    all: readListings,
    approveListing: (id) => updateStatus(id, "approved"),
    rejectListing: (id) => updateStatus(id, "rejected"),
  };
})();
