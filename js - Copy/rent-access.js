(function () {
  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      return null;
    }
  }

  function normalizedRole(user) {
    return (user?.role || "").toLowerCase();
  }

  function canRent(role) {
    return ["renter", "lessee", "both"].includes(role);
  }

  function rentBlockedMessage(role) {
    if (role === "lessor") {
      return "Lessors cannot rent items. Change your role to Both if you want to rent and list items.";
    }
    if (role === "admin" || role === "supervisor") return "Administrators cannot rent items.";
    if (role === "superadmin" || role === "super-admin") return "Super Administrators cannot rent items.";
    return "Please log in to rent this item.";
  }

  function fallbackUrl() {
    const pending = localStorage.getItem("pendingRental");
    if (pending) return `item-details.html?id=${encodeURIComponent(pending)}`;
    if (document.referrer && document.referrer.startsWith(window.location.origin)) return document.referrer;
    return "index.html";
  }

  function protectBookingPage() {
    if (!window.location.pathname.endsWith("booking.html")) return;
    const user = currentUser();
    const role = normalizedRole(user);

    if (!user) {
      sessionStorage.setItem("rentAccessMessage", "Please log in to rent this item.");
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.replace("login.html");
      return;
    }

    if (!canRent(role)) {
      sessionStorage.setItem("rentAccessMessage", rentBlockedMessage(role));
      window.location.replace(fallbackUrl());
    }
  }

  window.CityRentRentAccess = {
    currentUser,
    normalizedRole,
    canRent,
    rentBlockedMessage,
  };

  protectBookingPage();
})();
