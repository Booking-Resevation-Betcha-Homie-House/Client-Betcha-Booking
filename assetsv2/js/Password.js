document.querySelector(".toggle-password").addEventListener("click", function () {
    const passwordInput = document.getElementById("password-input");
    const eyeOpen = document.getElementById("eye-open");
    const eyeClosed = document.getElementById("eye-closed");

    // Toggle input type
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