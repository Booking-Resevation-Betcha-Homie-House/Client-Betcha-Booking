const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);
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

        const carouselInner = document.querySelector('#carousel-preview-images .carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');

        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        unit.UnitImages.forEach((image, index) => {
            const imageUrl = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active'); 

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Unit Image ${index + 1}`;
            imgElement.classList.add('w-100', 'd-block');

            carouselItem.appendChild(imgElement);
            carouselInner.appendChild(carouselItem);

            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.dataset.bsTarget = '#carousel-preview-images';
            indicator.dataset.bsSlideTo = index;
            if (index === 0) indicator.classList.add('active'); 

            carouselIndicators.appendChild(indicator);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}


async function Book() {
    openLoading();

    const CheckIn = document.getElementById('input-start-date').value;
    const CheckOut = document.getElementById('input-end-date').value;
    const UserId = localStorage.getItem('id');
    const UnitId = refID; 
    const AdditionalPax = document.getElementById('input-add-pax').value;

    const bookingData = {
        CheckIn,
        CheckOut,
        UserId,
        UnitId,
        AdditionalPax,
    };

    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        closeLoading();
        console.log('Booking Response:', responseData);

        const { Reference, Total, UserId, UnitId } = responseData.booking;

        const confirmReservationURL = `/User/LoggedIn/Confirm-Reservation.html?Reference=${encodeURIComponent(
            Reference
        )}&Total=${encodeURIComponent(Total)}&UserId=${encodeURIComponent(UserId)}&UnitId=${encodeURIComponent(UnitId)}`;
        bookUnitAuditTrail();
        alertCustom('Success', 'Booking successfully created!');
        setTimeout(()=>{
        window.location.href = confirmReservationURL;
        },2000);
    } catch (error) {
        closeLoading();
        console.error('Error creating booking:', error);
        alertCustom('Failed', 'Failed to create booking. Please try again.');
    }
}

document.getElementById('btn-book-now').addEventListener('click', Book);
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    logoutbtn();
}