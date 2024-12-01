const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');

async function loadDataEdit() {
    const role = localStorage.getItem('role')
    console.log(role);
    checkSuperAdmin(role);
    try {
        const adminId = localStorage.getItem('id');
        if (!adminId) {
            throw new Error('Admin ID is not available in local storage');
        }

        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getSuperAdmin/${adminId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const admin = await response.json();

        console.log('Admin Data:', admin);
        
        document.getElementById('input-profile-username').value = admin.data.superAdminName;
        document.getElementById('input-profile-email').value = admin.data.email;
    } catch (error) {
        console.error('Error loading admin data:', error);
    }
}


function editadmin(){  
    const adminUsername = document.getElementById('input-profile-username').value;
    const adminEmail = document.getElementById('input-profile-email').value;
    const adminpass = document.getElementById('input-profile-password').value;
    const adminconfirm = document.getElementById('input-profile-confirmpw').value;
    
    const adminData = {};

    if (adminUsername){
        adminData.superAdminName = adminUsername;
        console.log(adminEmail);
    }

    if(adminEmail){
        
        adminData.email = adminEmail;
        console.log(adminUsername);
    }

    if(adminpass === adminconfirm){
    if(adminpass){
        adminData.password = adminpass
        console.log(adminpass);
    }
    }
    const adminId = localStorage.getItem('id');
    fetch(`https://betcha-booking-api-master.onrender.com/superAdminEdit/${adminId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
    })
    .then (respone => respone.json())
    .then(data =>{
        console.log(data);
        alertCustom('Info Updated!', data.message);
        adminEditProfileAuditTrail(localStorage.getItem('id'),localStorage.getItem('role'));
    })
    .catch(error => {
        console.log(error)
        alertCustom('Failed to Update the info', error.message)
    });
}

document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}
document.getElementById('cancel-edit-btn').onclick = () =>{
    window.location.href = `Profile.html`
}
document.getElementById('edit-btn').onclick = () =>{
    editadmin();
    setTimeout(() => {
        window.location.href = `Profile.html`;
    }, 2000); 
    
}