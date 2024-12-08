function formatDateTo12Hour(dateString) {
    const date = new Date(dateString);  // Convert string to Date object

    // Extract components of the date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    const hour12 = hours % 12;
    const displayHour = hour12 ? hour12 : 12;  // 12 should be displayed for '0' hours (midnight or noon)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Format the full date in MM/DD/YYYY hh:mm:ss AM/PM format
    const formattedDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()} ${displayHour}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    
    return formattedDate;
}

async function loadAuditData() {
    const role = localStorage.getItem('role');
    console.log(role);
    checkSuperAdmin(role);

    console.log('function called!');

    const tbodycompleted = document.getElementById('table-body-completed');
    const tbodycustomer = document.getElementById('table-body-customer');

    if (!tbodycompleted || !tbodycustomer) {
        console.log('Required table body elements are missing');
        return;
    }

    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/auit/all');
        if (!response.ok) {
            throw new Error('Failed to fetch audit data');
        }

        const admins = await response.json();

        tbodycompleted.innerHTML = '';
        tbodycustomer.innerHTML = '';

        const data = admins.data;
        console.log(data);

        if (!data || data.length === 0) {
            console.log('No data available');
            return;
        }

        admins.data.forEach(admin => {
            const row = document.createElement('tr');

            if (!admin.Reference || !admin.Date || !admin.Username || !admin.Activity || !admin.Role) {
                console.log('Missing data for admin:', admin);
                return;
            }

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = admin.Reference;
            referenceNumberCell.style.textAlign = 'center';
            row.appendChild(referenceNumberCell);

            const adminNameCell = document.createElement('td');
            const formattedDate = formatDateTo12Hour(admin.Date);  // Use the new formatDateTo12Hour function
            adminNameCell.style.textAlign = 'center';
            adminNameCell.textContent = formattedDate;
            row.appendChild(adminNameCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.Username || 'Deactivated User';
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

            if (admin.Role === 'Admin' || admin.Role === 'SuperAdmin') {
                tbodycompleted.appendChild(row);
            } else if (admin.Role === 'Customer') {
                tbodycustomer.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to load audit data.');
    }
}

setInterval(loadAuditData, 3000);
loadAuditData();



function createUnitAuditTrail(userId,role){

        var id = userId
        var activity="Created a Unit";
        var Role = role
        const trail = {
            'UserId': id,
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
    
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
    const trail = {
        'UserId': id,
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
        var Role = role; ;
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
        const trail = {
            'UserId': id,
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
    const trail = {
        'UserId': id,
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
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}