// id sa modal
let isLoading = false;

async function loadUnverifiedUsers() {

    const role = localStorage.getItem('role')
    console.log(role);
    checkSuperAdmin(role);

    console.log('loading Unverified Data');

    const btnVerified = document.getElementById('btn-verified');
    btnVerified.disabled = true;  

    if (isLoading) return;
    isLoading = true;
    
    openLoading(); 
    
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


        truncateTextInCells();

        const btnVerified = document.getElementById('btn-verified').onclick = function(){
            btnVerified.removeEventListener('click', loadVerifiedUsers());  
            btnVerified.addEventListener('click', loadVerifiedUsers());  
        }
       

    } catch (error) {
        console.error('Error:', error);
    } finally {
        btnVerified.disabled = false;  
        isLoading = false;  
        closeLoading();  
    }
}

async function loadVerifiedUsers() {
    console.log('loading Verified Data');

    const btnVerified = document.getElementById('btn-verified');
    btnVerified.disabled = true;  

    if (isLoading) return;
    isLoading = true;
    
    openLoading();
    
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

        truncateTextInCells();

        const btnVerified = document.getElementById('btn-verified').onclick = function(){
            btnVerified.removeEventListener('click', loadUnverifiedUsers());  
            btnVerified.addEventListener('click', loadUnverifiedUsers());  
        }  

    } catch (error) {
        console.error('Error:', error);
    } finally {
        btnVerified.disabled = false;  
        isLoading = false;  
        closeLoading();  
    }
}

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
        document.getElementById('view-user-fname').textContent = user.firstName;
        document.getElementById('view-user-mname').textContent = user.middleInitial;
        document.getElementById('view-lname').textContent = user.lastName;
        document.getElementById('view-user-bday').textContent = user.bday;

        const linkimage = `https://drive.google.com/thumbnail?id=${user.IdImage.fileId}&sz=w1920-h1080`;
        const image = document.getElementById('imageElement');
        image.src = linkimage;

        image.onclick = function() {
            const fullSizeImageUrl = `https://lh3.googleusercontent.com/d/${user.IdImage.fileId}=w1920-h1080?authuser=0`;
            window.open(fullSizeImageUrl, '_blank');  
        };

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

function truncateTextInCells() {
    const tdElements = document.querySelectorAll('td');
    const maxLength = 20;

    tdElements.forEach(td => {
        if (td.innerText.length > maxLength) {
            td.innerText = td.innerText.slice(0, maxLength) + "...";
        }
    });
}


function verifyUser(id) {
    const verify = {
        isVerified: true
    };

    fetch(`https://betcha-booking-api-master.onrender.com/updateUser/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(verify) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        closeLoading();
        window.location.href=`User-Verify.html`;
    })
    .catch(error => {
        closeLoading();
        console.error('Error during update:', error);
        console.log('Failed to verify user: ', error.message);
    });
}

function unverifyUser(id) {
    console.log('Unverify user with ID:', id); 

    const verify = {
        isVerified: false
    };

    fetch(`https://betcha-booking-api-master.onrender.com/updateUser/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(verify)
    })
    .then(response => {
        console.log('Response:', response); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Unverify response data:', data); 
        closeLoading();
        idVerificationAuditTrail(localStorage.getItem('id'),localStorage.getItem('role'));
        setTimeout(() => {
            window.location.href = `User-Verify.html`;
        }, 2000); 
        
    })
    .catch(error => {
        closeLoading();
        console.error('Error during update:', error);
        console.log('Failed to unverify user: ', error.message);
    });
}
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}
