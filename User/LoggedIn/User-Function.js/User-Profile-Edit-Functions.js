function filldata(){
    console.log(localStorage.getItem('id'));
    fetch(`https://betcha-booking-api-master.onrender.com/user/${localStorage.getItem('id')}`)
    .then(response => response.json())
    .then(data => {
        const user = data.data; 
        if (data) {

            console.log(data);
            document.getElementById('profile-fullname').value = `${user.firstName}`; 
            document.getElementById('profile-mname-3').value = user.middleInitial 
            document.getElementById('profile-lname-4').value = `${user.lastName}`; 
            document.getElementById('profile-number-1').value = `${user.phoneNumber}`; 
            document.getElementById('profile-email-2').value = user.email
            console.log(user.IdImage.fileId);
            document.getElementById('profile-valid-id').src = `https://drive.google.com/thumbnail?id=${user.IdImage.fileId}&sz=w1920-h1080`; 
            document.getElementById('pfp-edit').src = `https://drive.google.com/thumbnail?id=${user.profileImage.fileId}&sz=w1920-h1080`; 
        } else {
            console.log('Display Admin','Super Admin not found or missing data.');
        }
        document.getElementById('edit-btn').onclick = () => {
            window.location.href = `Profile-Edit.html?id=${user._id}`;
        };
        document.getElementById()
    })
    .catch(error => {
        console.error('Error during display:', error);
        console.log('Failed to display Super Admin info: ', error.message);
    });
    
}

document.getElementById('cancel-btn').onclick = function(){
    window.location.href = "/User/LoggedIn/Profile.html"
}