const urlParams = new URLSearchParams(window.location.search);
const UnitId = urlParams.get('UnitId');
const Reference = urlParams.get('Reference');
const UserId = urlParams.get('UserId');
var Reservation;
var FullPayment;

const errorMessage = document.getElementById('error-message');
errorMessage.style.display = 'none'; 

function loadBookingViewData() {
    fetch(`https://betcha-booking-api-master.onrender.com/booking/${Reference}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const user = data;

                document.getElementById('unit-name').innerHTML = `<strong>${user.UnitId.unitName}</strong>`;
                document.getElementById('unit-loc').textContent = user.UnitId.location;

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

                Reservation = user.UnitId.reservation;
                FullPayment = user.Total

                const unitImageElement = document.getElementById('unit-image');

                if (user.UnitId && user.UnitId.UnitImages && user.UnitId.UnitImages.length > 0) {
                    const fileId = user.UnitId.UnitImages[0].fileId;
                    unitImageElement.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920-h1080`;
                    unitImageElement.alt = user.UnitId.unitName || 'Unit Image';
                } else {
                    console.error("UnitImages is not available or empty.");

                    unitImageElement.src = '/path/to/default-image.jpg';
                    unitImageElement.alt = 'Default Unit Image';
                }

                const checkbox = document.getElementById('formCheck-1');
                const button = document.getElementById('btn-confirm-pay');

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {

                        button.removeAttribute('disabled');
                        button.removeAttribute('style');
                    } else {

                        button.disabled = true;
                        button.style.backgroundColor = '#147B42'; 
                    }
                });

                if (!checkbox.checked) {
                    button.disabled = true;
                    button.style.backgroundColor = '#147B42'; 
                }
            }
        })
        .catch(error => console.error('Error loading booking data:', error));
}

function ReservationFunction() {
    console.log("Reservation selected");

    const reference = Reference; 
    const unitId = UnitId; 
    const userId = UserId; 
    const amount = Reservation; 

    console.log('ref', reference, 'unitId', unitId, 'userId', userId, 'amount', amount);

    fetch('https://betcha-booking-api-master.onrender.com/payment/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ref: reference,
            amount: amount,
            userId: userId,
            unitId: unitId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.paymentLink) {

            console.log('Payment link created:', data.paymentLink);
            window.open(data.paymentLink, '_blank');

            const paymongolink = data.paymentDetails.PayMongoLink;
            localStorage.setItem('payLink', paymongolink);

            const Modal = new bootstrap.Modal(document.getElementById('modal-confirm-payment'));
            Modal.show();
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error with the request:', error);
    });
}

function FullPaymentFunction() {
    console.log("Full Payment selected");

    const reference = Reference; 
    const unitId = UnitId; 
    const userId = UserId; 
    const amount = FullPayment; 

    console.log('ref', reference, 'unitId', unitId, 'userId', userId, 'amount', amount);

    fetch('https://betcha-booking-api-master.onrender.com/payment/full', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ref: reference,
            amount: amount,
            userId: userId,
            unitId: unitId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.paymentLink) {

            console.log('Payment link created:', data.paymentLink);
            window.open(data.paymentLink, '_blank');

            const paymongolink = data.paymentDetails.PayMongoLink;
            localStorage.setItem('payLink', paymongolink);

            const Modal = new bootstrap.Modal(document.getElementById('modal-confirm-payment'));
            Modal.show();
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error with the request:', error);
    });
}

document.getElementById('pay-btn').onclick = function () {
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;
    
    if (paymentOption === 'reservation') {
        ReservationFunction();
    } else {
        FullPaymentFunction();
    }
};


function getPaymentDetails() {

    const payLink = localStorage.getItem('payLink');
    
    if (payLink) {

        fetch(`https://betcha-booking-api-master.onrender.com/getPaymentDetails/${payLink}`)
            .then(response => response.json())
            .then(data => {
                if (data) {

                    console.log('Payment details:', data);
                    window.location.href= `My-Bookings-View.html?id1=${Reference}&id=${UnitId}`
                } else {
                    console.error('No data received from the API.');
                }
            })
            .catch(error => {
                console.error('Error fetching payment details:', error);
            });
    } else {
        console.error('Payment link not found in localStorage.');
    }
}
document.getElementById('fetch-btn').addEventListener('click', getPaymentDetails);