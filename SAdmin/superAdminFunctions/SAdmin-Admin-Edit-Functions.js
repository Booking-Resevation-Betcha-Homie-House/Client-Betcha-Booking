const urlParams = new URLSearchParams(window.location.search);
const adminID = urlParams.get('id');
console.log('Unit ID from URL: ', adminID);

async function adminFill(){
    const role = localStorage.getItem('role');
    console.log(role);
    checkSuperAdmin(role);

    console.log('func called');
    console.log(adminID);
    const response = await fetch(`https://betcha-booking-api-master.onrender.com/getAdminInfo/${adminID}`);
    const admin = await response.json();
    
    console.log(admin.data.adminName);
    document.getElementById('input-admin-name').value = admin.data.adminName;
    document.getElementById('input-admin-email').value = admin.data.email;   
}

function adminEdit(event) {

    //event.preventDefault(); 
    //event.stopPropagation() ; 
   
    console.log('function called');
    const email = document.getElementById('input-admin-email').value;
    const password = document.getElementById('input-unit-num-pax').value;
    const adminName = document.getElementById('input-admin-name').value;
    const cpassword = document.getElementById('input-admin-confirm-password').value;

    const updateData = {};

    if (email) {
        updateData.email = email;
    }

    if(password === cpassword){
    if (password) {
        updateData.password = password;
        
    }
    }
    else {
        alertCustom('Invalid Password','Password and Confirm Password is not the same');
        return;
    }
    if (adminName) {
        updateData.adminName = adminName;
    }

    console.log(updateData);
    openLoading();
    fetch(`https://betcha-booking-api-master.onrender.com/updateAdmin/${adminID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updateData) 
    })
    .then(response => response.json())
    .then(data => {
        adminEditAuditTrail(localStorage.getItem('id'),localStorage.getItem('role'));
        console.log('Update Successful', 'Admin updated successfully');
        //location.reload();
        closeLoading();
        setTimeout(()=> {
            window.location.href = `Admin-View.html?id=${adminID}`;
        },2000)
    })
    .catch(error => {
        console.error('Error during update:', error);
        alertCustom('Update Failed', 'Failed to update Admin: ' + error.message);
        closeLoading();
    }); 
}

function previouspage(){
    window.location.href = `Admin-View.html?id=${adminID}`;
}

document.getElementById('cancel-button').addEventListener('click', previouspage);
document.getElementById('save-button').onclick = () =>{
    adminEdit()
};
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href = '../LogIn.html';
};
