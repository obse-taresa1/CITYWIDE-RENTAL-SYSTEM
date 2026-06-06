function readJsonStore(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch (error) {
    localStorage.setItem(key, "[]");
    return [];
  }
}

function writeJsonStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-topic").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || name.length < 2) {
      alert("Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!subject) {
      alert("Please select a subject.");
      return;
    }

    if (!message || message.length < 10) {
      alert("Please enter a message with at least 10 characters.");
      return;
    }

    const messages = readJsonStore("contactMessages");
    messages.push({
      messageId: "CM-" + Date.now(),
      senderName: name,
      senderEmail: email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "Unread",
    });

    writeJsonStore("contactMessages", messages);
    form.reset();

    const successBanner = document.getElementById("message-sent");
    if (successBanner) {
      successBanner.style.display = "flex";
      successBanner.focus();
    }
  });
});
