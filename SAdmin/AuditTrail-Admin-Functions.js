async function loadAuditData(){
    const role = localStorage.getItem('role');
    console.log(role);
    checkSuperAdmin(role);

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

        const data = admins.data;
        console.log(data);
        
        admins.data.forEach(admin => {
            if(admin.Role === 'Admin'){
                console.log(admins);
                const row = document.createElement('tr');

                const referenceNumberCell = document.createElement('td');
                referenceNumberCell.textContent = admin.Reference; 
                referenceNumberCell.style.textAlign = 'center';
                row.appendChild(referenceNumberCell);

                const adminNameCell = document.createElement('td');
                const formatdate = admin.Date;
                const datedited = formatdate.split('T')[0];
                adminNameCell.style.textAlign = 'center';
                adminNameCell.textContent = datedited;
                row.appendChild(adminNameCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = admin.UserId;
                nameCell.style.textAlign = 'center';
                row.appendChild(nameCell);

                const activityCell = document.createElement('td');
                activityCell.textContent = admin.Activity;
                activityCell.style.textAlign = 'center';
                row.appendChild(activityCell);

                const roleCell = document.createElement('td');
                roleCell.textContent = admin.Role;
                roleCell.style.textAlign = 'center';
                row.appendChild(roleCell);

                tbodycompleted.appendChild(row);
            } else if (admin.Role === 'Customer') {
                const row = document.createElement('tr');

                const referenceNumberCell = document.createElement('td');
                referenceNumberCell.textContent = admin.Reference; 
                referenceNumberCell.style.textAlign = 'center';
                row.appendChild(referenceNumberCell);

                const adminNameCell = document.createElement('td');
                const formatdate = admin.Date;
                const datedited = formatdate.split('T')[0];
                adminNameCell.style.textAlign = 'center';
                adminNameCell.textContent = datedited;
                row.appendChild(adminNameCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = admin.UserId;
                nameCell.style.textAlign = 'center';
                row.appendChild(nameCell);

                const activityCell = document.createElement('td');
                activityCell.textContent = admin.Activity;
                activityCell.style.textAlign = 'center';
                row.appendChild(activityCell);

                const roleCell = document.createElement('td');
                roleCell.textContent = admin.Role;
                roleCell.style.textAlign = 'center';
                row.appendChild(roleCell);

                tbodycustomer.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alertCustom('Error', 'Failed to load audit data.');
    }
}

function createUnitAuditTrail(){
    var userId; 
    var activity="Created a unit";
    var role; 

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

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
            alertCustom('Create Unit', data.message);
        } else {
            alertCustom('Create Unit', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Failed to Create Unit', error.message);
    });
}

function updateUnitAuditTrail(){
    var userId; 
    var activity="Updated a unit";
    var role; 

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

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
            alertCustom('Update Unit Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alertCustom('Update Unit', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Failed to Update Unit', error.message);
    });
}

function deleteUnitAuditTrail(){
    var userId; 
    var activity="Deleted a unit";
    var role; 

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

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
            alertCustom('Delete Unit Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alertCustom('Delete Unit', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Failed to Delete Unit', error.message);
    });
}

function editProfileAuditTrail(){
    var userId; 
    var activity="Changed information in profile";
    var role; 

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

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
            alertCustom('Edit Profile Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alertCustom('Edit Profile', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Failed to Edit Profile', error.message);
    });
}

function idVerificationAuditTrail(){
    var userId; 
    var activity="Verified an ID";
    var role; 

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

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
            alertCustom('ID Verification Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alertCustom('ID Verification', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Failed to Verify ID', error.message);
    });
}

function cancelBookingAuditTrail(){
    var userId; 
    var activity="Cancelled a booking";
    var role; 

    const trail = new FormData();
    trail.append('UserId', userId);
    trail.append('Activity', activity);
    trail.append('Role', role);

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
            alertCustom('Cancel Booking Successful', data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alertCustom('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Failed to Cancel Booking', error.message);
    });
}
