// unfinished

function bookUnitAuditTrail(){

    var userId; // dynamic variable 
    var activity="booked a unit";
    var role; // dynamic varciable

    const trail = new FormData();
    trail.append('UserId',userId);
    trail.append('Activity',activity);
    trail.append('Role',role);

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
            alert('Registration1 successful: ' + data.message);
        } else {
            alert('Registration1 successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}

function rescheduleBookingAuditTrail(){

    var userId; // dynamic variable 
    var activity="Rescheduled a booking";
    var role; // dynamic varciable

    const trail = new FormData();
    trail.append('UserId',userId);
    trail.append('Activity',activity);
    trail.append('Role',role);

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
            alert('Registration1 successful: ' + data.message);
        } else {
            alert('Registration1 successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}

function editProfileAuditTrail(){

    var userId; // dynamic variable 
    var activity="Changed information in profile";
    var role; // dynamic varciable

    const trail = new FormData();
    trail.append('UserId',userId);
    trail.append('Activity',activity);
    trail.append('Role',role);

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
            alert('Registration4 successful: ' + data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alert('Registration4 successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}
