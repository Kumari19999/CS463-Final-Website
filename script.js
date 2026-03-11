// Interactivity: year update + form validation + "fake submit" feedback

//File: script.js
//Author: Wasana Pallebage
//Course: CS463 – Web Development
//Project: Final Portfolio Website

//Purpose:
//This file adds interactivity to the portfolio website.
//It updates the footer year automatically and validates
//the contact form before showing a fake success message.

//Input:
//User input from the contact form fields:
//name, email, and message.

//Output:
//Displays validation feedback, error messages,
//and a fake submission success message.

//Notes:
//This script uses basic JavaScript, regular expressions,
//and Bootstrap validation classes.

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");


//Function: isValidEmail
//Purpose: Check whether the email entered by the user matches a basic email format.
//Input: email - a string entered by the user in the email field
//Output: Returns true if the email format is valid, otherwise false
//Notes: Uses a regular expression for simple email validation
function isValidEmail(email) {
  // simple email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}


//Function: setValid
//Purpose: Apply valid or invalid Bootstrap classes to a form input field
//Input: inputEl - the input or textarea element being checked
//ok - boolean value indicating whether the input is valid
//Output:Updates the CSS classes of the given input element
//Notes:Adds "is-valid" when correct
//Adds "is-invalid" when incorrect

function setValid(inputEl, ok) {
  inputEl.classList.toggle("is-invalid", !ok);
  inputEl.classList.toggle("is-valid", ok);
}


//Event: Contact form submission
//Purpose: Validate all form fields, prevent empty or invalid input,
//and simulate sending the message without a backend.
//Input:User submission of the contact form
//Output:Displays error feedback if fields are invalid
//Displays a temporary "Sending..." message
//Displays a success message after validation passes
//Notes:This uses a fake submission with setTimeout because
//there is no backend server connected to the form.

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
    //Loop Purpose://Remove validation border styles after the form resets
    //Input: Each form field stored in the array
    //Output: Clears "is-valid" and "is-invalid" classes
    //Notes: Keeps the form visually clean after submission
    
    [nameEl, emailEl, msgEl].forEach((el) => {
      el.classList.remove("is-valid", "is-invalid");
    });

    submitBtn.disabled = false;
  }, 900);
});