 // JavaScript for image preview
    document.getElementById('imageInput').addEventListener('change', function () {
        const file = this.files[0];
        const preview = document.getElementById('image-preview');
        const errorMessage = document.getElementById('error-message-2');

        // Reset preview and error state
        preview.classList.add('d-none');
        errorMessage.classList.add('d-none');
        errorMessage.textContent = '';

        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.classList.remove('d-none');
                };
                reader.readAsDataURL(file);
            } else {
                errorMessage.textContent = 'Please upload a valid image file.';
                errorMessage.classList.remove('d-none');
            }
        } else {
            errorMessage.textContent = 'No file selected. Please choose an image.';
            errorMessage.classList.remove('d-none');
        }
    });