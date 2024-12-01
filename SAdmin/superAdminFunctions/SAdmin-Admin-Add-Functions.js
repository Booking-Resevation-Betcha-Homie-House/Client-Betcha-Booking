function checkSuperAdmin(SuperAdmin){
    console.log('Checking super admin')
    if (SuperAdmin === 'SuperAdmin'){
        console.log('SuperAdmin Confirmed');
        return;
    }
    else if (SuperAdmin === 'Admin'){
        console.log('This is for admin page');
        window.location.href = "../Admin/Dashboard.html";
    }
    else if (SuperAdmin === 'Customer'){
        console.log('This page is for customers');
        // window.location.href = "../Customer/Dashboard"; lagyan kapag meron na
    }
    else{
        console.log('no logged in user')
        // window.location.href = "../landing page"; lagyan kapag meron na
    }
}

function AddAdmin() {
    console.log('function called');
    const email = document.getElementById('input-admin-email').value;
    const password = document.getElementById('input-unit-num-pax').value;
    const adminName = document.getElementById('input-admin-name').value;
    const confirmpassword = document.getElementById('input-admin-confirm-password').value;
    
    if (!email || !password || !adminName) {
        alertCustom('Missing Information', 'Please fill out all fields.');
        return;
    }
    else if (password != confirmpassword){
        alertCustom('Password Mismatch', 'Password and Confirm password do not match.');
        return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', adminName);

    const registerAdminData = {
        email: email,
        password: password,
        adminName: adminName
    };

    console.log(registerAdminData);
    fetch('https://betcha-booking-api-master.onrender.com/createAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerAdminData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            adminAddAuditTrail(localStorage.getItem('id'),localStorage.getItem('role'));
            alertCustom('Registration Successful', data.message);
            console.log(localStorage.getItem('id'),localStorage.getItem('role'));
          
            setTimeout(() => {
                window.location.href = `Admin-List.html`;
            }, 2000); 
            alertCustom('Registration Successful', 'No message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alertCustom('Registration Failed', error.message);
    });
}

document.getElementById('add-button-admin').onclick = ()=>{
    AddAdmin()
} ;
document.getElementById('btn-cancel').onclick = () => {
    window.location.href = 'Admin-List.html';
};
