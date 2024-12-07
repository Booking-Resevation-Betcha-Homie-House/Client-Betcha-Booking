function setActiveTab() {
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector('.nav-link[href="#tab-1"]'); 
    activeTab.classList.add('active');
}

async function myBookingsLoadData() {
    try {
        console.log(localStorage.getItem('id'));

        console.log('hii')
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/booking/user/${localStorage.getItem('id')}`);
        if (!response.ok) {
            throw new Error('Failed to fetch booking data');
        }
        console.log(response)
        const bookings = await response.json();
       
        const completedContainer = document.getElementById('completed-bookings-container');
        const pendingContainer = document.getElementById('pending-bookings-container');

        completedContainer.innerHTML = '';
        pendingContainer.innerHTML = '';

        const pendingBookings = bookings.filter(booking => 
            booking.Status === 'Pending' || booking.Status === 'Fully-Paid' || booking.Status === 'Arrived' || booking.Status === 'Reserved'
        );
        
        const completedBookings = bookings.filter(booking => 
            booking.Status === 'Successful' || booking.Status === 'Did Not Arrive' || booking.Status === 'Cancelled' || booking.Status === 'Unpaid'
        );

        console.log(pendingBookings.length, completedBookings.length);

        setActiveTab();

        setTimeout(() => {

            pendingBookings.forEach(booking => {
                const imgurl = `https://drive.google.com/thumbnail?id=${booking.UnitId.UnitImages[0].fileId}&sz=w1920-h1080`
                const card = createBookingCard(booking, imgurl, 'pending');
                pendingContainer.appendChild(card);
            });

            completedBookings.forEach(booking => {
                const imgurl = `https://drive.google.com/thumbnail?id=${booking.UnitId.UnitImages[0].fileId}&sz=w1920-h1080`
                const card = createBookingCard(booking, imgurl, 'completed');
                completedContainer.appendChild(card);
            });
        }, 100); 
        
    } catch (error) {
        console.error('Error:', error);
    }
}

function createBookingCard(booking, imgurl, status) {
    const card = document.createElement('div');
    card.className = 'd-flex align-items-center gap-5 my-bookings';
    card.id = `${status}-bookings`;

    const img = document.createElement('img');
    img.id = `unit-image`;
    img.className = 'mybookings-unit-image';
    img.src = imgurl;
    card.appendChild(img);

    const detailsCard = document.createElement('div');
    detailsCard.className = 'w-100 booking-details-card';
    detailsCard.id = 'booking-details-card';

    const unitTitle = document.createElement('h4');
    unitTitle.id = `mb-unit-name-`;
    unitTitle.className = 'manrope mb-3';
    unitTitle.style.color = '#050316';
    unitTitle.innerHTML = `<strong>${booking.UnitId.unitName}</strong>`;
    detailsCard.appendChild(unitTitle);

    const locationDiv = document.createElement('div');
    locationDiv.className = 'd-flex align-items-center gap-2';
    locationDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="m-0">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="currentColor"></path>
        </svg>
        <p id="mb-location" class="m-0">${booking.UnitId.location}</p>
    `;
    detailsCard.appendChild(locationDiv);

    const datesDiv = document.createElement('div');
    datesDiv.className = 'd-flex align-items-center gap-2';
    datesDiv.innerHTML = `
        <p id="mb-checkin-date" class="m-0">${booking.CheckIn.split('T')[0]}</p>
        <i class="fas fa-long-arrow-alt-right"></i>
        <p id="mb-checkout-date" class="m-0">${booking.CheckOut.split('T')[0]}</p>
    `;
    detailsCard.appendChild(datesDiv);

    card.appendChild(detailsCard);

    const viewIcon = document.createElement('div');
    viewIcon.className = 'm-3 rounded-circle circle-view';
    viewIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" class="svg-view2">
            <path d="M10.5253 5.49475L10.5206 7.49475L15.0782 7.50541L5.47473 17.0896L6.88752 18.5052L16.5173 8.89479L16.5065 13.5088L18.5065 13.5134L18.5253 5.51345L10.5253 5.49475Z" fill="currentColor"></path>
        </svg>
    `;
    card.onclick = () => {
        window.location.href = `../LoggedIn/My-Bookings-View.html?id1=${booking.Reference}&id=${booking.UnitId._id}`; 
    };
    card.appendChild(viewIcon);

    return card;
}

document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    logoutbtn();
}