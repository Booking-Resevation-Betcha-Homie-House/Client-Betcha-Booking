var selecteddate = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', function () {
    const calendarDates = document.getElementById('dates');
    const monthDisplay = document.getElementById('month');
    const yearDisplay = document.getElementById('year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let bookedDates = [];
    let currentDate = new Date();
    let selectedDateElement = null;

    function fetchBookedDates() {
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();

        fetch(`https://betcha-booking-api-master.onrender.com/bookings/all-dates?month=${month}&year=${year}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === "All booked dates retrieved successfully") {
                    bookedDates = data.bookedDates;
                    renderCalendar();
                    console.log(bookedDates);
                } else {
                    console.error('Failed to retrieve booked dates');
                }
            })
            .catch(error => console.error('Error fetching booked dates:', error));
    }

    function renderCalendar() {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        monthDisplay.textContent = currentDate.toLocaleString('default', { month: 'long' });
        yearDisplay.textContent = currentYear;
    
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();  
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();  
        
        calendarDates.innerHTML = ''; 

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarDates.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDate; day++) {
            const date = new Date(currentYear, currentMonth, day + 1);
            const formattedDate = date.toISOString().split('T')[0];  
        
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;

            const isCurrentBooked = bookedDates.includes(formattedDate);

            if (formattedDate === selecteddate) {
                dayElement.style.backgroundColor = 'darkgreen'; 
                dayElement.style.color = 'white';
                selectedDateElement = dayElement;
            } else if (isCurrentBooked) {
                dayElement.style.backgroundColor = '#b4cb68'; 
                dayElement.style.color = 'white';
            } else {
                dayElement.style.backgroundColor = '#e0e0e0';
                dayElement.style.color = 'black';
            }
        
            dayElement.addEventListener('mouseenter', () => {
                dayElement.style.filter = 'brightness(85%)';
            });
            dayElement.addEventListener('mouseleave', () => {
                dayElement.style.filter = 'brightness(100%)';
            });
        
            dayElement.addEventListener('click', () => {
                if (selectedDateElement) {
                    selectedDateElement.style.backgroundColor = bookedDates.includes(selectedDateElement.dataset.date)
                        ? '#b4cb68'
                        : '#e0e0e0';
                    selectedDateElement.style.color = bookedDates.includes(selectedDateElement.dataset.date)
                        ? 'white'
                        : 'black';
                }
        
                dayElement.style.backgroundColor = 'darkgreen';  
                dayElement.style.color = 'white';
                selectedDateElement = dayElement;
        
                selecteddate = formattedDate; 
                loadDateData();
                fetchBookedDates();
            });
        
            dayElement.dataset.date = formattedDate;
            calendarDates.appendChild(dayElement);
        }
    }        
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1); 
        fetchBookedDates(); 
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1); 
        fetchBookedDates(); 
    });

    fetchBookedDates(); 
    loadDateData(); 
});

function createReferenceCell() {
    const container = document.createElement('div');
    container.className = 'd-flex align-items-center p-3';
    container.style.backgroundColor = '#ffffff';
    container.style.padding = '20px';
    container.style.margin = '10px';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    container.style.cursor = 'pointer';
    container.style.transition = 'all 0.3s ease';

    container.addEventListener('mouseenter', () => {
        container.style.backgroundColor = '#f0f4d4';
        container.style.color = 'white';
        container.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
    });

    container.addEventListener('mouseleave', () => {
        container.style.backgroundColor = '#ffffff';
        container.style.color = 'black';
        container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });

    const iconBg = document.createElement('div');
    iconBg.className = 'db-icon-bg';

    const spanDate = document.createElement('span');
    spanDate.id = 'span_date';
    spanDate.style.fontWeight = 'bold';

    const ms4Div = document.createElement('div');
    ms4Div.className = 'ms-4';

    const unitName = document.createElement('h4');
    unitName.id = 'cal-unit-name';
    unitName.style.color = '#212529';
    unitName.style.fontWeight = 'bold';
    unitName.className = 'mb-0';

    const details = document.createElement('p');
    details.id = 'cal-detail';
    details.className = 'text-nowrap mb-0';
    details.style.color = '#212529';
    details.style.lineHeight = '1.8';

    iconBg.appendChild(spanDate);
    ms4Div.appendChild(unitName);
    ms4Div.appendChild(details);
    container.appendChild(iconBg);
    container.appendChild(ms4Div);

    return container;
}

async function loadDateData() {
    console.log('LoadDateData called!');
    console.log(selecteddate);

    try {
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getBookingByDate/${selecteddate}`);
        const bookdatescontainer = document.getElementById('carditems');

        while (bookdatescontainer.firstChild) {
            bookdatescontainer.removeChild(bookdatescontainer.firstChild);
        }

        if (response.status === 404 || !response.ok) {
            console.log('No bookings found for this date.');
            const noBookingsText = document.createElement('div');
            noBookingsText.textContent = 'No bookings available';
            noBookingsText.style.fontSize = '16px';
            noBookingsText.style.color = '#555';
            noBookingsText.style.textAlign = 'center';
            noBookingsText.style.padding = '20px';
            noBookingsText.style.backgroundColor = '#f9f9f9';
            noBookingsText.style.border = '1px solid #ddd';
            noBookingsText.style.borderRadius = '10px';
            noBookingsText.style.margin = '10px';

            bookdatescontainer.appendChild(noBookingsText);
            return;
        }

        const selectedDateBookings = await response.json();

        if (!selectedDateBookings.bookings || selectedDateBookings.bookings.length === 0) {
            const noBookingsText = document.createElement('div');
            const day = new Date(selecteddate).getDate();
            noBookingsText.querySelector('#span_date') = day;
            noBookingsText.textContent = 'No bookings available';
            noBookingsText.style.fontSize = '16px';
            noBookingsText.style.color = '#555';
            noBookingsText.style.textAlign = 'center';
            noBookingsText.style.padding = '20px';
            noBookingsText.style.backgroundColor = '#f9f9f9';
            noBookingsText.style.border = '1px solid #ddd';
            noBookingsText.style.borderRadius = '10px';
            noBookingsText.style.margin = '10px';

            bookdatescontainer.appendChild(noBookingsText);
            return;
        }

        selectedDateBookings.bookings.forEach(booking => {
            const clonedCell = createReferenceCell(); 
            const roomName = clonedCell.querySelector('#cal-unit-name');
            const details = clonedCell.querySelector('#cal-detail');
            const date = clonedCell.querySelector('#span_date');

            roomName.textContent = booking.UnitId.unitName;
            const lastname = booking.UserId.lastName;
            const FLname = lastname.charAt(0);
            details.textContent = `${booking.UserId.firstName} ${FLname}. | ${booking.CheckIn} - ${booking.CheckOut}`;
            const day = new Date(selecteddate).getDate();
            date.textContent = day;

            clonedCell.addEventListener('click', () => {
                window.location.href=`../SAdmin/Transactions-View.html?id=${booking.Reference}`
            });

            bookdatescontainer.appendChild(clonedCell);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
