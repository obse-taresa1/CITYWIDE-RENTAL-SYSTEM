(function () {
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (error) {
      localStorage.removeItem("currentUser");
      return null;
    }
  }

  function isAuthenticated() {
    const user = getCurrentUser();
    return Boolean(user && user.email && user.role);
  }

  window.CityRentAuthGuard = {
    getCurrentUser,
    isAuthenticated,
  };
})();
