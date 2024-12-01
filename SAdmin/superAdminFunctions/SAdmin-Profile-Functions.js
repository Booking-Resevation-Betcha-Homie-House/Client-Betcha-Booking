//Finished? dunno ask muna
// walang api para sa pag get ng super admin info
function SAdminProfile(){
    const role = localStorage.getItem('role')
    console.log(role);
    checkSuperAdmin(role);
    console.log(localStorage.getItem('id'));
     
    fetch(`https://betcha-booking-api-master.onrender.com/getSuperAdmin/${localStorage.getItem('id')}`)
    .then(response => response.json())
    .then(data => {
        const user = data.data; 
        if (data) {
           
            console.log(data);

            document.getElementById('profile-email').textContent = `${user.email}`; 
            document.getElementById('admin-name').innerHTML = `<h5><strong>${user.superAdminName}</strong></h5>`;
            document.getElementById('profile-username').textContent = `${user.superAdminName}`; 
        } else {
            alertCustom('Display Admin','Super Admin not found or missing data.');
        }
        document.getElementById('edit-btn').onclick = () => {
            window.location.href = `Profile-Edit.html?id=${user._id}`;
        };
    })
    .catch(error => {
        console.error('Error during display:', error);
        alertCustom('Failed to display Super Admin info: ', error.message);
    });
    
}

// copy paste sa lahat ng html na maylogout btn
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}
