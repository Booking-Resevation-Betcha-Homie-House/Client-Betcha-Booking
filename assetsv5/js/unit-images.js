const prevButton = document.getElementById('unit-img-prev');
const nextButton = document.getElementById('unit-img-next');
const carousel = document.getElementById('image-carousel');
let currentIndex = 0;

const images = carousel.getElementsByTagName('img');
const totalImages = images.length;

function updateCarousel() {
    // Slide the images by changing the transform property
    carousel.style.transform = `translateX(-${currentIndex * 33.33}%)`; // 33.33% for 3 images
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages / 3 - 1; // Loop back to the last set of images
    }
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalImages / 3 - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first set of images
    }
    updateCarousel();
});

// Initialize the carousel
updateCarousel();
