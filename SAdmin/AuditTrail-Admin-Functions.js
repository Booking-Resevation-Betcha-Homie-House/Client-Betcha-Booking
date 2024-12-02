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
            if(admin.Role === 'Admin' || admin.Role === 'SuperAdmin'){
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
                nameCell.textContent = admin.Username;
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
                nameCell.textContent = admin.Username;
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
        console.log('Error', 'Failed to load audit data.');
    }
}

function createUnitAuditTrail(userId,role){

        var id = userId
        var activity="Created a Unit";
        var Role = role
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Create Unit', data.message);
        } else {
            console.log('Create Unit', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Create Unit', error.message);
    });
}

function updateUnitAuditTrail(userId,role){

        var id = userId
        var activity="Edited a Unit";
        var Role = role
    
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Update Unit Successful', data.message);
            
        } else {
            console.log('Update Unit', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Update Unit', error.message);
    });
}

function deleteUnitAuditTrail(userId,role){

        var id = userId
        var activity="Deleted a unit";
        var Role = role
    
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Delete Unit Successful', data.message);
           
        } else {
            console.log('Delete Unit', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Unit', error.message);
    });
}

function editProfileAuditTrail(userId,role){

        var id = userId
        var activity="Edited an Info in Profile";
        var Role = role
    
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };
    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Edit Profile Successful', data.message);
           
        } else {
            console.log('Edit Profile', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Edit Profile', error.message);
    });
}

function idVerificationAuditTrail(userId,role){

        var id = userId
        var activity="Verified an ID";
        var Role = role
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('ID Verification Successful', data.message);
          
        } else {
            console.log('ID Verification', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Verify ID', error.message);
    });
}

function cancelBookingAuditTrail(userId,role){

        var id = userId
        var activity="Cancelled a booking";
        var Role = role
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };
    

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Cancel Booking Successful', data.message);
       
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Cancel Booking', error.message);
    });
}

function adminAddAuditTrail(userId,role){

        var id = userId
        var activity="Added an Admin";
        var Role = role
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };
    

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Added Admin Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Add Admin', error.message);
    });
}

function adminEditAuditTrail(userId,role){
    var id = userId
    var activity="Edited an Admin Info";
    var Role = role
    var username = localStorage.getItem('username');
    const trail = {
        'UserId': id,
        'Username': username,
        'Activity': activity,
        'Role': Role
    };

    console.log(userId + activity + role);
    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Editing Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Edit Admin', error.message);
    });
}

function adminDeleteAuditTrail(userId,role){

        var id = userId
        var activity="Deleted an Admin";
        var Role = role; 
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };


    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Deleting Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Admin', error.message);
    });
}

function adminEditProfileAuditTrail(userId,role){

        var id = userId
        var activity="SAdmin Profile Edit";
        var Role = role; 
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Edit Super Admin Info Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Admin', error.message);
    });
}

function transactionEditTrail(userId,role){

        var id = userId
        var activity="Transaction Edit";
        var Role = role; 
    
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Edit Super Admin Info Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Admin', error.message);
    });
}

function createdFAQTrail(userId,role){


        var id = userId
        var activity="Created a FAQ";
        var Role = role; 
    
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };


    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Edit Super Admin Info Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Admin', error.message);
    });
}

function deletedFAQTrail(userId,role){

        var id = userId
        var activity="Deleted a FAQ";
        var Role = role; 
    
        var username = localStorage.getItem('username');
        const trail = {
            'UserId': id,
            'Username': username,
            'Activity': activity,
            'Role': Role
        };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Deleting FAQ Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Admin', error.message);
    });
}

function editFAQTrail(userId,role){
    var id = userId
    var activity="Edited a FAQ";
    var Role = role; 

    var username = localStorage.getItem('username');
    const trail = {
        'UserId': id,
        'Username': username,
        'Activity': activity,
        'Role': Role
    };

    fetch('https://betcha-booking-api-master.onrender.com/audit/create', {
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
            console.log('Deleting FAQ Successful', data.message);
        } else {
            console.log('Cancel Booking', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        console.log('Failed to Delete Admin', error.message);
    });
}
