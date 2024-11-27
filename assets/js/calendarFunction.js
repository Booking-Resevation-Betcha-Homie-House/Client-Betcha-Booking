var selecteddate;

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
            const date = new Date(currentYear, currentMonth, day);
            const formattedDate = date.toISOString().split('T')[0];  

            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;
    
            const currentDateIndex = bookedDates.indexOf(formattedDate);
            if (currentDateIndex !== -1) {

                const previousDay = new Date(currentYear, currentMonth, day - 1);
                const formattedPreviousDay = previousDay.toISOString().split('T')[0];

                const previousDayElement = document.querySelector(`.day[data-date='${formattedPreviousDay}']`);
                if (previousDayElement) {
                    previousDayElement.style.backgroundColor = '#b4cb68';  
                    previousDayElement.style.color = 'white';
                }
            }

            if (bookedDates.includes(formattedDate)) {
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

                let selected = new Date(currentYear, currentMonth, day);

                selected.setDate(selected.getDate() + 1);

                const selectedFormattedDate = selected.toISOString().split('T')[0];
                
                selecteddate = selectedFormattedDate;

                alert(`You selected: ${selectedFormattedDate}`);
            });

            dayElement.dataset.date = formattedDate;
            calendarDates.appendChild(dayElement);
        }
    }
    
    
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1); 
        fetchBookedDates(); 
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1); 
        fetchBookedDates(); 
    });

    fetchBookedDates();
});


async function loadDateData(){
    try {
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getBookingByDate/${selecteddate}`);
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
  
        const selectedDateBookings = await response.json();

       const carditems = document.getElementById('carditems');
       carditems.innerHTML='';

       document.getElementById('select-date-container1')

       
       if (selectedDateBookings.length === 0) {
        carditems.innerHTML = '<tr><td colspan="4" class="no-data">No bookings available</td></tr>';
        return;
    }

       selectedDateBookings.forEach(bookings => {

        
       });
  
    } catch (error) {
        console.error('Error:', error);
    }
  }