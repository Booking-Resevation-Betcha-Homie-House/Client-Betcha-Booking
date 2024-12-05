function filldata() {
    console.log(localStorage.getItem('id'));
    fetch(`https://betcha-booking-api-master.onrender.com/user/${localStorage.getItem('id')}`)
        .then(response => response.json())
        .then(data => {
            const user = data.data;
            if (data) {
                document.getElementById('profile-fullname').value = `${user.firstName}`;
                document.getElementById('profile-mname-3').value = user.middleInitial;
                document.getElementById('profile-lname-4').value = `${user.lastName}`;
                document.getElementById('profile-number-1').value = `${user.phoneNumber}`;
                document.getElementById('profile-email-2').value = user.email;
                document.getElementById('profile-valid-id').src = `https://drive.google.com/thumbnail?id=${user.IdImage.fileId}&sz=w1920-h1080`;
                document.getElementById('pfp-edit').src = `https://drive.google.com/thumbnail?id=${user.profileImage.fileId}&sz=w1920-h1080`;
            } else {
                console.log('Display Admin', 'Super Admin not found or missing data.');
            }
        })
        .catch(error => {
            console.error('Error during display:', error);
            console.log('Failed to display Super Admin info: ', error.message);
        });
   console.log('end of fill data');

   document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear();
    console.log('called update');
    window.location.href = '../LogIn.html';
});

document.getElementById('edit-btn').addEventListener('click', () => {
    console.log('called update');
    updateUserInfo();
    editProfileAuditTrail();
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    console.log('called update');
    window.location.href = "/User/LoggedIn/Profile.html";
});
}


function updateUserInfo() {
    console.log('update called');
    const pfp = document.getElementById('file-input').files[0];
    const email = document.getElementById('profile-email-2').value;
    const pass = document.getElementById('edit-password').value;
    const fname = document.getElementById('profile-fullname').value;
    const mname = document.getElementById('profile-mname-3').value;
    const lname = document.getElementById('profile-lname-4').value;
    const phonenumber = document.getElementById('profile-number-1').value;
    const confirmpw = document.getElementById('edit-confirm-password').value;

    const newimg = new FormData();
    newimg.append('profileImage', pfp); // Corrected to append with a key
    const userData = {};

    if (email) {
        userData.email = email;
        console.log(email);
    }

    if (fname) {
        userData.firstName = fname;
        console.log(fname);
    }

    if (mname) {
        userData.middleInitial = mname;
        console.log(mname);
    }

    if (lname) {
        userData.lastName = lname;
        console.log(lname);
    }

    if (phonenumber) {
        userData.phoneNumber = phonenumber;
        console.log(phonenumber);
    }

    if (pass === confirmpw) {
        if (pass) {
            userData.password = pass;
            console.log(pass);
        }
    }

    fetch(`https://betcha-booking-api-master.onrender.com/updateUser/${localStorage.getItem('id')}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('update1');
        console.log('Info Updated!', data.message);

    })
    .catch(error => {
        console.log(error);
        console.log('Failed to Update the info', error.message);
    });
    if(newimg){
    fetch(`https://betcha-booking-api-master.onrender.com/profile-image/${localStorage.getItem('id')}`, {
        method: 'PUT',
        body: newimg
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                console.log('Error img:', data);
                //closeLoading(); // Assuming closeLoading() exists
                throw new Error(`Failed updating Img: ${data.message || 'Unknown error'}`);
            }
            return data;
        });
    })
    .then(data => {
        alertCustom('User registered successfully!');
        console.log('User Data:', data);
    })
}
}
