(function () {
  const dashboardByRole = {
    lessee: "lessee-dashboard.html",
    renter: "lessee-dashboard.html",
    lessor: "lessor-dashboard.html",
    both: "both-dashboard.html",
    admin: "dashboard.html",
    supervisor: "dashboard.html",
    superadmin: "super-dashboard.html",
  };

  function dashboardForRole(role) {
    return dashboardByRole[(role || "").toLowerCase()] || "login.html";
  }

  function redirectToDashboardByRole(role, itemId) {
    const dashboard = dashboardForRole(role);
    const params = new URLSearchParams();
    if (itemId) {
      params.set("itemId", itemId);
      params.set("action", "rent");
    }
    window.location.href = params.toString() ? `${dashboard}?${params.toString()}` : dashboard;
  }

  window.CityRentDashboardRouter = {
    dashboardForRole,
    redirectToDashboardByRole,
  };
})();
