document.addEventListener("DOMContentLoaded", () => {
    // Get the elements
    const imagesBooking = document.getElementById("Images-booking");
    const map = document.getElementById("map");
    const btnViewMap = document.getElementById("btn-view-map");
    const btnViewBook = document.getElementById("btn-view-book");
    const rightContent = document.querySelector(".right-content");

    const isMobile = () => window.innerWidth <= 768;

    // Default states
    const applyDefaultState = () => {
        if (isMobile()) {
            rightContent.style.display = "none"; // Ensure hidden on mobile
        } else {
            rightContent.style.display = "flex"; // Ensure visible on desktop
            imagesBooking.style.display = "block"; // Default to showing images
            map.style.display = "none"; // Default to hiding the map
        }
    };

    // Apply the default state initially
    applyDefaultState();

    // Add event listeners for buttons
    btnViewMap.addEventListener("click", () => {
        if (!isMobile()) {
            imagesBooking.style.display = "none";
            map.style.display = "block";
        }
    });

    btnViewBook.addEventListener("click", () => {
        if (!isMobile()) {
            map.style.display = "none";
            imagesBooking.style.display = "block";
        }
    });

    // Update states on window resize
    window.addEventListener("resize", applyDefaultState);
});
