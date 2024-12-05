const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function loadBookingViewData() {
    fetch(`https://betcha-booking-api-master.onrender.com/booking/${refID}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const user = data;

                // Update Booking Details
                document.getElementById('ref-id').textContent = refID;
                document.getElementById('unit-name').textContent = user.UnitId.unitName;
                document.getElementById('check-out-date-1').textContent =user.UnitId.location;
                // Format Dates
                const formatuserCI = user.CheckIn.split('T')[0];
                document.getElementById('check-in').textContent = formatuserCI;

                const formatuserCO = user.CheckOut.split('T')[0];
                document.getElementById('check-out').textContent = formatuserCO;

                const formatBookdate = user.Date.split('T')[0];
                document.getElementById('date-book').textContent = formatBookdate;

                // Payment Details
                document.getElementById('mbv-payment-mode').textContent = user.PaymentId.Mop;

                // Pricing Details
                document.getElementById('unit-price').textContent = user.UnitId.unitPrice;
                document.getElementById('num-of-days').textContent = user.NumOfDays;

                const totalUnitPrice = user.UnitId.unitPrice * user.NumOfDays;
                document.getElementById('up-nod').textContent = totalUnitPrice;

                document.getElementById('ppc').textContent = user.UnitId.pricePerPax;
                document.getElementById('addpax').textContent = user.AdditionalPax;

                const additionalPaxPrice = user.UnitId.pricePerPax * user.AdditionalPax;
                document.getElementById('ppc-addpax').textContent = additionalPaxPrice;

                document.getElementById('reservationFee').textContent = user.UnitId.reservation;
                document.getElementById('total-price').textContent = `₱${user.Total}`;

                // Load Images into Carousel
               const imageUrls = user.UnitId.UnitImages.map(image => 
                    `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`
                );
                const carouselInner = document.querySelector('#carousel-1 .carousel-inner');
                carouselInner.innerHTML = '';
        
                user.UnitImages.forEach((image, index) => {
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
                        height: 400px; /* Adjust height as needed */
                    }
                `;
                document.head.appendChild(style);
            }
        })
        .catch(error => console.error('Error loading booking data:', error));
}
