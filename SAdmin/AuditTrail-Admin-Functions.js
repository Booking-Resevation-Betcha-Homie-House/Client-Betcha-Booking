//Unfinished

function createUnitAuditTrail(){

    var userId; // dynamic variable 
    var activity="Created a unit";
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

function updateUnitAuditTrail(){

    var userId; // dynamic variable 
    var activity="Updated a unit";
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
            alert('Registration2 successful: ' + data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alert('Registration2 successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}

function deleteUnitAuditTrail(){

    var userId; // dynamic variable 
    var activity="Deleted a unit";
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
            alert('Registration3 successful: ' + data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alert('Registration3 successful, but no message returned.');
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

function idVerificationAuditTrail(){

    var userId; // dynamic variable 
    var activity="Verified an ID";
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
            alert('Registration5 successful: ' + data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alert('Registration5 successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}

function cancelBookingAuditTrail(){

    var userId; // dynamic variable 
    var activity="Cancelled a booking";
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
            alert('Registration6 successful: ' + data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alert('Registration6 successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}