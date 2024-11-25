document.addEventListener("DOMContentLoaded", () => {
      const checkboxes = document.querySelectorAll(".form-check-input");
      const modal = new bootstrap.Modal(
        document.getElementById("modal-transaction-status")
      );
      const confirmBtn = document.getElementById(
        "modal-transaction-status-confirm"
      );
      let currentCheckbox = null;

      // Add click listener to each checkbox
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent immediate toggle
          currentCheckbox = e.target; // Store the clicked checkbox
          modal.show(); // Show the modal
        });
      });

      // Confirm button logic
      confirmBtn.addEventListener("click", () => {
        if (currentCheckbox) {
          currentCheckbox.checked = true; // Check the checkbox
          currentCheckbox.disabled = true; // Disable the checkbox
          const label = currentCheckbox.nextElementSibling; // Find the label
          if (label) {
            label.classList.add("strike"); // Add strikethrough
          }
        }
        modal.hide(); // Hide the modal
      });
    });