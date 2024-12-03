// Event listener for password visibility toggle
document.querySelectorAll(".toggle-password").forEach(function (toggleButton) {
  toggleButton.addEventListener("click", function () {
    // Find the related password input field based on the closest parent element
    const passwordInput = toggleButton.closest(".d-flex").querySelector(".password-input");
    const eyeOpen = toggleButton.querySelector("#eye-open");
    const eyeClosed = toggleButton.querySelector("#eye-closed");

    // Toggle the visibility of the password
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeOpen.classList.add("d-none");
      eyeClosed.classList.remove("d-none");
    } else {
      passwordInput.type = "password";
      eyeOpen.classList.remove("d-none");
      eyeClosed.classList.add("d-none");
    }
  });
});
