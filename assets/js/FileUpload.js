document.addEventListener("DOMContentLoaded", function () {
    const inputDiv = document.getElementById("input-image-div");
    const fileInput = document.getElementById("input-unit-image");
    const label = document.getElementById("file-input-label");
    const previewContainer = document.getElementById("image-preview-container");

    // Trigger file input click when clicking on the div
    inputDiv.addEventListener("click", function (e) {
        if (e.target === label || e.target === fileInput) return;
        fileInput.click(); // Trigger the file input click
    });

    // Handle file selection and image previews
    fileInput.addEventListener("change", function () {
        const files = Array.from(fileInput.files);
        const imageFiles = files.filter(file => file.type.startsWith("image/"));

        // Clear previous previews
        previewContainer.innerHTML = "";

        if (imageFiles.length > 0) {
            previewContainer.style.display = "flex"; // Ensure container is visible
            label.textContent = `${imageFiles.length} image(s) selected`;

            // Create previews for each selected image
            imageFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;

                    const imagePreview = document.createElement("div");
                    imagePreview.classList.add("image-preview");

                    // Add the close button
                    const closeButton = document.createElement("button");
                    closeButton.classList.add("remove-btn");
                    closeButton.innerHTML = `<i class="fa fa-times"></i>`;
                    closeButton.addEventListener("click", function () {
                        // Remove the image preview
                        imagePreview.remove();

                        // Update the file list
                        const newFileList = new DataTransfer();
                        Array.from(fileInput.files).forEach((f) => {
                            if (f !== file) {
                                newFileList.items.add(f);
                            }
                        });
                        fileInput.files = newFileList.files;

                        // Update the label
                        if (fileInput.files.length > 0) {
                            label.textContent = `${fileInput.files.length} image(s) selected`;
                        } else {
                            label.textContent = "Choose an Image";
                            previewContainer.style.display = "none"; // Hide container if no files
                        }
                    });

                    imagePreview.appendChild(img);
                    imagePreview.appendChild(closeButton);
                    previewContainer.appendChild(imagePreview);
                };
                reader.readAsDataURL(file);
            });
        } else {
            label.textContent = "Choose an Image";
            fileInput.value = ""; // Reset the input
            previewContainer.style.display = "none"; // Hide the container
            console.log('Upload Image',"Please upload only image files.");
        }
    });
});
