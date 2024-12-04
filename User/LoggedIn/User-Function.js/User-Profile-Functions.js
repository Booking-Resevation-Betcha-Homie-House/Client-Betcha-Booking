
// layout palang di pa tapos 

function userProfile(){
    const role = localStorage.getItem('role')
    console.log(role);
    checkSuperAdmin(role);
    console.log(localStorage.getItem('id'));
     
    fetch(`https://betcha-booking-api-master.onrender.com/user/${localStorage.getItem('id')}`)
    .then(response => response.json())
    .then(data => {
        const user = data.data; 
        if (data) {
           
            console.log(data);
            //palitan id ng mga paragraph may mga mag kakaparehas
            document.getElementById('profile-fullname').textContent = `${user.email}`; //fname
            document.getElementById('profile-mname-3').textContent = `<h5><strong>${user.superAdminName}</strong></h5>`;//mname
            document.getElementById('profile-lname-4').textContent = `${user.superAdminName}`; //lname
            document.getElementById('profile-number-1').textContent = `${user.email}`; //number to
            document.getElementById('profile-email-2').textContent = `<h5><strong>${user.superAdminName}</strong></h5>`;
            document.getElementById('edit-password').textContent = '';
            document.getElementById('profile-valid-id').textContent = `${user.superAdminName}`; // okay na to
        } else {
            console.log('Display Admin','Super Admin not found or missing data.');
        }
        document.getElementById('edit-btn').onclick = () => {
            window.location.href = `Profile-Edit.html?id=${user._id}`;
        };
    })
    .catch(error => {
        console.error('Error during display:', error);
        console.log('Failed to display Super Admin info: ', error.message);
    });
    
}

// copy paste sa lahat ng html na maylogout btn
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}