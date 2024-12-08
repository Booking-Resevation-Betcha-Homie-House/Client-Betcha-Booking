const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id1');
const unitId = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function loadBookingViewData() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP', 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    fetch(`https://betcha-booking-api-master.onrender.com/booking/${refID}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const user = data;

                document.getElementById('ref-id').textContent = refID;
                document.getElementById('unit-name').textContent = user.UnitId.unitName;
                document.getElementById('check-out-date-1').textContent = user.UnitId.location;

                const formatuserCI = user.CheckIn.split('T')[0];
                document.getElementById('check-in').innerHTML = `<strong>${formatuserCI}</strong>`;
                
                const formatuserCO = user.CheckOut.split('T')[0];
                document.getElementById('check-out').innerHTML = `<strong>${formatuserCO}</strong>`;                

                const checkInDate = new Date(formatuserCI);
                const checkOutDate = new Date(formatuserCO);

                const differenceInMs = checkOutDate - checkInDate;
                
                const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
                
                console.log(`Length of stay: ${differenceInDays} days`);

                localStorage.setItem('dayLength', differenceInDays.toString());

                const days = parseFloat(localStorage.getItem('dayLength'));
                console.log('local: ', days);                      
                


                const formatBookdate = user.Date.split('T')[0];

                document.getElementById('date-book').textContent = formatBookdate;

                document.getElementById('mbv-payment-mode').textContent = (user.PaymentId && user.PaymentId.Mop) || 'N/A';

                document.getElementById('unit-price').textContent = user.UnitId.unitPrice;
                document.getElementById('num-of-days').textContent = user.NumOfDays;

                const totalUnitPrice = user.UnitId.unitPrice * user.NumOfDays;
                document.getElementById('up-nod').textContent = formatter.format(totalUnitPrice);

                document.getElementById('ppc').textContent = user.UnitId.pricePerPax;
                document.getElementById('addpax').textContent = user.AdditionalPax;

                const additionalPaxPrice = user.UnitId.pricePerPax * user.AdditionalPax;
                document.getElementById('ppc-addpax').textContent = additionalPaxPrice;

                document.getElementById('Status').textContent = user.Status
                if (["Successful", "Cancelled", "Did not arrive", "Unpaid"].includes(user.Status)) {
                    const rescheduleButton = document.getElementById('reschedule-btn1');
                    if (rescheduleButton) {
                        rescheduleButton.remove();
                    }
                }
                document.getElementById('reservationFee').textContent = formatter.format(user.UnitId.reservation);

                const formattedPrice = formatter.format(user.Total);
                if (user.Status === 'Reserved') {
                    document.getElementById('up-nod').innerHTML = `
                    <a href="#" id="pay-link" style="text-decoration: none; color: inherit;" title="Click for redirection to full payment link">
                        ${formatter.format(totalUnitPrice)} <span id="click-to-pay" style="text-decoration: underline; color: inherit; cursor: pointer;">click to pay</span>
                    </a>
                `;
                const payText = document.getElementById('click-to-pay');

                payText.addEventListener('mouseover', function() {
                    this.style.color = 'green'; 
                });
                
                payText.addEventListener('mouseout', function() {
                    this.style.color = 'inherit';
                });
                
                document.getElementById('total-price').innerHTML = `<strong>${formatter.format(user.UnitId.reservation)}</strong>`;
            
                document.getElementById('pay-link').addEventListener('click', function(event) {
                    event.preventDefault();
                    alertCustom('We are working on it', 'This feature is currently under development.');
                });
                } else {
                    document.getElementById('total-price').innerHTML = `<strong>${formattedPrice}</strong>`;
                }                                              

                const modalElements = document.querySelectorAll(
                    '#modal-reschedule .modal-body input, #modal-reschedule .modal-body textarea, #modal-reschedule .modal-body button'
                );

                const bookingDate = new Date(user.Date);
                const today = new Date();
                const diffInDays = Math.ceil((today - bookingDate) / (1000 * 60 * 60 * 24));

                if (diffInDays > 10) {

                    modalElements.forEach((element) => {
                        if (!element.hasAttribute('data-bs-dismiss') && element.id !== 'reschedule-btn') {
                            element.setAttribute('disabled', 'true');
                            element.setAttribute('data-bs-toggle', 'tooltip');
                            element.setAttribute(
                                'title',
                                "Can't reschedule this booking since this booking is already 10 days old."
                            );
                        }
                    });

                    const confirmButton = document.getElementById('reschedule-btn');
                    confirmButton.setAttribute('data-bs-toggle', 'tooltip');
                    confirmButton.setAttribute(
                        'title',
                        "Can't confirm rescheduling since this booking is already 10 days old."
                    );
                    confirmButton.style.pointerEvents = 'none'; 
                
                    confirmButton.style.backgroundColor = '#f8f9fc'; 
                    confirmButton.style.color = 'black';
                    confirmButton.style.borderColor = '#b8daff'; 

                    const tooltipTriggerList = [].slice.call(
                        document.querySelectorAll('[data-bs-toggle="tooltip"]')
                    );
                    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
                        new bootstrap.Tooltip(tooltipTriggerEl);
                    });
                }           

                const carouselInner = document.getElementById('imgs');
                carouselInner.innerHTML = ''; 
                
                user.UnitId.UnitImages.forEach((image, index) => {
                    const item = document.createElement('div');
                    item.className = index === 0 ? 'carousel-item active' : 'carousel-item';
                    item.innerHTML = `<img class="w-100 d-block" src="https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080" alt="Slide Image">`;
                    carouselInner.appendChild(item);
                });
                
                const indicatorContainer = document.getElementById('indicator');
                indicatorContainer.innerHTML = ''; 
                
                user.UnitId.UnitImages.forEach((_, index) => {
                    const indicator = document.createElement('button');
                    indicator.type = 'button';
                    indicator.setAttribute('data-bs-target', '#carousel-1');
                    indicator.setAttribute('data-bs-slide-to', index.toString());
                    if (index === 0) {
                        indicator.classList.add('active');
                    }
                    indicatorContainer.appendChild(indicator);
                });
                
                // Automatic scrolling function
                let currentIndex = 0;
                const carouselItems = document.querySelectorAll('.carousel-item');
                const carouselInterval = 2000; // Interval in milliseconds (e.g., 5 seconds)
                
                function autoScroll() {
                    currentIndex = (currentIndex + 1) % carouselItems.length;
                    // Trigger the next slide
                    const carousel = new bootstrap.Carousel(document.querySelector('#carousel-1'));
                    carousel.to(currentIndex);
                }
                
                // Start auto-scroll
                setInterval(autoScroll, carouselInterval);
                
                // Optional: Add event listener to stop auto-scroll when the user interacts
                document.querySelector('#carousel-1').addEventListener('slide.bs.carousel', function() {
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = setInterval(autoScroll, carouselInterval);
                });
            }   
        })
        .catch(error => console.error('Error loading booking data:', error));
}

