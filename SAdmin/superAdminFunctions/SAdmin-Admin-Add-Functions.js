//finished


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
        alert("Please fill out all fields.");
        return;
    }
    else if (password != confirmpassword){
        alert("Password and Confirm password is not the same")
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
            alert('Registration successful: ' + data.message);
            window.location.href = `Admin-List.html`;
        } else {
            alert('Registration successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
   
}
document.getElementById('add-button-admin').addEventListener('click',AddAdmin);
document.getElementById('btn-cancel').onclick = () => {
    window.location.href = 'Admin-List.html';
};
