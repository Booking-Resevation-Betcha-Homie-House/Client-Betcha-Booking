function adminProfile(){
    const role = localStorage.getItem('role');
    console.log(role);
    checkAdmin(role);
    console.log(localStorage.getItem('id'));
     
    fetch(`https://betcha-booking-api-master.onrender.com/getAdminInfo/${localStorage.getItem('id')}`) 
    .then(response => response.json())
    .then(data => {
        const user = data.data; 
        if (data) {
            console.log(data);

            document.getElementById('profile-email').textContent = `${user.email}`; 
            document.getElementById('admin-name').innerHTML = `<h5><strong>${user.adminName}</strong></h5>`;

            document.getElementById('profile-username').textContent = `${user.adminName}`; 
        } else {
            alert('Admin Not Found', 'Super Admin not found or missing data.');
        }
        document.getElementById('edit-btn').onclick = () => {
            window.location.href = `Profile-Edit.html?id=${user._id}`;
        };
    })
    .catch(error => {
        console.error('Error during display:', error);
        alert('Error', 'Failed to display Admin info: ' + error.message);
    });
}

document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href = '../LogIn.html';
};
