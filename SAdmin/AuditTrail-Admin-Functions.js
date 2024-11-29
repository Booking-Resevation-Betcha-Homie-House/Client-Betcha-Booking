//Unfinished

async function loadAuditData(){
    console.log('function called!');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/auit/all');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const admins = await response.json();

        const tbodycompleted = document.getElementById('table-body-completed');
        const tbodycustomer = document.getElementById('table-body-customer');
        tbodycompleted.innerHTML = '';
        tbodycustomer.innerHTML = '';

        //console.log(admins.data);
        const data = admins.data;
        console.log(data);
        
        admins.data.forEach(admin => {
            if(admin.Role === 'Admin'){
            console.log(admins);
            const row = document.createElement('tr');

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = admin.Reference; // need pa add ng date sa schema
            referenceNumberCell.style.textAlign = 'center'
            row.appendChild(referenceNumberCell);

            const adminNameCell = document.createElement('td');
            const formatdate = admin.Date;
            const datedited = formatdate.split('T')[0];
            adminNameCell.style.textAlign = 'center'
            adminNameCell.textContent = datedited; // need pa add ng date sa schema
            row.appendChild(adminNameCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.UserId;
            nameCell.style.textAlign = 'center'
            row.appendChild(nameCell);

            const activityCell = document.createElement('td');
            activityCell.textContent = admin.Activity;
            activityCell.style.textAlign = 'center'
            row.appendChild(activityCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = admin.Role;
            roleCell.style.textAlign = 'center'
            row.appendChild(roleCell);

            tbodycompleted.appendChild(row);
            }

        else if (admin.Role === 'Customer') {

            const row = document.createElement('tr');

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = admin.Reference; // need pa add ng date sa schema
            referenceNumberCell.style.textAlign = 'center'
            row.appendChild(referenceNumberCell);

            const adminNameCell = document.createElement('td');
            const formatdate = admin.Date;
            const datedited = formatdate.split('T')[0];
            adminNameCell.style.textAlign = 'center'
            adminNameCell.textContent = datedited; // need pa add ng date sa schema
            row.appendChild(adminNameCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.UserId;
            nameCell.style.textAlign = 'center'
            row.appendChild(nameCell);

            const activityCell = document.createElement('td');
            activityCell.textContent = admin.Activity;
            activityCell.style.textAlign = 'center'
            row.appendChild(activityCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = admin.Role;
            roleCell.style.textAlign = 'center'
            row.appendChild(roleCell);

            tbodycustomer.appendChild(row);
        
    }

    });
    
    } catch (error) {
        console.error('Error:', error);
    }
}


function createUnitAuditTrail(){

    var userId; // dynamic variable 
    var activity="Created a unit";
    var role; // dynamic varciable

    const trail = new FormData();
    trail.append('UserId',userId);
    trail.append('Activity',activity);
    trail.append('Role',role);

    fetch('https://betcha-booking-api-master.onrender.com//audit/create', {
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

    fetch('https://betcha-booking-api-master.onrender.com//audit/create', {
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

    fetch('https://betcha-booking-api-master.onrender.com//audit/create', {
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

    fetch('https://betcha-booking-api-master.onrender.com//audit/create', {
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

    fetch('https://betcha-booking-api-master.onrender.com//audit/create', {
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

    fetch('https://betcha-booking-api-master.onrender.com//audit/create', {
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