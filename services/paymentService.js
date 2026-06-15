(function () {
  const ETB_LOCALE = "en-ET";
  const PAYMENT_METHODS = ["Telebirr", "CBE Birr", "E-birr"];

  function formatETB(amount) {
    const numericAmount = Number(amount || 0);
    return `ETB ${numericAmount.toLocaleString(ETB_LOCALE, {
      maximumFractionDigits: 0,
    })}`;
  }

  function simulatedSuccess(method, amount, bookingId) {
    return Promise.resolve({
      success: true,
      method,
      amount,
      bookingId,
      transactionId: `${method.replace(/\W+/g, "").toUpperCase()}-${Date.now()}`,
      processedAt: new Date().toISOString(),
      locale: "Ethiopia",
      currency: "ETB",
    });
  }

  function processTelebirrPayment({ amount, bookingId } = {}) {
    return simulatedSuccess("Telebirr", amount, bookingId);
  }

  function processCBEBirrPayment({ amount, bookingId } = {}) {
    return simulatedSuccess("CBE Birr", amount, bookingId);
  }

  function processEBirrPayment({ amount, bookingId } = {}) {
    return simulatedSuccess("E-birr", amount, bookingId);
  }

  async function processPayment(method, payload = {}) {
    if (method === "Telebirr") return processTelebirrPayment(payload);
    if (method === "CBE Birr") return processCBEBirrPayment(payload);
    if (method === "E-birr") return processEBirrPayment(payload);
    throw new Error("Unsupported Ethiopian payment method.");
  }

  window.CityRentPaymentService = {
    PAYMENT_METHODS,
    currency: "ETB",
    locale: "Ethiopia",
    formatETB,
    processTelebirrPayment,
    processCBEBirrPayment,
    processEBirrPayment,
    processPayment,
  };
})();
