const items = {
  "canon-eos-dslr-kit": {
    title: "Canon EOS DSLR Kit",
    price: "$45",
    rating: "4.9 stars · 124 reviews · Downtown",
    description:
      "Professional Canon EOS kit with 24-70mm lens, spare battery, memory cards, and carrying case. Perfect for events, portraits, and travel photography.",
    images: ["images/canon.png", "images/catagcanon.png", "images/catagkit.png"],
    protection:
      "Security deposit of $200 held until return. Damage protection available at checkout.",
  },
  "toyota-rav4-2023": {
    title: "Toyota RAV4 2023",
    price: "$65",
    rating: "4.8 stars · 86 reviews · Downtown",
    description:
      "Comfortable Toyota RAV4 SUV with automatic transmission, excellent fuel economy, and flexible pickup. Ideal for errands, weekend trips, and city travel.",
    images: ["images/Toyota RAV4.jpg", "images/Toyota RAV4.jpg"],
    protection:
      "Security deposit of $350 held until return. Basic vehicle protection is available at checkout.",
  },
  "dewalt-power-drill-set": {
    title: "DeWalt Power Drill Set",
    price: "$18",
    rating: "4.7 stars · 52 reviews · Westside",
    description:
      "Cordless drill set with batteries, charger, drill bits, and carrying case. Great for home repairs, furniture assembly, and renovation work.",
    images: ["images/dewalt.png", "images/dewalt.png"],
    protection:
      "Security deposit of $80 held until return. Deposit covers missing parts and accidental tool damage.",
  },
  "gaming-laptop-rtx-4070": {
    title: "Gaming Laptop RTX 4070",
    price: "$35",
    rating: "4.8 stars · 73 reviews · Midtown",
    description:
      "High-performance gaming and creator laptop with RTX 4070 graphics, 32GB RAM, and fast storage. Suitable for events, editing, and gaming sessions.",
    images: ["images/pc.png", "images/pc.png"],
    protection:
      "Security deposit of $300 held until return. Device condition is verified at pickup and return.",
  },
  "4k-home-theater-projector": {
    title: "4K Home Theater Projector",
    price: "$28",
    rating: "4.6 stars · 41 reviews · Central",
    description:
      "Bright 4K projector for movie nights, business presentations, and events. Includes HDMI cable, remote, and travel case.",
    images: ["images/projector.png", "images/projector.png"],
    protection:
      "Security deposit of $150 held until return. Deposit covers lens, remote, or cable damage.",
  },
  "electric-pressure-washer": {
    title: "Electric Pressure Washer",
    price: "$22",
    rating: "4.5 stars · 34 reviews · Northside",
    description:
      "Compact electric pressure washer for patios, cars, driveways, and outdoor furniture. Includes hose and nozzles.",
    images: ["images/waterpp.png", "images/waterpp.png"],
    protection:
      "Security deposit of $100 held until return. Deposit covers accessories and cleaning equipment condition.",
  },
};

const generatedItems = {
  "gopro-hero-12": ["GoPro Hero 12", "$25", "images/catag360.png"],
  "sony-mirrorless-kit": ["Sony Mirrorless Kit", "$60", "images/catagsony.png"],
  "50mm-prime-lens": ["50mm Prime Lens", "$15", "images/catagsony4k.png"],
  "portable-lighting-kit": ["Portable Lighting Kit", "$18", "images/catagkit.png"],
  "360-action-camera": ["360 Action Camera", "$30", "images/catag360.png"],
  "55-smart-tv-4k": ['55" Smart TV 4K', "$40", "images/electrotv.png"],
  "portable-bluetooth-speaker": ["Portable Bluetooth Speaker", "$8", "images/electrospkear.png"],
  "noise-cancelling-headphones": ["Noise-Cancelling Headphones", "$12", "images/electroheadset.png"],
  "modern-sectional-sofa": ["Modern Sectional Sofa", "$55", "images/furnsofa.png"],
  "standing-desk-adjustable": ["Standing Desk Adjustable", "$12", "images/furndesk.png"],
  "solid-wood-dining-table": ["Solid Wood Dining Table", "$40", "images/furndinning.png"],
  "leather-armchair": ["Leather Armchair", "$18", "images/furnchair.png"],
  "open-bookshelf": ["Open Bookshelf", "$10", "images/furnshelf.png"],
  "mountain-bike-pro": ["Mountain Bike Pro", "$15", "images/sportbick.png"],
  "golf-set": ["Golf set", "$20", "images/sportgolf.png"],
  "single-kayak": ["Single Kayak", "$22", "images/sportkeay.png"],
  "stand-up-paddleboard": ["Stand-Up Paddleboard", "$18", "images/sportpandel.png"],
  "climbing-gear-set": ["Climbing Gear Set", "$25", "images/sportclim.png"],
  "electric-lawn-mower": ["Electric Lawn Mower", "$30", "images/toollaw.png"],
  "circular-saw-pro": ["Circular Saw Pro", "$20", "images/toolsaw.png"],
  "orbital-sander": ["Orbital Sander", "$10", "images/toolorbit.png"],
  "honda-civic-2022": ["Honda Civic 2022", "$45", "images/vehhonda.png"],
  "ford-transit-van": ["Ford Transit Van", "$80", "images/vehford.png"],
  "mini-cooper-2020": ["Mini Cooper 2020", "$50", "images/vehcooper.png"],
  "7-seater-suv": ["7-Seater SUV", "$90", "images/vehsvu.png"],
};

