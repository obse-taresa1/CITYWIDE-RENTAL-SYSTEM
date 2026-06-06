(() => {
  const API_KEY = "AIzaSyAhn4sWBnTRvZhXRwFllZ6RRkJ1Nh_PakY";
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

  const navLinks = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "our-story.html", label: "About", key: "about" },
    { href: "contact.html", label: "Contact", key: "contact" },
    { href: "items.html", label: "Search/Browse Items", key: "items" },
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
      ["booking.html", "bi-calendar-check", "Bookings"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["profile.html", "bi-person-circle", "Profile"],
      ["items.html", "bi-search", "Browse Items"],
    ],
    lessor: [
      ["lessor-dashboard.html", "bi-speedometer2", "Overview"],
      ["list-item.html", "bi-plus-circle", "List Item"],
      ["booking.html", "bi-calendar2-week", "Bookings"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["profile.html", "bi-person-circle", "Profile"],
    ],
    both: [
      ["both-dashboard.html", "bi-grid-1x2", "Overview"],
      ["items.html", "bi-search", "Find Rentals"],
      ["list-item.html", "bi-plus-circle", "List Item"],
      ["booking.html", "bi-calendar-check", "Bookings"],
      ["messages.html", "bi-chat-dots", "Messages"],
      ["profile.html", "bi-person-circle", "Profile"],
    ],
    admin: [
      ["admin.html", "bi-speedometer2", "Overview"],
      ["admin.html#users", "bi-people", "User Management"],
      ["admin.html#listings", "bi-box-seam", "Listing Management"],
      ["admin.html#disputes", "bi-exclamation-triangle", "Disputes"],
      ["admin.html#reports", "bi-bar-chart", "Reports"],
    ],
    "super-admin": [
      ["super-admin-dashboard.html", "bi-shield-check", "Overview"],
      [
        "super-admin-dashboard.html#admins",
        "bi-person-badge",
        "Admin Management",
      ],
      ["super-admin-dashboard.html#settings", "bi-gear", "System Settings"],
      [
        "super-admin-dashboard.html#analytics",
        "bi-graph-up-arrow",
        "Analytics",
      ],
      ["super-admin-dashboard.html#logs", "bi-journal-text", "System Logs"],
    ],
  };

  const roleLabels = {
    user: "Dashboard",
    lessee: "Lessee Dashboard",
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
          <a href="profile.html"><i class="bi bi-person"></i> Profile</a>
          <a href="dashboard.html"><i class="bi bi-speedometer2"></i> Dashboard</a>
          <a href="messages.html"><i class="bi bi-chat-dots"></i> Messages</a>
          <a href="login.html"><i class="bi bi-box-arrow-right"></i> Sign out</a>
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
          <a href="profile.html"><i class="bi bi-person"></i> Profile</a>
          <a href="${dashboardForRole(user?.role)}"><i class="bi bi-speedometer2"></i> Dashboard</a>
        </div>
      </details>
      <button class="nav-login nav-logout-btn" type="button" data-logout>Logout</button>
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
          `<li><a href="${link.href}" class="${link.key === active ? "active" : ""}">${link.label}</a></li>`,
      )
      .join("");
    const authButtons = isAuthenticated()
      ? publicAccountActions()
      : '<div class="public-auth-actions"><a href="login.html" class="nav-login">Login / Register</a></div>';
    return `<header class="motorx-header app-public-header">
      <div class="container"><div class="motorx-nav-flex">
        <a class="motorx-logo" href="index.html"><img src="images/logo.png" alt="CityRent Logo"></a>
        <input type="checkbox" id="nav-toggle" class="nav-check" aria-label="Open menu">
        <label for="nav-toggle" class="nav-toggler-label"><i class="bi bi-list"></i></label>
        <nav class="motorx-nav-menu"><ul class="motorx-nav-links">${links}</ul><div class="motorx-nav-actions">${themeToggle()}${authButtons}</div></nav>
      </div></div>
    </header>`;
  }

  function footer() {
    return `<footer class="motorx-footer">
      <div class="container"><div class="footer-flex">
        <div><a class="motorx-logo text-white mb-3 d-inline-block" href="index.html"><img src="images/logo.png" alt="CityRent Logo"></a><p class="small">Citywide Item Rental System - trusted rentals across your city.</p></div>
        <div><h5>About</h5><a href="our-story.html">Our Story</a><a href="careers.html">Careers</a></div>
        <div><h5>Contact</h5><a href="contact.html">Contact Us</a><a href="mailto:support@cityrent.com">support@cityrent.com</a></div>
        <div><h5>Legal</h5><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms</a></div>
        <div><div class="top-bar-social"><a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a></div></div>
      </div><div class="footer-bottom"><p class="mb-0">&copy; 2026 CityRent. All rights reserved.</p></div></div>
    </footer>`;
  }

  function dashboardHeader(role) {
    return `<header class="motorx-header dashboard-topbar">
      <div class="container-fluid px-3"><div class="motorx-nav-flex">
        <a class="motorx-logo dashboard-logo" href="index.html"><img src="images/logo.png" alt="CityRent Logo"></a>
        <div class="dashboard-topbar-title">${roleLabels[role] || "Dashboard"}</div>
        <div class="motorx-nav-actions">${themeToggle()}${userActions()}<a href="index.html" class="nav-login" onclick="if (typeof logout === 'function') logout()">Logout</a></div>
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
        return `<a href="${href}" class="${isActive ? "active" : ""}"><i class="bi ${icon}"></i><span>${label}</span></a>`;
      })
      .join("");
    return `<aside class="sidebar dashboard-sidebar"><nav class="sidebar-nav">${links}<a class="logout-link" href="login.html"><i class="bi bi-box-arrow-right"></i><span>Logout</span></a></nav></aside>`;
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

      if (title) title.textContent = activeSlide.dataset.title || "";
      if (subtitle) subtitle.textContent = activeSlide.dataset.subtitle || "";
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
      const type = (formData.get("type") || "any").toString();
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
      if (type !== "any") params.set("type", type);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (status !== "all") params.set("status", status);

      window.location.href = `${target}?${params.toString()}`;
    });
  }

  function installListingSearchFilters() {
    const params = new URLSearchParams(window.location.search);
    const hasSearchFilters = ["category", "type", "maxPrice", "status"].some((key) =>
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
    const selectedType = params.get("type") || "any";
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
      const typeMatches =
        selectedType === "any" || cardText.includes(normalize(selectedType));
      const priceMatches = !maxPrice || price <= maxPrice;
      const statusMatches =
        selectedStatus === "all" || status === selectedStatus;
      const shouldShow =
        categoryMatches && typeMatches && priceMatches && statusMatches;

      cardWrapper.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    updateSearchResultSummary({
      listingSection,
      listingGrid,
      visibleCount,
      selectedCategory,
      selectedType,
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
    selectedType,
    selectedStatus,
    maxPrice,
  }) {
    const categoryLabel =
      selectedCategory === "all" ? "all categories" : selectedCategory.replace("-", " ");
    const filters = [
      selectedType !== "any" ? `${selectedType} type` : "",
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
      emptyState.innerHTML = `<i class="bi bi-search"></i><h3>No matching rentals found</h3><p>Try a broader item type, a higher price range, or another category.</p><a href="index.html" class="btn-accent-custom">Back to Search</a>`;
      listingGrid.parentNode.insertBefore(emptyState, listingGrid.nextSibling);
    }
    emptyState.hidden = visibleCount !== 0;
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

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    if (body.dataset.publicShell === "true") installPublicShell();
    if (body.dataset.dashboardShell)
      installDashboardShell(body.dataset.dashboardShell);
    installThemeToggle();
    installLogoutButtons();
    installHomeHeroSlider();
    installHomeSearchFlow();
    installListingSearchFilters();
    installSupportChatbot();
  });
})();
