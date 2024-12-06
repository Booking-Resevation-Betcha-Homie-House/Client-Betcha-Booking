const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id1');
const unitId = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function loadBookingViewData() {
    fetch(`https://betcha-booking-api-master.onrender.com/booking/${refID}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const user = data;

                document.getElementById('ref-id').textContent = refID;
                document.getElementById('unit-name').textContent = user.UnitId.unitName;
                document.getElementById('check-out-date-1').textContent = user.UnitId.location;
                
                // Format Dates
                const formatuserCI = user.CheckIn.split('T')[0];
                document.getElementById('check-in').textContent = formatuserCI;
                
                const formatuserCO = user.CheckOut.split('T')[0];
                document.getElementById('check-out').textContent = formatuserCO;
                
                // Convert the date strings to Date objects
                const checkInDate = new Date(formatuserCI);
                const checkOutDate = new Date(formatuserCO);
                
                // Calculate the difference in milliseconds
                const differenceInMs = checkOutDate - checkInDate;
                
                const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
                
                console.log(`Length of stay: ${differenceInDays} days`);
                
                // Store the length of stay in localStorage
                localStorage.setItem('dayLength', differenceInDays.toString());
                
                // Retrieve the length of stay from localStorage
                const days = parseFloat(localStorage.getItem('dayLength'));
                console.log('local: ', days);                      
                


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

                document.getElementById('Status').textContent = user.Status

                document.getElementById('reservationFee').textContent = user.UnitId.reservation;
                document.getElementById('total-price').textContent = `₱${user.Total}`;

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
            }
        })
        .catch(error => console.error('Error loading booking data:', error));
}

function Reschedule() {
    const reference = refID; 
    const checkIn = document.getElementById('input-start-date').value;
    const checkOut = document.getElementById('input-end-date').value;
    const days = parseFloat(localStorage.getItem('dayLength'));

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

function getPaymentDetails() {
    // Get the refID from the URL parameters
    const urlParams1 = new URLSearchParams(window.location.search);
    const refID1 = urlParams1.get('id1');
    
    console.log("Reference ID:", refID1); // Log the reference ID to ensure it's correct

    const apiUrl = `https://betcha-booking-api-master.onrender.com/get/paymentlink/${refID1}`;
    let payLink = null;

    // First API call to get the payment link
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("First API Response:", data); // Log the first API response

            // Check if payments array exists and has data
            if (data && Array.isArray(data) && data.length > 0) {
                payLink = data[0].PayMongoLink; // Access the first element of the array
                console.log('Payment Link:', payLink);

                // Proceed to second API call to fetch payment details using the payLink
                if (payLink) {
                    return fetch(`https://betcha-booking-api-master.onrender.com/getPaymentDetails/${payLink}`);
                } else {
                    console.error('Payment link not found.');
                    return Promise.reject('No payment link found.');
                }
            } else {
                console.error('No payment details found.');
                return Promise.reject('No payment details available.');
            }
        })
        .then(response => response.json())
        .then(paymentDetails => {
            console.log("Second API Response:", paymentDetails); // Log the second API response

            // Check if payment details are returned and handle them
            if (paymentDetails) {
                console.log('Payment details:', paymentDetails);

                // Optionally, you can navigate to another page or display payment details
                // For example:
                // window.location.href = `My-Bookings-View.html?id1=${refID1}&id=${paymentDetails.UnitId}`;
            }
        })
        .catch(error => {
            // Catch any errors from the fetch calls
            console.error('Error:', error);
        });
}
