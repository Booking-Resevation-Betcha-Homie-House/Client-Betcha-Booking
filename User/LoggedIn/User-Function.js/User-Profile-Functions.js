// layout palang di pa tapos 
function userProfile(){
    console.log(localStorage.getItem('id'));
     
    fetch(`https://betcha-booking-api-master.onrender.com/user/${localStorage.getItem('id')}`)
    .then(response => response.json())
    .then(data => {
        const user = data.data; 
        if (data) {


            console.log(data);
            document.getElementById('profile-fullname').textContent = `${user.firstName}`; 
            document.getElementById('profile-mname-3').textContent = user.middleInitial 
            document.getElementById('profile-lname-4').textContent = `${user.lastName}`; 
            document.getElementById('profile-number-1').textContent = `${user.phoneNumber}`; 
            document.getElementById('profile-email-2').textContent = user.email
            console.log(user.IdImage.fileId);
            document.getElementById('profile-valid-id').src = `https://drive.google.com/thumbnail?id=${user.IdImage.fileId}&sz=w1920-h1080`; 
            document.getElementById('pfp-profile').src = `https://drive.google.com/thumbnail?id=${user.profileImage.fileId}&sz=w1920-h1080`; 
        } else {
            console.log('Display Admin','Super Admin not found or missing data.');
        }
        document.getElementById('profile-valid-id').onclick = () => {
            console.log('clicked!');
            window.open(`https://drive.google.com/thumbnail?id=${user.IdImage.fileId}&sz=w1920-h1080`,'_blank');
        };
    })
    .catch(error => {
        console.error('Error during display:', error);
        console.log('Failed to display Super Admin info: ', error.message);
    });
    
}

document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}