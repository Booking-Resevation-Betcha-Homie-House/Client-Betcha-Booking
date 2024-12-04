const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

//done pero need pa i pacheck
async function userloadUnitData() {

    try {
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getUnitById/${refID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch unit data');
        }
        console.log('Unit ID from URL: ', refID);
        const unit = await response.json();

        document.getElementById('user-view-unit-name').innerHTML = unit.unitName;
        document.getElementById('view-unit-loc-1').innerHTML = unit.location;
        document.getElementById('view-unit-pax').innerHTML = unit.maxPax;
        document.getElementById('view-unit-category').innerHTML = unit.category;
        document.getElementById('unit-price').innerHTML = unit.unitPrice;
        document.getElementById('view-unit-desc').innerHTML = unit.description;
        document.getElementById('other-amenities').innerHTML =unit.otherAmenities;
        document.getElementById('map-container').innerHTML = unit.maplink;
        
        const containerAmenities = document.getElementById('amenities');
        
        let itemnumber = 1;
        console.log(unit.amenities);
        
        Object.entries(unit.amenities).forEach(([amenity, isAvailable]) => {
            const itemElement = document.getElementById(`item${itemnumber}`);
            const divElement = document.getElementById(`formCheck-${itemnumber}`);
            const existingAmenity = document.getElementById(`formCheck-${itemnumber}`);
            console.log(itemElement);
        
            if (itemElement && isAvailable) {
                // If the amenity is not already appended, create and append it
                if (!existingAmenity) {
                    // Create the main container div for available amenities
                    const amenityDiv = document.createElement('div');
                    amenityDiv.className = 'col-6 pb-1';
                    amenityDiv.id = `bathroom-${itemnumber}`;
        
                    // Create the label element for the amenity
                    const label = document.createElement('label');
                    label.className = 'form-check-label';
                    label.textContent = itemElement.innerText;
        
                    // Append the label to the main container
                    amenityDiv.appendChild(label);
        
                    // Ensure containerAmenities is defined before appending
                    if (containerAmenities) {
                        containerAmenities.appendChild(amenityDiv);
                    }
                }
            } else if (divElement && !isAvailable) {
                // If the amenity is not available, remove the corresponding div
                divElement.remove();
            }
        
            itemnumber++;
        });

        const imgcontainer = document.getElementById('img-selection');
        const imgpreview = document.getElementById('image-preview');
        imgpreview.src = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`;
        unit.UnitImages.forEach((image, index) => {
            const imageUrl = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;
    
            // Create the img element
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.classList.add('unit-image-small');
        
            // Append the img directly to imgcontainer
            imgElement.onclick = () => {
               imgpreview.src = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`
            }
            imgcontainer.appendChild(imgElement);
        });
        

        
        
        

/*
        const carouselInner = document.querySelector('#carousel-1 .carousel-inner');
        carouselInner.innerHTML = '';

        unit.UnitImages.forEach((image, index) => {
            const imageUrl = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = image.filename;
            imgElement.classList.add('d-block', 'w-100'); 

            carouselItem.appendChild(imgElement);

            carouselInner.appendChild(carouselItem);

            const carouselIndicator = document.createElement('button');
            carouselIndicator.setAttribute('type', 'button');
            carouselIndicator.setAttribute('data-bs-target', '#carousel-1');
            carouselIndicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) {
                carouselIndicator.classList.add('active');
            }

           
            const carouselIndicators = document.querySelector('#carousel-1 .carousel-indicators');
            carouselIndicators.appendChild(carouselIndicator);
        });

        const style = document.createElement('style');
        style.innerHTML = `
            #carousel-1 .carousel-item img {
                object-fit: cover;
                height: 400px; /* Adjust height as needed 
            }
        `;
        document.head.appendChild(style); */

    } catch (error) {
        console.error('Error:', error);
    }
}
