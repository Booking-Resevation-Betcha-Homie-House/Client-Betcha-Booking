// Function to toggle password visibility
document.querySelectorAll(".toggle-password").forEach(function (toggle) {
  toggle.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling;
      const eyeOpen = this.querySelector(".eye-open");
      const eyeClosed = this.querySelector(".eye-closed");

      // Toggle the input type and icons
      if (passwordInput.type === "password") {
          passwordInput.type = "text";  // Show password as text
          eyeOpen.classList.add("d-none");  // Hide the open eye icon
          eyeClosed.classList.remove("d-none");  // Show the closed eye icon
      } else {
          passwordInput.type = "password";  // Hide the password
          eyeOpen.classList.remove("d-none");  // Show the open eye icon
          eyeClosed.classList.add("d-none");  // Hide the closed eye icon
      }
  });
});

// Function to initialize password field states on page load
window.addEventListener("load", function () {
  // Initialize password input (main password field)
  const passwordInput = document.getElementById("password-input");
  const eyeOpen = document.getElementById("eye-open");
  const eyeClosed = document.getElementById("eye-closed");

  passwordInput.type = "password";  // Start with the password hidden
  eyeOpen.classList.remove("d-none");  // Show the open eye icon
  eyeClosed.classList.add("d-none");  // Hide the closed eye icon

  // Force hide the default browser password visibility icon
  passwordInput.style.WebkitAppearance = "none";  // For webkit-based browsers (Chrome, Safari)
  passwordInput.style.MozAppearance = "none";    // For Firefox
  passwordInput.style.appearance = "none";       // For other browsers
  passwordInput.setAttribute("autocomplete", "off");  // Disable autocomplete

  // Add styles to hide the default eye (default browser icon)
  const style = document.createElement('style');
  style.innerHTML = `
      #password-input::-ms-reveal, 
      #password-input::-webkit-credentials-auto-fill-button {
          display: none !important;
      }
  `;
  document.head.appendChild(style);

  // Initialize confirm password input field
  const confirmPasswordInput = document.getElementById("reg-password-confirm");
  const confirmEyeOpen = document.getElementById("eye-open-2");
  const confirmEyeClosed = document.getElementById("eye-closed-2");

  confirmPasswordInput.type = "password";  // Start with the password hidden
  confirmEyeOpen.classList.remove("d-none");  // Show the open eye icon
  confirmEyeClosed.classList.add("d-none");  // Hide the closed eye icon

  // Force hide the default browser password visibility icon for confirm password
  confirmPasswordInput.style.WebkitAppearance = "none";
  confirmPasswordInput.style.MozAppearance = "none";
  confirmPasswordInput.style.appearance = "none";
  confirmPasswordInput.setAttribute("autocomplete", "off");

  // Add styles to hide the default eye (default browser icon) for confirm password
  const confirmStyle = document.createElement('style');
  confirmStyle.innerHTML = `
      #reg-password-confirm::-ms-reveal, 
      #reg-password-confirm::-webkit-credentials-auto-fill-button {
          display: none !important;
      }
  `;
  document.head.appendChild(confirmStyle);
});