function Reschedule() {
    const reference = refID; 
    const checkIn = document.getElementById('input-start-date').value;
    const checkOut = document.getElementById('input-end-date').value;
    const days = parseFloat(localStorage.getItem('dayLength')) + 1;


    if (!checkIn || !checkOut) {
        alert('Please fill in both check-in and check-out dates.');
        return;
    }

    const newCheckInDate = new Date(checkIn);
    const newCheckOutDate = new Date(checkOut);

    const newDifferenceInMs = newCheckOutDate - newCheckInDate;
    const newDifferenceInDays = (newDifferenceInMs / (1000 * 60 * 60 * 24)) +1;

    console.log(days, newDifferenceInDays)
    if (newDifferenceInDays !== days) {
        alertCustom('Schedule not saved!', 'The length of date(s) selected are not applicable for this reschedule.\n' + `Day(s) target: ${days}`);
        return;
    }

    const requestData = {
        reference: reference,
        CheckIn: checkIn,
        CheckOut: checkOut
    };

    openLoading(); 

    fetch('https://betcha-booking-api-master.onrender.com/edit-date', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        closeLoading();

        if (data.message === 'Booking dates successfully updated') {
            alertCustom('Booking Rescheduled!', 'Booking dates have been successfully updated!');
            rescheduleBookingAuditTrail();
            console.log(data.booking); 
            setTimeout(() => {
                window.location.href = `/User/LoggedIn/My-Bookings-View.html?id1=${refID}&id=${unitId}`;
            }, 2000);
        } else {
            alertCustom('Error: ' + data.message);
        }
    })
    .catch(error => {
        closeLoading();
        
        console.error('Error:', error);
        alertCustom('Error', 'There was an error processing your request.');
    });
}



document.getElementById('reschedule-btn').addEventListener('click', Reschedule)

document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    logoutbtn();
}
