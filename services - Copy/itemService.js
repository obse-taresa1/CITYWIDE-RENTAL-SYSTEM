(function () {
  const fallbackImage = "images/canon.png";

  const items = [
    {
      id: "toyota-rav4-2023",
      title: "Toyota RAV4 2023",
      category: "vehicles",
      images: ["images/Toyota RAV4.jpg", "images/Toyota RAV4.jpg", "images/Toyota RAV4.jpg", "images/Toyota RAV4.jpg"],
      description:
        "Comfortable Toyota RAV4 SUV with automatic transmission, excellent fuel economy, and flexible pickup. Ideal for errands, weekend trips, and city travel.",
      pricePerDay: 65,
      location: "Downtown",
      rating: "4.8",
      reviews: 86,
      owner: { name: "AutoRent Co.", avatar: "https://i.pravatar.cc/64?img=12", verified: true, memberSince: "2021" },
      protection: { deposit: 350, details: "Security deposit held until return. Basic vehicle protection available at checkout." },
    },
    {
      id: "canon-eos-dslr-kit",
      title: "Canon EOS DSLR Kit",
      category: "cameras",
      images: ["images/canon.png", "images/canon.png", "images/canon.png", "images/canon.png"],
      description:
        "Professional Canon EOS kit with 24-70mm lens, spare battery, memory cards, and carrying case. Perfect for events, portraits, and travel photography.",
      pricePerDay: 45,
      location: "Downtown",
      rating: "4.9",
      reviews: 124,
      owner: { name: "David Chen", avatar: "https://i.pravatar.cc/64?img=33", verified: true, memberSince: "2022" },
      protection: { deposit: 200, details: "Security deposit held until return. Damage protection available at checkout." },
    },
    {
      id: "dewalt-power-drill-set",
      title: "DeWalt Power Drill Set",
      category: "tools",
      images: ["images/dewalt.png", "images/dewalt.png", "images/dewalt.png", "images/dewalt.png"],
      description:
        "Cordless drill set with batteries, charger, drill bits, and carrying case. Great for home repairs, furniture assembly, and renovation work.",
      pricePerDay: 18,
      location: "Westside",
      rating: "4.7",
      reviews: 52,
      owner: { name: "Mike Davis", avatar: "https://i.pravatar.cc/64?img=5", verified: true, memberSince: "2023" },
      protection: { deposit: 80, details: "Deposit covers missing parts and accidental tool damage." },
    },
    {
      id: "gaming-laptop-rtx-4070",
      title: "Gaming Laptop RTX 4070",
      category: "electronics",
      images: ["images/pc.png", "images/pc.png", "images/pc.png", "images/pc.png"],
      description:
        "High-performance gaming and creator laptop with RTX 4070 graphics, 32GB RAM, and fast storage. Suitable for events, editing, and gaming sessions.",
      pricePerDay: 35,
      location: "Midtown",
      rating: "4.8",
      reviews: 73,
      owner: { name: "TechShare Hub", avatar: "https://i.pravatar.cc/64?img=15", verified: true, memberSince: "2020" },
      protection: { deposit: 300, details: "Deposit required. Device condition is verified at pickup and return." },
    },
    {
      id: "4k-home-theater-projector",
      title: "4K Home Theater Projector",
      category: "electronics",
      images: ["images/projector.png", "images/projector.png", "images/projector.png", "images/projector.png"],
      description:
        "Bright 4K projector for movie nights, business presentations, and events. Includes HDMI cable, remote, and travel case.",
      pricePerDay: 28,
      location: "Central",
      rating: "4.6",
      reviews: 41,
      owner: { name: "EventPro LLC", avatar: "https://i.pravatar.cc/64?img=20", verified: true, memberSince: "2022" },
      protection: { deposit: 150, details: "Deposit held against lens, remote, or cable damage." },
    },
    {
      id: "electric-pressure-washer",
      title: "Electric Pressure Washer",
      category: "tools",
      images: ["images/waterpp.png", "images/waterpp.png", "images/waterpp.png", "images/waterpp.png"],
      description:
        "Compact electric pressure washer for patios, cars, driveways, and outdoor furniture. Includes hose and nozzles.",
      pricePerDay: 22,
      location: "Northside",
      rating: "4.5",
      reviews: 34,
      owner: { name: "Tool Depot", avatar: "https://i.pravatar.cc/64?img=18", verified: true, memberSince: "2021" },
      protection: { deposit: 100, details: "Deposit covers accessories and cleaning equipment condition." },
    },
    {
      id: "modern-sectional-sofa",
      title: "Modern Sectional Sofa",
      category: "furniture",
      images: ["images/furnsofa.png", "images/furnsofa.png", "images/furnsofa.png", "images/furnsofa.png"],
      description: "Modern sectional sofa for staging, events, and temporary home setups. Cleaned before every rental.",
      pricePerDay: 55,
      location: "Uptown",
      rating: "4.7",
      reviews: 29,
      owner: { name: "Urban Furnish", avatar: "https://i.pravatar.cc/64?img=24", verified: true, memberSince: "2022" },
      protection: { deposit: 250, details: "Deposit covers stains, upholstery damage, and transport issues." },
    },
    {
      id: "mountain-bike-pro",
      title: "Mountain Bike Pro",
      category: "sports",
      images: ["images/sportbick.png", "images/sportbick.png", "images/sportbick.png", "images/sportbick.png"],
      description: "21-speed mountain bike tuned for trails, parks, and city rides. Helmet and lock available on request.",
      pricePerDay: 15,
      location: "Park",
      rating: "4.8",
      reviews: 48,
      owner: { name: "Active Gear", avatar: "https://i.pravatar.cc/64?img=28", verified: true, memberSince: "2023" },
      protection: { deposit: 120, details: "Deposit covers frame, tire, and gear damage." },
    },
  ];

  const extraTitles = [
    ["gopro-hero-12", "GoPro Hero 12", "cameras", 25],
    ["sony-mirrorless-kit", "Sony Mirrorless Kit", "cameras", 60],
    ["50mm-prime-lens", "50mm Prime Lens", "cameras", 15],
    ["portable-lighting-kit", "Portable Lighting Kit", "cameras", 18],
    ["360-action-camera", "360 Action Camera", "cameras", 30],
    ["55-smart-tv-4k", '55" Smart TV 4K', "electronics", 40],
    ["portable-bluetooth-speaker", "Portable Bluetooth Speaker", "electronics", 8],
    ["noise-cancelling-headphones", "Noise-Cancelling Headphones", "electronics", 12],
    ["standing-desk-adjustable", "Standing Desk Adjustable", "furniture", 12],
    ["solid-wood-dining-table", "Solid Wood Dining Table", "furniture", 40],
    ["leather-armchair", "Leather Armchair", "furniture", 18],
    ["open-bookshelf", "Open Bookshelf", "furniture", 10],
    ["golf-set", "Golf set", "sports", 20],
    ["single-kayak", "Single Kayak", "sports", 22],
    ["stand-up-paddleboard", "Stand-Up Paddleboard", "sports", 18],
    ["climbing-gear-set", "Climbing Gear Set", "sports", 25],
    ["electric-lawn-mower", "Electric Lawn Mower", "tools", 30],
    ["circular-saw-pro", "Circular Saw Pro", "tools", 20],
    ["orbital-sander", "Orbital Sander", "tools", 10],
    ["honda-civic-2022", "Honda Civic 2022", "vehicles", 45],
    ["ford-transit-van", "Ford Transit Van", "vehicles", 80],
    ["mini-cooper-2020", "Mini Cooper 2020", "vehicles", 50],
    ["7-seater-suv", "7-Seater SUV", "vehicles", 90],
  ];

  extraTitles.forEach(([id, title, category, pricePerDay]) => {
    if (items.some((item) => item.id === id)) return;
    items.push({
      id,
      title,
      category,
      images: [fallbackImage, fallbackImage, fallbackImage, fallbackImage],
      description: `${title} available for short-term rental. Well maintained, checked before pickup, and ready for local use.`,
      pricePerDay,
      location: "Citywide",
      rating: "4.6",
      reviews: 18,
      owner: { name: "CityRent Partner", avatar: "https://i.pravatar.cc/64?img=32", verified: true, memberSince: "2023" },
      protection: { deposit: Math.max(50, pricePerDay * 4), details: "Refundable deposit held until the item is safely returned." },
    });
  });

  function normalizeTitle(value) {
    return value.toString().trim().toLowerCase().replace(/&quot;/g, '"');
  }

  function getItemById(id) {
    return items.find((item) => item.id === id) || null;
  }

  function getItemByTitle(title) {
    const normalized = normalizeTitle(title);
    return items.find((item) => normalizeTitle(item.title) === normalized) || null;
  }

  window.CityRentItemService = {
    getAllItems: () => items.slice(),
    getItemById,
    getItemByTitle,
  };
})();
