//walang Birthday sa schema
// lagay complete tab
// id sa modal
let isLoading = false;

async function loadUnverifiedUsers() {
    console.log('loading Unverified Data');
    
    // Disable the button to prevent further clicks during data load
    const btnVerified = document.getElementById('btn-verified');
    btnVerified.disabled = true;  // Disable button
    
    // If it's already loading, do nothing
    if (isLoading) return;
    isLoading = true;
    
    openLoading();  // Show loading spinner
    
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/users/unverified');
        console.log(response);
        
        if (!response.ok) {
            throw new Error('Failed to fetch unverified user data');
        }

        const unverifiedUsers = await response.json();
        document.getElementById('total-pending-amount').textContent = unverifiedUsers.count;
        document.getElementById('btn-verified').textContent = 'View Verified';
        document.getElementById('total-label').textContent = "Total Pending: ";
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        if (unverifiedUsers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-data">No Unverified user available</td></tr>';
            return;
        }

        console.log(unverifiedUsers);
        console.log(unverifiedUsers.data);

        unverifiedUsers.data.forEach(unverifiedUser => {
            const row = document.createElement('tr');
            addUserToRow(row, unverifiedUser);
            tbody.appendChild(row);
        });

        // Truncate text inside table cells to max 20 characters
        truncateTextInCells();

        // Now bind the click event to load verified users
        const btnVerified = document.getElementById('btn-verified').onclick = function(){
            btnVerified.removeEventListener('click', loadVerifiedUsers());  
            btnVerified.addEventListener('click', loadVerifiedUsers());  
        }
       

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Re-enable the button after the data is loaded  
        btnVerified.disabled = false;  
        isLoading = false;  // Set loading state to false
        closeLoading();  // Close loading spinner
    }
}

async function loadVerifiedUsers() {
    console.log('loading Verified Data');
    
    // Disable the button to prevent further clicks during data load
    const btnVerified = document.getElementById('btn-verified');
    btnVerified.disabled = true;  // Disable button
    
    // If it's already loading, do nothing
    if (isLoading) return;
    isLoading = true;
    
    openLoading();  // Show loading spinner
    
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/users/verified');
        console.log(response);
        
        if (!response.ok) {
            throw new Error('Failed to fetch verified user data');
        }

        const verifiedUsers = await response.json();
        document.getElementById('total-pending-amount').textContent = verifiedUsers.count;
        document.getElementById('btn-verified').textContent = 'View Pending';
        document.getElementById('total-label').textContent = "Total Verified: ";
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        if (verifiedUsers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-data">No Verified user available</td></tr>';
            return;
        }

        console.log(verifiedUsers);
        console.log(verifiedUsers.data);

        verifiedUsers.data.forEach(verifiedUser => {
            const row = document.createElement('tr');
            addUserToRow(row, verifiedUser);
            tbody.appendChild(row);
        });

        // Truncate text inside table cells to max 20 characters
        truncateTextInCells();

        // Now bind the click event to load unverified users
        const btnVerified = document.getElementById('btn-verified').onclick = function(){
            btnVerified.removeEventListener('click', loadUnverifiedUsers());  
            btnVerified.addEventListener('click', loadUnverifiedUsers());  
        }  

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Re-enable the button after the data is loaded  
        btnVerified.disabled = false;  
        isLoading = false;  // Set loading state to false
        closeLoading();  // Close loading spinner
    }
}




// Helper function to add user data to a table row
function addUserToRow(row, user) {
    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = user.firstName;
    firstNameCell.style.textAlign = 'center';
    row.appendChild(firstNameCell);

    const middleNameCell = document.createElement('td');
    middleNameCell.textContent = user.middleInitial;
    middleNameCell.style.textAlign = 'center';
    row.appendChild(middleNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = user.lastName;
    lastNameCell.style.textAlign = 'center';
    row.appendChild(lastNameCell);

    const phoneNumberCell = document.createElement('td');
    phoneNumberCell.textContent = user.phoneNumber;
    phoneNumberCell.style.textAlign = 'center';
    row.appendChild(phoneNumberCell);

    const birthDateCell = document.createElement('td');
    birthDateCell.textContent = user.bday;
    birthDateCell.style.textAlign = 'center';
    row.appendChild(birthDateCell);

    const viewDetailsActionCell = document.createElement('td');
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = 'View Details';
    viewDetailsButton.classList.add('btn', 'btn-secondary');
    viewDetailsButton.setAttribute("data-bs-target", "#modal-verify");
    viewDetailsButton.setAttribute("data-bs-toggle", "modal");
    viewDetailsButton.onclick = () => {
        // Setting Info in Modal
        document.getElementById('view-user-fname').textContent = user.firstName;
        document.getElementById('view-user-mname').textContent = user.middleInitial;
        document.getElementById('view-lname').textContent = user.lastName;
        document.getElementById('view-user-bday').textContent = user.bday;

        // Setting of the Method in the buttons
        console.log(user._id);
        document.getElementById('btn-verify').addEventListener('click', function () {
            verifyUser(user._id);
        });
        document.getElementById('btn-decline').addEventListener('click', function () {
            unverifyUser(user._id);
        });
    };
    viewDetailsActionCell.appendChild(viewDetailsButton);
    row.appendChild(viewDetailsActionCell);
}

// Function to truncate text in table cells
function truncateTextInCells() {
    const tdElements = document.querySelectorAll('td');
    const maxLength = 20;

    tdElements.forEach(td => {
        if (td.innerText.length > maxLength) {
            td.innerText = td.innerText.slice(0, maxLength) + "...";
        }
    });
}




function verifyUser(id){

    const verify ={
        "isVerified": true
    }
    fetch(`https://betcha-booking-api-master.onrender.com/updateUser/${id}`, {
        method: 'PUT',
        body: verify
})
    .then(response => response.json())
    .then(data => {
        alert('Admin updated successfully');
        closeLoading();
        window.location.href=`User-Verify.html`;
    })
    .catch(error => {
        closeLoading();
        console.error('Error during update:', error);
        alert('Failed to update Admin: ' + error.message);
    }); 
}

function unverifyUser(id){

    const verify ={
        "isVerified": false
    }
    fetch(`https://betcha-booking-api-master.onrender.com/updateUser/${id}`, {
        method: 'PUT',
        body: verify
})
    .then(response => response.json())
    .then(data => {
        alert('Admin updated successfully');
        closeLoading();
        window.location.href=`User-Verify.html`;
    })
    .catch(error => {
        closeLoading();
        console.error('Error during update:', error);
        alert('Failed to update Admin: ' + error.message);
    }); 
}

