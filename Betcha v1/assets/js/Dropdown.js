//dropdown update text
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("dropdown");
  const button = dropdown.querySelector(".btn.dropdown-toggle");
  const items = dropdown.querySelectorAll(".dropdown-item");
  let currentIndex = -1;

  // Function to set focus on a specific item
  const focusItem = (index) => {
    if (index >= 0 && index < items.length) {
      items[index].focus();
    }
  };

  // Handle keyboard navigation
  button.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      focusItem(currentIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      focusItem(currentIndex);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dropdown.classList.toggle("show");
      button.setAttribute(
        "aria-expanded",
        dropdown.classList.contains("show").toString()
      );
      if (dropdown.classList.contains("show")) {
        currentIndex = 0;
        focusItem(currentIndex);
      }
    }
  });

  // Handle item selection with keyboard
  items.forEach((item, index) => {
    item.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex = (index + 1) % items.length;
        focusItem(currentIndex);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex = (index - 1 + items.length) % items.length;
        focusItem(currentIndex);
      } else if (e.key === "Enter") {
        e.preventDefault();
        button.textContent = this.textContent;
        dropdown.classList.remove("show");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      } else if (e.key === "Escape") {
        dropdown.classList.remove("show");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    });

    // Handle mouse clicks
    item.addEventListener("click", function (e) {
      e.preventDefault();
      button.textContent = this.textContent;
      dropdown.classList.remove("show");
      button.setAttribute("aria-expanded", "false");
    });
  });
});
