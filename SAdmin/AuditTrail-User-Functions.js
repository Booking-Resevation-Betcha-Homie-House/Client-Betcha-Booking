function bookUnitAuditTrail(){
    var userId; // dynamic variable 
    var activity = "booked a unit";
    var role; // dynamic variable

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

    fetch('https://betcha-booking-api-master.onrender.com/createAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trail)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            console.log('Booking Successful', data.message);
        } else {
            console.log('Booking Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during booking:', error);
        console.log('Booking Failed', error.message);
    });
}

function rescheduleBookingAuditTrail(){
    var userId; // dynamic variable 
    var activity = "Rescheduled a booking";
    var role; // dynamic variable

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

    fetch('https://betcha-booking-api-master.onrender.com/createAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trail)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            console.log('Reschedule Successful', data.message);
        } else {
            console.log('Reschedule Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during rescheduling:', error);
        console.log('Reschedule Failed', error.message);
    });
}

function editProfileAuditTrail(){
    var userId; // dynamic variable 
    var activity = "Changed information in profile";
    var role; // dynamic variable

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

    fetch('https://betcha-booking-api-master.onrender.com/createAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trail)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            console.log('Profile Edit Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            console.log('Profile Edit Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during profile editing:', error);
        console.log('Profile Edit Failed', error.message);
    });
}
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}