document.querySelector('.profile-picture-wrapper').addEventListener('click', function () {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    
    // Validate file type
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            // Update the profile picture
            document.getElementById('profile-profile-picture').src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    } else {
        alertCustom('File Upload','Please select a valid image file.');
    }
});
