// Profile elements
const fileInput = document.getElementById('file-input');
const profilePicture = document.getElementById('pfp-edit');
const profileOverlay = document.getElementById('profile-overlay');
const cameraIcon = document.getElementById('camera-icon');

// Make the file input clickable by clicking on the profile picture wrapper
document.querySelector('.profile-picture-wrapper').addEventListener('click', function () {
    fileInput.click();
});

// Event listener for when a file is selected
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    // Validate file type
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Update the profile picture with the uploaded file
            profilePicture.src = e.target.result;

            // Optional: Hide overlay or add any specific action
            profileOverlay.style.display = 'none';  // Hide the overlay after upload, if desired
        };

        // Read the file as a Data URL
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
});
