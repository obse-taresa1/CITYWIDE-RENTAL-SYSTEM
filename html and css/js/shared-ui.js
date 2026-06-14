(() => {
  const LANGUAGE_KEY = "language";
  const API_KEY = "AIzaSyBJbIlFDnvTlGABr2cLiorz22voB6UYJRo";
  const GEMINI_MODEL = "gemini-3.5-flash";

  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    GEMINI_MODEL +
    ":generateContent";

  const CITYWIDE_SUPPORT_PROMPT = `You are CityWide Customer Support Assistant.

Responsibilities:
- Help users navigate the CityWide platform.
- Explain service request submission.
- Explain complaint submission.
- Explain complaint tracking.
- Explain request tracking.
- Explain account registration and login.
- Explain profile management.
- Explain notifications and updates.
- Provide clear guidance about CityWide features.

Rules:
- Be professional.
- Be concise.
- Be friendly.
- Do not ask for passwords.
- Do not claim actions are completed.
- Do not invent service statuses.
- If unsure, recommend contacting CityWide support.`;

  const translations = {
    en: {
      language: "Language",
      home: "Home",
      about: "About",
      contact: "Contact",
      items: "Search/Browse Items",
      listings: "Listings",
      login: "Login",
      register: "Register",
      loginRegister: "Login / Register",
      rentNow: "Rent Now",
      viewDetails: "View Details",
      myBookings: "My Bookings",
      dashboard: "Dashboard",
      logout: "Logout",
      profile: "Profile",
      messages: "Messages",
      notifications: "Notifications",
      browseListings: "Browse Listings",
      bookingSuccessful: "Booking Successful",
      bookingConfirmed: "Booking Confirmed!",
      payConfirmBooking: "Pay & Confirm Booking",
      bookingRequests: "Booking Requests",
      pending: "Pending",
      approved: "Approved",
      active: "Active",
      completed: "Completed",
      cancelled: "Cancelled",
      footerTagline: "Citywide Item Rental System - trusted rentals across your city.",
      renterDashboard: "Renter Dashboard",
      lessorDashboard: "Lessor Dashboard",
      superAdminDashboard: "Super Admin Dashboard",
      cityRentDashboard: "CityRent Dashboard",
      bookings: "Bookings",
      bookingHistory: "Booking History",
      activeRentals: "Active Rentals",
      totalListings: "Total Listings",
      pendingRequests: "Pending Requests",
      recentBookings: "Recent Bookings",
      myListings: "My Listings",
      editListings: "Edit Listings",
      deleteListings: "Delete Listings",
      listItem: "List Item",
      addListing: "Add Listing",
      earnings: "Earnings",
      statistics: "Statistics",
      users: "Users",
      reports: "Reports",
      settings: "Settings",
      searchListings: "Search Listings",
      favorites: "Favorites",
      continueBooking: "Continue Booking",
      startBooking: "Start a Booking",
      markCompleted: "Mark Completed",
      review: "Review",
      details: "Details",
      cancelBooking: "Cancel Booking",
      approve: "Approve",
      reject: "Reject",
      action: "Action",
      actions: "Actions",
      status: "Status",
      dates: "Dates",
      item: "Item",
      request: "Request",
      renter: "Renter",
      lessor: "Lessor",
      paymentMethod: "Payment Method",
      priceSummary: "Price Summary",
      rentalDates: "Rental Dates",
      pickupDate: "Pick-up Date",
      returnDate: "Return Date",
      serviceFee: "Service fee",
      tax: "Tax",
      totalDueToday: "Total due today",
      rentalProtection: "Rental Protection",
      password: "Password",
      email: "Email",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      rememberMe: "Remember Me",
      forgotPassword: "Forgot Password?",
      createAccount: "Create Account",
      signInPrompt: "Sign in to your account",
      joinCommunity: "Join the citywide rental community",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      checking: "Checking...",
      loginToRent: "Please log in to rent this item.",
      cannotRentRole: "You cannot rent items with this role.",
      goToListing: "Go To Listing",
      allItems: "All Items",
      usedItems: "Used Items",
      newItems: "New Items",
      category: "Category",
      allCategories: "All Categories",
      maxPrice: "Max Price",
      searchRentals: "Search Rentals",
      exploreAllItems: "Explore All Items",
      rentVehiclesNear: "Rent Cars & Vehicles Near You",
      vehicleHeroText: "Browse trusted vehicle rentals from local owners.",
      electronicsHeroTitle: "Rent Electronics For Any Occasion",
      electronicsHeroText: "Find laptops, speakers, projectors, gaming devices, and more.",
      toolsHeroTitle: "Professional Tools On Demand",
      toolsHeroText: "Rent tools and equipment without the cost of ownership.",
      camerasHeroTitle: "Camera Rentals For Every Shoot",
      camerasHeroText: "Book cameras, lenses, and kits for events, content, and creative work.",
      furnitureHeroTitle: "Furniture Rentals Made Easy",
      furnitureHeroText: "Affordable furniture rentals for homes and events.",
      sportsHeroTitle: "Sports Gear Ready When You Are",
      sportsHeroText: "Rent bikes, golf sets, kayaks, climbing gear, and outdoor equipment.",
    },
    om: {
      language: "Afaan",
      home: "Mana",
      about: "Waa'ee Keenya",
      contact: "Nu Qunnami",
      items: "Meeshaalee Barbaadi/Ilaali",
      listings: "Meeshaalee",
      login: "Seeni",
      register: "Galmaa'i",
      loginRegister: "Seeni / Galmaa'i",
      rentNow: "Kiraa Fudhadhu",
      viewDetails: "Bal'inaan Ilaali",
      myBookings: "Kiraawwan Koo",
      dashboard: "Daashboordii",
      logout: "Ba'i",
      profile: "Profaayilii",
      messages: "Ergaawwan",
      notifications: "Beeksisawwan",
      browseListings: "Meeshaalee Ilaali",
      bookingSuccessful: "Kiraan Milkaa'eera",
      bookingConfirmed: "Kiraan Mirkanaa'e!",
      payConfirmBooking: "Kafalii fi Kiraa Mirkaneessi",
      bookingRequests: "Gaaffiiwwan Kiraa",
      pending: "Eegamaa",
      approved: "Mirkanaa'e",
      active: "Hojii Irra Jira",
      completed: "Xumurame",
      cancelled: "Haqame",
      footerTagline: "Sirna kiraa meeshaalee magaalaa - kiraa amanamaa magaalaa kee keessatti.",
      renterDashboard: "Daashboordii Kireeffataa",
      lessorDashboard: "Daashboordii Abbaa Kiraa",
      superAdminDashboard: "Daashboordii Bulchaa Olaanaa",
      cityRentDashboard: "Daashboordii CityRent",
      bookings: "Kiraawwan",
      bookingHistory: "Seenaa Kiraa",
      activeRentals: "Kiraawwan Hojii Irra Jiran",
      totalListings: "Meeshaalee Waliigalaa",
      pendingRequests: "Gaaffiiwwan Eegaman",
      recentBookings: "Kiraawwan Dhiyoo",
      myListings: "Meeshaalee Koo",
      editListings: "Meeshaalee Gulaali",
      deleteListings: "Meeshaalee Haqi",
      listItem: "Meeshaa Galchi",
      addListing: "Meeshaa Dabaluu",
      earnings: "Galii",
      statistics: "Istaatistiksii",
      users: "Fayyadamtoota",
      reports: "Gabaasawwan",
      settings: "Qindaa'ina",
      searchListings: "Meeshaalee Barbaadi",
      favorites: "Jaallatamoo",
      continueBooking: "Kiraa Itti Fufi",
      startBooking: "Kiraa Jalqabi",
      markCompleted: "Xumurame Jedhi",
      review: "Yaada Kenni",
      details: "Bal'ina",
      cancelBooking: "Kiraa Haqi",
      approve: "Mirkaneessi",
      reject: "Didii",
      action: "Tarkaanfii",
      actions: "Tarkaanfiiwwan",
      status: "Haala",
      dates: "Guyyoota",
      item: "Meeshaa",
      request: "Gaaffii",
      renter: "Kireeffataa",
      lessor: "Abbaa Kiraa",
      paymentMethod: "Mala Kaffaltii",
      priceSummary: "Cuunfaa Gatii",
      rentalDates: "Guyyoota Kiraa",
      pickupDate: "Guyyaa Fudhachuu",
      returnDate: "Guyyaa Deebisuu",
      serviceFee: "Kaffaltii tajaajilaa",
      tax: "Taaksii",
      totalDueToday: "Waliigala har'a kaffalamu",
      rentalProtection: "Eegumsa Kiraa",
      password: "Jecha Darbii",
      email: "Imeelii",
      fullName: "Maqaa Guutuu",
      phoneNumber: "Lakkoofsa Bilbilaa",
      rememberMe: "Na Yaadadhu",
      forgotPassword: "Jecha Darbii Dagattee?",
      createAccount: "Akkaawuntii Uumi",
      signInPrompt: "Akkaawuntii keetti seeni",
      joinCommunity: "Hawaasa kiraa magaalaa makami",
      alreadyHaveAccount: "Akkaawuntii qabdaa?",
      dontHaveAccount: "Akkaawuntii hin qabduu?",
      checking: "Sakatta'aa jira...",
      loginToRent: "Meeshaa kana kireeffachuuf dura seeni.",
      cannotRentRole: "Gahee kanaan meeshaalee kireeffachuu hin dandeessu.",
      goToListing: "Gara Tarree Meeshaalee",
      allItems: "Meeshaalee Hundaa",
      usedItems: "Meeshaalee Fayyadamaman",
      newItems: "Meeshaalee Haaraa",
      category: "Ramaddii",
      allCategories: "Ramaddiiwwan Hundaa",
      maxPrice: "Gatii Ol'aanaa",
      searchRentals: "Kiraa Barbaadi",
      exploreAllItems: "Meeshaalee Hundaa Ilaali",
      rentVehiclesNear: "Konkolaataa naannoo keetti kireeffadhu",
      vehicleHeroText: "Kiraa konkolaataa abbootii naannoo amanamoo irraa ilaali.",
      electronicsHeroTitle: "Meeshaalee Elektirooniksii yeroof kireeffadhu",
      electronicsHeroText: "Laaptoppii, sagalee-dabarsituu, piroojeektarii, meeshaalee taphaa fi kanneen biroo argadhu.",
      toolsHeroTitle: "Meeshaalee hojii ogummaa yeroo barbaadde",
      toolsHeroText: "Meeshaalee hojii baasii abbummaa malee kireeffadhu.",
      camerasHeroTitle: "Kaameraa suuraa hojii hundaaf",
      camerasHeroText: "Kaameraa, leensii fi kiitiiwwan sagantaa, qabiyyee fi hojii kalaqaaf kireeffadhu.",
      furnitureHeroTitle: "Kiraan meeshaalee mana salphaa ta'e",
      furnitureHeroText: "Meeshaalee manaaf fi sagantaaf gatii madaalawaan kireeffadhu.",
      sportsHeroTitle: "Meeshaalee ispoortii yeroo qophooftetti",
      sportsHeroText: "Biskileetii, kiitii golfii, kaayaakii, meeshaalee olbahinsaa fi meeshaalee alaa kireeffadhu.",
    },
  };

  const textKeys = {
    Home: "home",
    About: "about",
    Contact: "contact",
    "Contact Us": "contact",
    "Search/Browse Items": "items",
    "Browse Items": "browseListings",
    "Browse Listings": "browseListings",
    Listings: "listings",
    Login: "login",
    Register: "register",
    "Login / Register": "loginRegister",
    "Register / Login": "loginRegister",
    "Rent Now": "rentNow",
    "VIEW DETAILS": "viewDetails",
    "View Details": "viewDetails",
    "My Bookings": "myBookings",
    Dashboard: "dashboard",
    Logout: "logout",
    "Sign out": "logout",
    Profile: "profile",
    Messages: "messages",
    Notifications: "notifications",
    "Booking Successful": "bookingSuccessful",
    "Booking Confirmed!": "bookingConfirmed",
    "Pay & Confirm Booking": "payConfirmBooking",
    "Booking Requests": "bookingRequests",
    Pending: "pending",
    Approved: "approved",
    Active: "active",
    Completed: "completed",
    Cancelled: "cancelled",
    Canceled: "cancelled",
    "Renter Dashboard": "renterDashboard",
    "Lessor Dashboard": "lessorDashboard",
    "Super Admin Dashboard": "superAdminDashboard",
    "CityRent Dashboard": "cityRentDashboard",
    Bookings: "bookings",
    "Booking History": "bookingHistory",
    "Active Rentals": "activeRentals",
    "Total Listings": "totalListings",
    "Pending Requests": "pendingRequests",
    "Recent Bookings": "recentBookings",
    "My Listings": "myListings",
    "Edit Listings": "editListings",
    "Delete Listings": "deleteListings",
    "List Item": "listItem",
    "Add Listing": "addListing",
    Earnings: "earnings",
    Statistics: "statistics",
    Users: "users",
    Reports: "reports",
    Settings: "settings",
    "Search Listings": "searchListings",
    Favorites: "favorites",
    "Continue Booking": "continueBooking",
    "Start a Booking": "startBooking",
    "Mark Completed": "markCompleted",
    Review: "review",
    Details: "details",
    "Cancel Booking": "cancelBooking",
    Approve: "approve",
    Reject: "reject",
    Action: "action",
    Actions: "actions",
    Status: "status",
    Dates: "dates",
    Item: "item",
    Request: "request",
    Renter: "renter",
    Lessor: "lessor",
    "Payment Method": "paymentMethod",
    "Price Summary": "priceSummary",
    "Rental Dates": "rentalDates",
    "Pick-up Date": "pickupDate",
    "Return Date": "returnDate",
    "Service fee": "serviceFee",
    Tax: "tax",
    "Total due today": "totalDueToday",
    "Rental Protection": "rentalProtection",
    Password: "password",
    Email: "email",
    "Full Name": "fullName",
    "Phone Number": "phoneNumber",
    "Remember Me": "rememberMe",
    "Forgot Password?": "forgotPassword",
    "Create Account": "createAccount",
    "Welcome Back": "login",
    "Sign in to your account": "signInPrompt",
    "Join the citywide rental community": "joinCommunity",
    "Already have an account?": "alreadyHaveAccount",
    "Don't have an account?": "dontHaveAccount",
    "Checking...": "checking",
    "Please log in to rent this item.": "loginToRent",
    "You cannot rent items with this role.": "cannotRentRole",
    "Go To Listing": "goToListing",
    "All Items": "allItems",
    "Used Items": "usedItems",
    "New Items": "newItems",
    Category: "category",
    "All Categories": "allCategories",
    "Max Price": "maxPrice",
    "Search Rentals": "searchRentals",
    "Explore All Items": "exploreAllItems",
    "Rent Cars & Vehicles Near You": "rentVehiclesNear",
    "Browse trusted vehicle rentals from local owners.": "vehicleHeroText",
    "Rent Electronics For Any Occasion": "electronicsHeroTitle",
    "Find laptops, speakers, projectors, gaming devices, and more.": "electronicsHeroText",
    "Professional Tools On Demand": "toolsHeroTitle",
    "Rent tools and equipment without the cost of ownership.": "toolsHeroText",
    "Camera Rentals For Every Shoot": "camerasHeroTitle",
    "Book cameras, lenses, and kits for events, content, and creative work.": "camerasHeroText",
    "Furniture Rentals Made Easy": "furnitureHeroTitle",
    "Affordable furniture rentals for homes and events.": "furnitureHeroText",
    "Sports Gear Ready When You Are": "sportsHeroTitle",
    "Rent bikes, golf sets, kayaks, climbing gear, and outdoor equipment.": "sportsHeroText",
    "Complete Your Booking": "payConfirmBooking",
    "Go to Dashboard": "dashboard",
  };

  Object.entries(translations.en).forEach(([key, value]) => {
    textKeys[value] = key;
  });

  const nodeTranslationKeys = new WeakMap();
  let i18nObserver;
  let isApplyingLanguage = false;

  function currentLanguage() {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return translations[saved] ? saved : "en";
  }

  function t(keyOrText) {
    const key = translations.en[keyOrText] ? keyOrText : textKeys[keyOrText];
    if (!key) return keyOrText;
    return translations[currentLanguage()][key] || translations.en[key] || keyOrText;
  }

  function languageSwitcher() {
    const lang = currentLanguage();
    return `<label class="language-switcher" aria-label="${t("language")}">
      <i class="bi bi-globe2" aria-hidden="true"></i>
      <select data-language-switcher aria-label="${t("language")}">
        <option value="en"${lang === "en" ? " selected" : ""}>English</option>
        <option value="om"${lang === "om" ? " selected" : ""}>Afaan Oromo</option>
      </select>
    </label>`;
  }

  function translateStoredAttribute(element, attrName) {
    const dataName = `i18nOriginal${attrName.replace(/[^a-z0-9]/gi, "")}`;
    if (!element.dataset[dataName]) element.dataset[dataName] = element.getAttribute(attrName) || "";
    const original = element.dataset[dataName];
    const translated = t(original);
    if (translated !== original || currentLanguage() === "en") element.setAttribute(attrName, translated);
  }

  function translateTextNode(node) {
    const raw = node.nodeValue || "";
    const trimmed = raw.trim();
    if (!trimmed) return;
    const key = nodeTranslationKeys.get(node) || textKeys[trimmed];
    if (!key) return;
    nodeTranslationKeys.set(node, key);
    const translated = translations[currentLanguage()][key] || translations.en[key] || trimmed;
    node.nodeValue = raw.replace(trimmed, translated);
  }

  function translateTree(root = document.body) {
    if (!root) return;

    root.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (translations.en[key]) element.textContent = t(key);
    });
    root.querySelectorAll("[placeholder]").forEach((element) => translateStoredAttribute(element, "placeholder"));
    root.querySelectorAll("[aria-label]").forEach((element) => translateStoredAttribute(element, "aria-label"));
    root.querySelectorAll("[title]").forEach((element) => translateStoredAttribute(element, "title"));

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "OPTION"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let node = walker.nextNode();
    while (node) {
      translateTextNode(node);
      node = walker.nextNode();
    }
  }

  function applyLanguage(language = currentLanguage()) {
    const selected = translations[language] ? language : "en";
    isApplyingLanguage = true;
    localStorage.setItem(LANGUAGE_KEY, selected);
    document.documentElement.lang = selected;
    document.querySelectorAll("[data-language-switcher]").forEach((select) => {
      select.value = selected;
    });
    translateTree(document.body);
    window.dispatchEvent(new CustomEvent("cityrent:languagechange", { detail: { language: selected } }));
    isApplyingLanguage = false;
  }

  function installLanguageControls() {
    document.querySelectorAll("[data-language-switcher]").forEach((select) => {
      select.value = currentLanguage();
      select.addEventListener("change", () => applyLanguage(select.value));
    });

    const adminActions = document.querySelector(".admin-console-actions");
    if (adminActions && !adminActions.querySelector("[data-language-switcher]")) {
      adminActions.insertAdjacentHTML("afterbegin", languageSwitcher());
      adminActions.querySelector("[data-language-switcher]")?.addEventListener("change", (event) => {
        applyLanguage(event.target.value);
      });
    }
  }

  function observeLanguageUpdates() {
    if (i18nObserver || !document.body) return;
    i18nObserver = new MutationObserver((mutations) => {
      if (isApplyingLanguage) return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
        });
      });
    });
    i18nObserver.observe(document.body, { childList: true, subtree: true });
  }

  window.CityRentI18n = {
    translations,
    t,
    currentLanguage,
    applyLanguage,
    refresh: () => applyLanguage(currentLanguage()),
    installLanguageControls,
    languageSwitcher,
  };

  const navLinks = [
    { href: "index.html", label: "Home", key: "home", i18n: "home" },
    { href: "our-story.html", label: "About", key: "about", i18n: "about" },
    { href: "contact.html", label: "Contact", key: "contact", i18n: "contact" },
    { href: "items.html", label: "Search/Browse Items", key: "items", i18n: "items" },
  ];

  const categoryRoutes = {
    all: "items.html",
    electronics: "category-electronics.html",
    tools: "category-tools.html",
    cameras: "category-cameras.html",
    vehicles: "category-vehicles.html",
    sports: "category-sports.html",
    furniture: "category-furniture.html",
  };

  const dashboardMenus = {
    user: [
      ["dashboard.html", "bi-speedometer2", "Overview"],
      ["profile.html", "bi-person-circle", "Profile"],
      ["booking.html", "bi-calendar-check", "Bookings"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["items.html", "bi-search", "Browse Items"],
    ],
    lessee: [
      ["lessee-dashboard.html", "bi-speedometer2", "Overview"],
      ["items.html", "bi-grid", "Browse Listings"],
      ["items.html", "bi-search", "Search Listings"],
      ["booking.html", "bi-calendar-check", "My Bookings"],
      ["booking.html#history", "bi-clock-history", "Booking History"],
      ["items.html#favorites", "bi-heart", "Favorites"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["notifications.html", "bi-bell", "Notifications"],
      ["profile.html", "bi-person-circle", "Profile"],
    ],
    lessor: [
      ["lessor-dashboard.html", "bi-speedometer2", "Overview"],
      ["dashboard.html", "bi-list-check", "My Listings"],
      ["list-item.html", "bi-plus-circle", "Add Listing"],
      ["dashboard.html#edit-listings", "bi-pencil-square", "Edit Listings"],
      ["dashboard.html#delete-listings", "bi-trash", "Delete Listings"],
      ["booking.html#requests", "bi-calendar2-week", "Booking Requests"],
      ["profile.html#earnings", "bi-cash-coin", "Earnings"],
      ["dashboard.html#statistics", "bi-graph-up-arrow", "Statistics"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["notifications.html", "bi-bell", "Notifications"],
      ["profile.html", "bi-person-circle", "Profile"],
    ],
    both: [
      ["both-dashboard.html", "bi-grid-1x2", "Overview"],
      ["items.html", "bi-search", "Find Rentals"],
      ["booking.html", "bi-calendar-check", "My Bookings"],
      ["items.html#favorites", "bi-heart", "Favorites"],
      ["list-item.html", "bi-plus-circle", "List Item"],
      ["dashboard.html", "bi-list-check", "My Listings"],
      ["booking.html#requests", "bi-calendar2-week", "Booking Requests"],
      ["profile.html#earnings", "bi-cash-coin", "Earnings"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["notifications.html", "bi-bell", "Notifications"],
      ["profile.html", "bi-person-circle", "Profile"],
    ],
    admin: [
      ["dashboard.html", "bi-speedometer2", "Dashboard"],
      ["users.html", "bi-people", "Users"],
      ["listings.html", "bi-box-seam", "Listings"],
      ["messages.html", "bi-envelope", "Messages"],
      ["reports.html", "bi-flag", "Reports"],
      ["statistics.html", "bi-bar-chart", "Statistics"],
      ["settings.html", "bi-gear", "Settings"],
    ],
    "super-admin": [
      ["super-dashboard.html", "bi-command", "Control Center"],
      ["admin-management.html", "bi-person-badge", "Admin Management"],
      ["user-management.html", "bi-people", "User Management"],
      ["listing-management.html", "bi-box-seam", "Listing Management"],
      ["contact-messages.html", "bi-envelope", "Contact Messages"],
      ["role-requests.html", "bi-arrow-repeat", "Role Requests"],
      ["analytics.html", "bi-graph-up-arrow", "Analytics"],
      ["activity-logs.html", "bi-journal-text", "Activity Logs"],
      ["system-settings.html", "bi-sliders", "System Settings"],
    ],
  };

  const roleLabels = {
    user: "Dashboard",
    lessee: "Renter Dashboard",
    lessor: "Lessor Dashboard",
    both: "CityRent Dashboard",
    admin: "Admin Dashboard",
    "super-admin": "Super Admin Dashboard",
  };

  document.documentElement.dataset.theme =
    localStorage.getItem("theme") || "light";

  function currentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function isAuthenticated() {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") || "null");
      return Boolean(user && user.email && user.role);
    } catch (error) {
      localStorage.removeItem("currentUser");
      return false;
    }
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      localStorage.removeItem("currentUser");
      return null;
    }
  }

  function currentRole() {
    return (currentUser()?.role || "").toLowerCase();
  }

  function redirectToRoleDashboard(role) {
    const routes = {
      lessee: "lessee-dashboard.html",
      lessor: "lessor-dashboard.html",
      both: "both-dashboard.html",
      admin: "admin.html",
      supervisor: "admin.html",
      superadmin: "super-admin-dashboard.html",
    };
    window.location.href = routes[role] || "login.html";
  }

  function enforceRoleAccess() {
    const page = currentPage();
    const role = currentRole();
    if (!role) return;

    const listingManagementPages = ["list-item.html", "dashboard.html"];
    if (role === "lessee" && listingManagementPages.includes(page)) {
      redirectToRoleDashboard(role);
      return;
    }

  }

  function shellRole(requestedRole) {
    if (requestedRole !== "user") return requestedRole;
    const role = currentRole();
    if (["lessee", "lessor", "both", "admin", "supervisor"].includes(role)) {
      return role === "supervisor" ? "admin" : role;
    }
    if (role === "superadmin") return "super-admin";
    return "user";
  }

  function activePublicKey(page) {
    if (page === "index.html" || page === "") return "home";
    if (
      page === "items.html" ||
      page.startsWith("category-") ||
      page === "item-details.html"
    )
      return "items";
    if (page === "our-story.html" || page === "careers.html") return "about";
    if (page === "contact.html") return "contact";
    return "";
  }

  function themeToggle() {
    return `<button class="theme-toggle-btn" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false">
      <i class="bi bi-moon-fill theme-icon-dark"></i>
      <i class="bi bi-sun-fill theme-icon-light"></i>
    </button>`;
  }

  function applyTheme(theme) {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = selectedTheme;
    localStorage.setItem("theme", selectedTheme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isDark = selectedTheme === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  }

  function installThemeToggle() {
    applyTheme(localStorage.getItem("theme") || "light");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
      });
    });
  }

  function userActions() {
    return `<button class="nav-icon-btn" type="button" aria-label="Notifications"><i class="bi bi-bell"></i><span class="nav-dot"></span></button>
      <details class="profile-menu">
        <summary aria-label="Open profile menu"><img src="https://i.pravatar.cc/40?img=33" alt="User profile"><span>Alex</span><i class="bi bi-chevron-down"></i></summary>
        <div class="profile-menu-list">
          <a href="profile.html"><i class="bi bi-person"></i> ${t("profile")}</a>
          <a href="dashboard.html"><i class="bi bi-speedometer2"></i> ${t("dashboard")}</a>
          <a href="messages.html"><i class="bi bi-chat-dots"></i> ${t("messages")}</a>
          <a href="login.html"><i class="bi bi-box-arrow-right"></i> ${t("logout")}</a>
        </div>
      </details>`;
  }

  function publicAccountActions() {
    const user = currentUser();
    const name = user?.fullname || user?.name || user?.email || "Account";
    return `<div class="public-account-actions">
      <details class="profile-menu public-profile-menu">
        <summary aria-label="Open profile menu"><img src="https://i.pravatar.cc/40?img=33" alt="User profile"><span>${name}</span><i class="bi bi-chevron-down"></i></summary>
        <div class="profile-menu-list">
          <a href="profile.html"><i class="bi bi-person"></i> ${t("profile")}</a>
          <a href="${dashboardForRole(user?.role)}"><i class="bi bi-speedometer2"></i> ${t("dashboard")}</a>
        </div>
      </details>
      <button class="nav-login nav-logout-btn" type="button" data-logout>${t("logout")}</button>
    </div>`;
  }

  function dashboardForRole(role) {
    switch ((role || "").toLowerCase()) {
      case "lessee":
        return "lessee-dashboard.html";
      case "lessor":
        return "lessor-dashboard.html";
      case "both":
        return "both-dashboard.html";
      case "admin":
        return "admin.html";
      case "superadmin":
      case "super-admin":
        return "super-admin-dashboard.html";
      default:
        return "dashboard.html";
    }
  }

  function installLogoutButtons() {
    document.querySelectorAll("[data-logout]").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
      });
    });
  }

  function publicHeader() {
    const page = currentPage();
    const active = activePublicKey(page);
    const links = navLinks
      .map(
        (link) =>
          `<li><a href="${link.href}" class="${link.key === active ? "active" : ""}">${t(link.i18n)}</a></li>`,
      )
      .join("");
    const authButtons = isAuthenticated()
      ? publicAccountActions()
      : `<div class="public-auth-actions"><a href="login.html" class="nav-login">${t("loginRegister")}</a></div>`;
    return `<header class="motorx-header app-public-header">
      <div class="container"><div class="motorx-nav-flex">
        <a class="motorx-logo" href="index.html"><img src="images/logo.png" alt="CityRent Logo"></a>
        <input type="checkbox" id="nav-toggle" class="nav-check" aria-label="Open menu">
        <label for="nav-toggle" class="nav-toggler-label"><i class="bi bi-list"></i></label>
        <nav class="motorx-nav-menu"><ul class="motorx-nav-links">${links}</ul><div class="motorx-nav-actions">${languageSwitcher()}${themeToggle()}${authButtons}</div></nav>
      </div></div>
    </header>`;
  }

  function footer() {
    return `<footer class="motorx-footer">
      <div class="container"><div class="footer-flex">
        <div><a class="motorx-logo text-white mb-3 d-inline-block" href="index.html"><img src="images/logo.png" alt="CityRent Logo"></a><p class="small">${t("footerTagline")}</p></div>
        <div><h5>${t("about")}</h5><a href="our-story.html">Our Story</a><a href="careers.html">Careers</a></div>
        <div><h5>${t("contact")}</h5><a href="contact.html">${t("contact")}</a><a href="mailto:support@cityrent.com">support@cityrent.com</a></div>
        <div><h5>Legal</h5><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms</a></div>
        <div><div class="top-bar-social"><a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a></div></div>
      </div><div class="footer-bottom"><p class="mb-0">&copy; 2026 CityRent. All rights reserved.</p></div></div>
    </footer>`;
  }

  function dashboardHeader(role) {
    return `<header class="motorx-header dashboard-topbar">
      <div class="container-fluid px-3"><div class="motorx-nav-flex">
        <a class="motorx-logo dashboard-logo" href="index.html"><img src="images/logo.png" alt="CityRent Logo"></a>
        <div class="dashboard-topbar-title">${t(roleLabels[role] || "Dashboard")}</div>
        <div class="motorx-nav-actions">${languageSwitcher()}${themeToggle()}${userActions()}<a href="index.html" class="nav-login" onclick="if (typeof logout === 'function') logout()">${t("logout")}</a></div>
      </div></div>
    </header>`;
  }

  function dashboardSidebar(role) {
    const page = currentPage();
    const menu = dashboardMenus[role] || dashboardMenus.user;
    const links = menu
      .map(([href, icon, label]) => {
        const base = href.split("#")[0];
        const isActive =
          base === page ||
          (page === "dashboard.html" && href === "dashboard.html");
        return `<a href="${href}" class="${isActive ? "active" : ""}"><i class="bi ${icon}"></i><span>${t(label)}</span></a>`;
      })
      .join("");
    return `<aside class="sidebar dashboard-sidebar"><nav class="sidebar-nav">${links}<a class="logout-link" href="login.html"><i class="bi bi-box-arrow-right"></i><span>${t("logout")}</span></a></nav></aside>`;
  }

  function removeExistingChrome() {
    document
      .querySelectorAll(
        ".top-bar, header.motorx-header, nav.navbar, footer.motorx-footer, footer.footer-custom",
      )
      .forEach((el) => el.remove());
  }

  function installPublicShell() {
    removeExistingChrome();
    document.body.insertAdjacentHTML("afterbegin", publicHeader());
    document.body.insertAdjacentHTML("beforeend", footer());
  }

  function installDashboardShell(role) {
    removeExistingChrome();
    document.body.insertAdjacentHTML("afterbegin", dashboardHeader(role));
    let wrapper = document.querySelector(".dashboard-wrapper");
    const main = document.querySelector("main");
    if (!wrapper && main) {
      wrapper = document.createElement("div");
      wrapper.className = "dashboard-wrapper";
      main.parentNode.insertBefore(wrapper, main);
      wrapper.appendChild(main);
    }
    if (wrapper) {
      wrapper.querySelectorAll(".sidebar").forEach((el) => el.remove());
      wrapper.insertAdjacentHTML("afterbegin", dashboardSidebar(role));
      const content = wrapper.querySelector("main");
      if (content) content.classList.add("dashboard-main");
    }
  }

  function installHomeHeroSlider() {
    const hero = document.querySelector("[data-hero-slider]");
    if (!hero) return;

    const slides = Array.from(hero.querySelectorAll(".hero-slide"));
    const title = hero.querySelector("[data-hero-title]");
    const subtitle = hero.querySelector("[data-hero-subtitle]");
    const cardImage = hero.querySelector("[data-hero-card-img]");
    const cardTitle = hero.querySelector("[data-hero-card-title]");
    const cardPrice = hero.querySelector("[data-hero-card-price]");
    const cardLocation = hero.querySelector("[data-hero-card-location]");
    const dotsWrap = hero.querySelector("[data-hero-dots]");
    const prevButton = hero.querySelector("[data-hero-prev]");
    const nextButton = hero.querySelector("[data-hero-next]");
    let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    let sliderTimer;

    if (slides.length < 2) return;
    if (activeIndex < 0) activeIndex = 0;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-slider-dot";
      dot.setAttribute("aria-label", `Show hero slide ${index + 1}`);
      dot.addEventListener("click", () => {
        showSlide(index);
        restartHeroSlider();
      });
      dotsWrap?.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      const activeSlide = slides[activeIndex];

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });

      if (title) title.textContent = t(activeSlide.dataset.title || "");
      if (subtitle) subtitle.textContent = t(activeSlide.dataset.subtitle || "");
      if (cardTitle) cardTitle.textContent = activeSlide.dataset.cardTitle || "";
      if (cardPrice) cardPrice.textContent = activeSlide.dataset.cardPrice || "";
      if (cardLocation) cardLocation.textContent = activeSlide.dataset.cardLocation || "";
      if (cardImage && activeSlide.dataset.cardImage) {
        cardImage.src = activeSlide.dataset.cardImage;
      }
    }

    function nextSlide() {
      showSlide(activeIndex + 1);
    }

    function restartHeroSlider() {
      window.clearInterval(sliderTimer);
      sliderTimer = window.setInterval(nextSlide, 4500);
    }

    prevButton?.addEventListener("click", () => {
      showSlide(activeIndex - 1);
      restartHeroSlider();
    });
    nextButton?.addEventListener("click", () => {
      nextSlide();
      restartHeroSlider();
    });

    showSlide(activeIndex);
    restartHeroSlider();
  }

  function installHomeSearchFlow() {
    const form = document.querySelector("[data-home-search]");
    if (!form) return;

    const priceInput = form.querySelector('input[name="maxPrice"]');
    const priceValue = form.querySelector(".price-val");

    function updatePriceLabel() {
      if (priceInput && priceValue) {
        priceValue.textContent = `$${priceInput.value} / day`;
      }
    }

    updatePriceLabel();
    priceInput?.addEventListener("input", updatePriceLabel);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const category = (formData.get("category") || "all").toString();
      const maxPrice = (formData.get("maxPrice") || "").toString();
      const selectedTab =
        document.querySelector('input[name="item-tab"]:checked')?.id || "tab-all";
      const status =
        selectedTab === "tab-new"
          ? "new"
          : selectedTab === "tab-used"
            ? "used"
            : "all";

      const target = categoryRoutes[category] || categoryRoutes.all;
      const params = new URLSearchParams();
      params.set("category", category);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (status !== "all") params.set("status", status);

      window.location.href = `${target}?${params.toString()}`;
    });
  }

  function installListingSearchFilters() {
    const params = new URLSearchParams(window.location.search);
    const hasSearchFilters = ["category", "maxPrice", "status"].some((key) =>
      params.has(key),
    );
    if (!hasSearchFilters) return;

    const listingSection = document.querySelector(".section-listings");
    const listingGrid = listingSection?.querySelector(".row");
    if (!listingSection || !listingGrid) return;

    const cards = Array.from(listingGrid.querySelectorAll(".motorx-card"))
      .map((card) => card.closest('[class*="col-"]') || card.parentElement)
      .filter(Boolean);
    if (!cards.length) return;

    const pageCategory = categoryFromPage();
    const selectedCategory = params.get("category") || pageCategory || "all";
    const selectedStatus = params.get("status") || "all";
    const maxPrice = Number(params.get("maxPrice") || "0");

    let visibleCount = 0;
    cards.forEach((cardWrapper) => {
      const card = cardWrapper.querySelector(".motorx-card");
      const cardText = normalize(card?.textContent || "");
      const price = extractPrice(card);
      const category = categoryFromCard(card) || pageCategory || "all";
      const status = itemStatus(card);

      const categoryMatches =
        selectedCategory === "all" || category === selectedCategory;
      const priceMatches = !maxPrice || price <= maxPrice;
      const statusMatches =
        selectedStatus === "all" || status === selectedStatus;
      const shouldShow =
        categoryMatches && priceMatches && statusMatches;

      cardWrapper.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    updateSearchResultSummary({
      listingSection,
      listingGrid,
      visibleCount,
      selectedCategory,
      selectedStatus,
      maxPrice,
    });
  }

  function categoryFromPage() {
    const page = currentPage();
    const match = page.match(/^category-(.+)\.html$/);
    return match ? match[1] : "all";
  }

  function categoryFromCard(card) {
    const similar = card?.querySelector(".card-similar")?.textContent || "";
    const category = similar.split("·")[0].trim().toLowerCase();
    if (!category) return "";
    if (category.includes("camera")) return "cameras";
    if (category.includes("tool")) return "tools";
    if (category.includes("vehicle") || category.includes("suv")) return "vehicles";
    if (category.includes("electronic")) return "electronics";
    if (category.includes("sport")) return "sports";
    if (category.includes("furniture")) return "furniture";
    return category;
  }

  function extractPrice(card) {
    const priceText = card?.querySelector(".card-price")?.textContent || "";
    const match = priceText.match(/\$?\s*(\d+(?:\.\d+)?)/);
    return match ? Number(match[1]) : 0;
  }

  function itemStatus(card) {
    const wrapperStatus = card?.closest("[data-status]")?.dataset.status;
    if (wrapperStatus) return wrapperStatus;

    const yearText = card?.querySelector(".badge-year")?.textContent || "";
    const year = Number(yearText.match(/\d{4}/)?.[0] || "0");
    return year >= 2023 ? "new" : "used";
  }

  function updateSearchResultSummary({
    listingSection,
    listingGrid,
    visibleCount,
    selectedCategory,
    selectedStatus,
    maxPrice,
  }) {
    const categoryLabel =
      selectedCategory === "all" ? "all categories" : selectedCategory.replace("-", " ");
    const filters = [
      selectedStatus !== "all" ? `${selectedStatus} items` : "",
      maxPrice ? `up to $${maxPrice}/day` : "",
    ].filter(Boolean);
    const detail = filters.length ? ` matching ${filters.join(", ")}` : "";
    const summaryText = `${visibleCount} item${visibleCount === 1 ? "" : "s"} found in ${categoryLabel}${detail}.`;

    let summary = listingSection.querySelector("[data-search-summary]");
    if (!summary) {
      summary = document.createElement("div");
      summary.className = "search-results-summary";
      summary.dataset.searchSummary = "true";
      listingGrid.parentNode.insertBefore(summary, listingGrid);
    }
    summary.innerHTML = `<strong>${summaryText}</strong><span>Search filters from the home page are applied below.</span>`;

    const countText = listingSection.querySelector(".text-muted strong");
    if (countText) countText.textContent = `${visibleCount} items`;

    let emptyState = listingSection.querySelector("[data-no-results]");
    if (!emptyState) {
      emptyState = document.createElement("div");
      emptyState.className = "no-results-message";
      emptyState.dataset.noResults = "true";
      emptyState.innerHTML = `<i class="bi bi-search"></i><h3>No matching rentals found</h3><p>Try a higher price range or another category.</p><a href="index.html" class="btn-accent-custom">Back to Search</a>`;
      listingGrid.parentNode.insertBefore(emptyState, listingGrid.nextSibling);
    }
    emptyState.hidden = visibleCount !== 0;
  }

  function installItemDetailLinks() {
    if (!window.CityRentItemService) return;

    document.querySelectorAll(".motorx-card").forEach((card) => {
      const title = card.querySelector(".motorx-card-body h3")?.textContent || "";
      const item = window.CityRentItemService.getItemByTitle(title);
      const link = card.querySelector('a.view-details[href*="item-details.html"]');
      if (item && link) {
        link.href = `item-details.html?id=${encodeURIComponent(item.id)}`;
      }
    });
  }

  function normalize(value) {
    return value.toString().trim().toLowerCase();
  }

  function supportWidgetMarkup() {
    return `<section class="cw-support-widget" data-cw-support aria-label="CityWide customer support chat">
      <button class="cw-support-launcher" type="button" data-cw-chat-open aria-label="Open CityWide support chat" aria-expanded="false">
        <i class="bi bi-headset"></i>
        <span>Support</span>
      </button>

      <div class="cw-chat-panel" data-cw-chat-panel aria-hidden="true">
        <header class="cw-chat-header">
          <div class="cw-chat-avatar" aria-hidden="true"><i class="bi bi-buildings"></i></div>
          <div class="cw-chat-title">
            <h2>CityWide Support</h2>
            <p><span></span>Online assistant</p>
          </div>
          <div class="cw-chat-actions">
            <button type="button" data-cw-chat-clear aria-label="Clear chat" title="Clear chat"><i class="bi bi-trash3"></i></button>
            <button type="button" data-cw-chat-minimize aria-label="Minimize chat" title="Minimize chat"><i class="bi bi-dash-lg"></i></button>
            <button type="button" data-cw-chat-close aria-label="Close chat" title="Close chat"><i class="bi bi-x-lg"></i></button>
          </div>
        </header>

        <div class="cw-chat-messages" data-cw-chat-messages role="log" aria-live="polite" aria-relevant="additions"></div>

        <div class="cw-chat-suggestions" data-cw-chat-suggestions aria-label="Suggested questions">
          <button type="button">How do I submit a complaint?</button>
          <button type="button">How do I track my request?</button>
          <button type="button">How do I register?</button>
          <button type="button">How do I update my profile?</button>
          <button type="button">What services are available?</button>
        </div>

        <form class="cw-chat-form" data-cw-chat-form>
          <label class="visually-hidden" for="cw-chat-input">Ask CityWide support</label>
          <textarea id="cw-chat-input" data-cw-chat-input rows="1" placeholder="Ask about CityWide services..."></textarea>
          <button type="submit" data-cw-chat-send aria-label="Send message"><i class="bi bi-send-fill"></i></button>
        </form>
      </div>
    </section>`;
  }

  function installSupportChatbot() {
    if (document.querySelector("[data-cw-support]")) return;

    document.body.insertAdjacentHTML("beforeend", supportWidgetMarkup());

    const widget = document.querySelector("[data-cw-support]");
    const launcher = widget.querySelector("[data-cw-chat-open]");
    const panel = widget.querySelector("[data-cw-chat-panel]");
    const closeButton = widget.querySelector("[data-cw-chat-close]");
    const minimizeButton = widget.querySelector("[data-cw-chat-minimize]");
    const clearButton = widget.querySelector("[data-cw-chat-clear]");
    const form = widget.querySelector("[data-cw-chat-form]");
    const input = widget.querySelector("[data-cw-chat-input]");
    const sendButton = widget.querySelector("[data-cw-chat-send]");
    const messages = widget.querySelector("[data-cw-chat-messages]");
    const suggestions = widget.querySelector("[data-cw-chat-suggestions]");

    const welcomeMessage =
      "Hello, I am the CityWide support assistant. I can help with registration, login, service requests, complaints, tracking, profile updates, notifications, and platform navigation.";
    let chatHistory = [];
    let isRequestPending = false;
    let typingRow = null;

    addMessage("bot", welcomeMessage);

    launcher.addEventListener("click", openChat);
    closeButton.addEventListener("click", closeChat);
    minimizeButton.addEventListener("click", toggleMinimize);
    clearButton.addEventListener("click", clearChat);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendUserMessage(input.value);
    });

    input.addEventListener("input", resizeInput);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    suggestions.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button) sendUserMessage(button.textContent);
    });

    function openChat() {
      widget.classList.add("is-open");
      widget.classList.remove("is-minimized");
      panel.setAttribute("aria-hidden", "false");
      launcher.setAttribute("aria-expanded", "true");
      window.setTimeout(() => input.focus(), 160);
      scrollMessages();
    }

    function closeChat() {
      widget.classList.remove("is-open", "is-minimized");
      panel.setAttribute("aria-hidden", "true");
      launcher.setAttribute("aria-expanded", "false");
    }

    function toggleMinimize() {
      const isMinimized = widget.classList.toggle("is-minimized");
      minimizeButton.setAttribute(
        "aria-label",
        isMinimized ? "Restore chat" : "Minimize chat",
      );
      minimizeButton.setAttribute(
        "title",
        isMinimized ? "Restore chat" : "Minimize chat",
      );
      if (!isMinimized) {
        input.focus();
        scrollMessages();
      }
    }

    function clearChat() {
      if (isRequestPending) return;
      chatHistory = [];
      messages.innerHTML = "";
      addMessage("bot", welcomeMessage);
    }

    async function sendUserMessage(rawMessage) {
      const userMessage = rawMessage.trim();
      if (!userMessage || isRequestPending) return;

      addMessage("user", userMessage);
      input.value = "";
      resizeInput();

      if (API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
        console.error(
          "Gemini API Error: API_KEY is still the placeholder. Paste a new Gemini API key into js/shared-ui.js.",
        );
        addMessage(
          "bot",
          "CityWide AI support is ready to connect. Paste your Gemini API key into the API_KEY constant in js/shared-ui.js to enable live responses.",
        );
        return;
      }

      chatHistory.push({ role: "user", text: userMessage });
      setPendingState(true);
      showTypingIndicator();

      try {
        const botReply = await requestGeminiReply();
        removeTypingIndicator();
        addMessage("bot", botReply);
        chatHistory.push({ role: "model", text: botReply });
      } catch (error) {
        console.error("Gemini API Error:", error);
        if (error.request) console.log("Gemini Failed Request:", error.request);
        if (error.response) console.log("Gemini Failed Response:", error.response);
        console.error("CityWide support chatbot error:", error);
        removeTypingIndicator();
        addMessage(
          "bot",
          "I am having trouble connecting to CityWide AI support right now. Please try again in a moment or contact CityWide support for urgent help.",
        );
      } finally {
        setPendingState(false);
      }
    }

    async function requestGeminiReply() {
      const requestBody = {
        system_instruction: {
          parts: [{ text: CITYWIDE_SUPPORT_PROMPT }],
        },
        contents: chatHistory.map((message) => ({
          role: message.role,
          parts: [{ text: message.text }],
        })),
        generationConfig: {
          temperature: 1.0,
          topP: 0.9,
          maxOutputTokens: 450,
        },
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify(requestBody),
      };

      console.log("Gemini Request URL:", API_URL);
      console.log("Gemini Request:", {
        method: requestOptions.method,
        url: API_URL,
        headers: {
          "Content-Type": requestOptions.headers["Content-Type"],
          "x-goog-api-key": API_KEY ? "[REDACTED: API_KEY is set]" : "[MISSING]",
        },
        body: requestBody,
      });

      let response;
      let data;

      try {
        response = await fetch(API_URL, {
          method: requestOptions.method,
          headers: requestOptions.headers,
          body: requestOptions.body,
        });
      } catch (fetchError) {
        fetchError.request = {
          url: API_URL,
          method: requestOptions.method,
          headers: {
            "Content-Type": requestOptions.headers["Content-Type"],
            "x-goog-api-key": API_KEY ? "[REDACTED: API_KEY is set]" : "[MISSING]",
          },
          body: requestBody,
        };
        console.error("Gemini fetch failed before receiving an HTTP response:", fetchError);
        throw fetchError;
      }

      console.log("Gemini HTTP Status:", response.status, response.statusText);

      const responseText = await response.text();
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        data = responseText;
        console.error("Gemini response JSON parse error:", parseError);
      }

      console.log("Gemini Response:", data);

      if (!response.ok) {
        const apiMessage =
          data?.error?.message ||
          data?.error?.status ||
          response.statusText ||
          "Unknown Gemini API error";
        if (
          response.status === 403 &&
          /api key|permission_denied|leaked/i.test(`${apiMessage} ${data?.error?.status || ""}`)
        ) {
          console.error(
            "Gemini API key problem: the configured API key is invalid, blocked, or reported as leaked. Generate a new Gemini API key and paste it into API_KEY.",
          );
        }
        const error = new Error(
          `Gemini API returned ${response.status} ${response.statusText}: ${apiMessage}`,
        );
        error.status = response.status;
        error.statusText = response.statusText;
        error.response = data;
        error.request = {
          url: API_URL,
          method: requestOptions.method,
          headers: {
            "Content-Type": requestOptions.headers["Content-Type"],
            "x-goog-api-key": API_KEY ? "[REDACTED: API_KEY is set]" : "[MISSING]",
          },
          body: requestBody,
        };
        throw error;
      }

      const reply = data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

      if (!reply) {
        const error = new Error("Gemini API returned an empty response");
        error.response = data;
        error.request = {
          url: API_URL,
          method: requestOptions.method,
          headers: {
            "Content-Type": requestOptions.headers["Content-Type"],
            "x-goog-api-key": API_KEY ? "[REDACTED: API_KEY is set]" : "[MISSING]",
          },
          body: requestBody,
        };
        throw error;
      }

      return reply;
    }

    function addMessage(sender, text) {
      const row = document.createElement("div");
      row.className = `cw-chat-message ${sender}`;

      const bubble = document.createElement("div");
      bubble.className = "cw-chat-bubble";
      bubble.textContent = text;

      const time = document.createElement("time");
      const now = new Date();
      time.className = "cw-chat-time";
      time.dateTime = now.toISOString();
      time.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      row.append(bubble, time);
      messages.appendChild(row);
      scrollMessages();
    }

    function showTypingIndicator() {
      typingRow = document.createElement("div");
      typingRow.className = "cw-chat-message bot";
      typingRow.setAttribute("aria-label", "CityWide support is typing");
      typingRow.innerHTML =
        '<div class="cw-chat-bubble cw-chat-typing"><span></span><span></span><span></span></div>';
      messages.appendChild(typingRow);
      scrollMessages();
    }

    function removeTypingIndicator() {
      if (typingRow) {
        typingRow.remove();
        typingRow = null;
      }
    }

    function setPendingState(isPending) {
      isRequestPending = isPending;
      sendButton.disabled = isPending;
      input.disabled = isPending;
      suggestions.querySelectorAll("button").forEach((button) => {
        button.disabled = isPending;
      });
    }

    function resizeInput() {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 118)}px`;
    }

    function scrollMessages() {
      window.requestAnimationFrame(() => {
        messages.scrollTop = messages.scrollHeight;
      });
    }
  }

  function initSharedUI() {
    if (document.body?.dataset.sharedUiReady === "true") return;
    if (document.body) document.body.dataset.sharedUiReady = "true";
    const body = document.body;
    enforceRoleAccess();
    if (body.dataset.publicShell === "true") installPublicShell();
    if (body.dataset.dashboardShell)
      installDashboardShell(shellRole(body.dataset.dashboardShell));
    installLanguageControls();
    installThemeToggle();
    installLogoutButtons();
    installHomeHeroSlider();
    installHomeSearchFlow();
    installItemDetailLinks();
    installListingSearchFilters();
    installSupportChatbot();
    applyLanguage(currentLanguage());
    observeLanguageUpdates();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSharedUI);
  } else {
    initSharedUI();
  }
})();