Object.entries(generatedItems).forEach(([id, [title, price, image]]) => {
  if (items[id]) return;
  items[id] = {
    title,
    price,
    rating: "4.6 stars · 18 reviews · Citywide",
    description: `${title} is available for short-term rental. The item is maintained, checked before pickup, and ready for local use.`,
    images: [image, image],
    protection:
      "Refundable security deposit held until the item is safely returned. Protection options are available at checkout.",
  };
});

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch (error) {
    localStorage.removeItem("currentUser");
    return null;
  }
}

function isLoggedIn() {
  const user = getCurrentUser();
  return Boolean(user && user.email && user.role);
}

function dashboardForRole(role) {
  switch ((role || "").toLowerCase()) {
    case "admin":
      return "admin.html";
    case "supervisor":
      return "admin.html";
    case "lessee":
      return "lessee-dashboard.html";
    case "lessor":
      return "lessor-dashboard.html";
    case "both":
      return "both-dashboard.html";
    case "superadmin":
      return "super-admin-dashboard.html";
    default:
      return "login.html";
  }
}

function showRentMessage(message) {
  const authMessage = document.getElementById("auth-message");
  if (!authMessage) return;
  authMessage.textContent = window.CityRentI18n?.t(message) || message;
  authMessage.hidden = false;
}

function handleRentNow(itemId) {
  const rentButton = document.getElementById("rent-now-btn");

  rentButton.disabled = true;
  rentButton.textContent = window.CityRentI18n?.t("Checking...") || "Checking...";
  localStorage.setItem("pendingRental", itemId);

  if (!isLoggedIn()) {
    showRentMessage("Please log in to rent this item.");
    localStorage.setItem("redirectAfterLogin", `item-details.html?id=${encodeURIComponent(itemId)}&action=rent`);
    window.location.href = "login.html";
    return;
  }

  const user = getCurrentUser();
  const role = window.CityRentRentAccess?.normalizedRole(user) || (user.role || "").toLowerCase();

  if (window.CityRentRentAccess?.canRent(role) || ["renter", "lessee", "both"].includes(role)) {
    window.location.href = `booking.html?itemId=${encodeURIComponent(itemId)}`;
    return;
  }

  showRentMessage(window.CityRentRentAccess?.rentBlockedMessage(role) || "You cannot rent items with this role.");
  rentButton.disabled = false;
  rentButton.textContent = window.CityRentI18n?.t("Rent Now") || "Rent Now";
}

function renderThumbnails(item) {
  const thumbnails = document.getElementById("item-thumbnails");
  const mainImage = document.getElementById("item-image");
  thumbnails.innerHTML = "";

  item.images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "item-thumb-button";
    button.innerHTML = `<img src="${src}" alt="${item.title} thumbnail ${index + 1}">`;
    button.addEventListener("click", () => {
      mainImage.src = src;
    });
    thumbnails.appendChild(button);
  });
}

function loadItem(itemId) {
  const item = items[itemId];
  const loading = document.getElementById("item-loading");
  const content = document.getElementById("item-content");
  const error = document.getElementById("item-error");

  window.setTimeout(() => {
    loading.hidden = true;

    if (!item) {
      error.hidden = false;
      return;
    }

    document.body.dataset.activeItemId = itemId;
    document.title = `${item.title} - CityRent`;
    document.getElementById("item-title").textContent = item.title;
    document.getElementById("item-price").textContent = item.price;
    document.getElementById("item-rating").textContent = item.rating;
    document.getElementById("item-description").textContent = item.description;
    document.getElementById("rental-protection").textContent = item.protection;

    const mainImage = document.getElementById("item-image");
    mainImage.src = item.images[0];
    mainImage.alt = item.title;
    renderThumbnails(item);

    const rentButton = document.getElementById("rent-now-btn");
    rentButton.disabled = false;
    rentButton.textContent = window.CityRentI18n?.t("Rent Now") || "Rent Now";
    rentButton.addEventListener("click", () => handleRentNow(itemId));

    content.hidden = false;
    window.CityRentRatings?.renderAll();

    const blockedMessage = sessionStorage.getItem("rentAccessMessage");
    if (blockedMessage) {
      showRentMessage(blockedMessage);
      sessionStorage.removeItem("rentAccessMessage");
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "rent" && isLoggedIn()) {
      handleRentNow(itemId);
    }
    window.CityRentI18n?.refresh();
  }, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id") || "canon-eos-dslr-kit";
  loadItem(itemId);
});
