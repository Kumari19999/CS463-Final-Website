// Interactivity: year update + form validation + "fake submit" feedback

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

function isValidEmail(email) {
  // simple email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function setValid(inputEl, ok) {
  inputEl.classList.toggle("is-invalid", !ok);
  inputEl.classList.toggle("is-valid", ok);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameOk = nameEl.value.trim().length >= 2;
  const emailOk = isValidEmail(emailEl.value);
  const msgOk = msgEl.value.trim().length >= 10;

  setValid(nameEl, nameOk);
  setValid(emailEl, emailOk);
  setValid(msgEl, msgOk);

  if (!nameOk || !emailOk || !msgOk) {
    statusEl.textContent = "Please fix the highlighted fields and try again.";
    statusEl.className = "small text-danger";
    return;
  }

  // Fake send (no backend). This still counts as form submission interactivity.
  submitBtn.disabled = true;
  statusEl.textContent = "Sending...";
  statusEl.className = "small text-muted";

  setTimeout(() => {
    statusEl.textContent = "Message sent! Thanks — I’ll reply soon.";
    statusEl.className = "small text-success";
    form.reset();

    // Remove green borders after reset
    [nameEl, emailEl, msgEl].forEach((el) => {
      el.classList.remove("is-valid", "is-invalid");
    });

    submitBtn.disabled = false;
  }, 900);
});