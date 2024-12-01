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
            alertCustom('Booking Successful', data.message);
        } else {
            alertCustom('Booking Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during booking:', error);
        alertCustom('Booking Failed', error.message);
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
            alertCustom('Reschedule Successful', data.message);
        } else {
            alertCustom('Reschedule Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during rescheduling:', error);
        alertCustom('Reschedule Failed', error.message);
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
            alertCustom('Profile Edit Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alertCustom('Profile Edit Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during profile editing:', error);
        alertCustom('Profile Edit Failed', error.message);
    });
}
