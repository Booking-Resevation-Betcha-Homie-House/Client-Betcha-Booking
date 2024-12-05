const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function updateBookedDates() {
    console.log('daklmdi')
    const urlParams = new URLSearchParams(window.location.search);
    const unitId = urlParams.get('id');
    
    fetch(`https://betcha-booking-api-master.onrender.com/bookings/unit/${unitId}`)
        .then(response => response.json())
        .then(data => {
            const bookedDates = data[0].BookDates; // Assuming the first item in the array has the bookings
            
            // Loop through each booking date and update the calendar divs
            bookedDates.forEach(bookedDate => {
                const dateString = bookedDate.Date; // "YYYY-MM-DD"
                
                // Find the div that matches the date
                const dateDiv = document.querySelector(`div.calendar-content div[data-date="${dateString}"]`);
                if (dateDiv) {
                    dateDiv.classList.add('booked-dates');
                }
            });
        })
        .catch(error => console.error("Error fetching booking data:", error));
}


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
        document.getElementById('view-unit-pax').innerHTML = unit.packageCapacity;
        document.getElementById('view-unit-category').innerHTML = unit.category;
        const formattedPrice = new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,  
          }).format(unit.unitPrice);
          const imgSelection = document.getElementById('img-selection');

        imgSelection.addEventListener('mouseenter', function() {
        imgSelection.style.cursor = 'pointer';
        });

        imgSelection.addEventListener('mouseleave', function() {
        imgSelection.style.cursor = 'default';
        });

        document.getElementById('unit-price').innerHTML = `<strong>${formattedPrice}/day</strong>`;
        document.getElementById('view-unit-desc').innerHTML = unit.description;

        const inputAddPax = document.getElementById('input-add-pax');
        const maxPax = unit.maxPax;  
        const packageCapacity = unit.packageCapacity;
        const additionalPaxOptionsCount = maxPax - packageCapacity;

        inputAddPax.innerHTML = '';

        for (let i = 0; i <= additionalPaxOptionsCount; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            inputAddPax.appendChild(option);
        }
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

                if (!existingAmenity) {

                    const amenityDiv = document.createElement('div');
                    amenityDiv.className = 'col-6 pb-1';
                    amenityDiv.id = `bathroom-${itemnumber}`;
        
                    const label = document.createElement('label');
                    label.className = 'form-check-label';
                    label.textContent = itemElement.innerText;
        
                    amenityDiv.appendChild(label);

                    if (containerAmenities) {
                        containerAmenities.appendChild(amenityDiv);
                    }
                }
            } else if (divElement && !isAvailable) {

                divElement.remove();
            }
        
            itemnumber++;
        });

        const imgcontainer = document.getElementById('img-selection');
        const imgpreview = document.getElementById('image-preview');
        
        imgpreview.src = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`;
        
        imgcontainer.style.overflowY = 'hidden'; 
        imgcontainer.style.display = 'flex';     
        imgcontainer.style.flexWrap = 'wrap';   
        
        unit.UnitImages.forEach((image, index) => {
            const imageUrl = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.classList.add('unit-image-small');

            const style = document.createElement('style');
            style.innerHTML = `
                #image-preview {
                    transition: opacity 0.5s ease-in-out;
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);

            imgElement.onclick = () => {
                imgpreview.style.opacity = 0; 
        

                setTimeout(() => {
                    imgpreview.src = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;
                    imgpreview.style.opacity = 1;
                }, 300);  
            };

            imgElement.addEventListener('mouseenter', function() {
                imgElement.style.cursor = 'pointer'; 
                imgElement.style.transform = 'scale(1.1)'; 
                imgElement.style.transition = 'transform 0.3s ease';
            });
        
            imgElement.addEventListener('mouseleave', function() {
                imgElement.style.cursor = 'default'; 
                imgElement.style.transform = 'scale(1)';
            });

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
