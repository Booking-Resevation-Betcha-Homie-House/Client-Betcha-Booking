function LoginButton() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('password-input').value;

    const loginData = {
        email: email,
        password: password
    };

    console.log('Data:', JSON.stringify(loginData));

    fetch('https://betcha-booking-api-master.onrender.com/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        console.log('Response Status:', response.status);
        if (response.status === 200) {
            alert('Successfully logged in as user');
            window.location.href = '../User/Dashboard.html'; // Redirect to user dashboard
        } else if (response.status === 400 || response.status === 404) {
            console.log('Login failed. Attempting Super Admin login...');
            return fetch('https://betcha-booking-api-master.onrender.com/superAdminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
        } else {
            throw new Error('Login failed with an unexpected status');
        }
    })
    .then(superAdminResponse => {
        if ( superAdminResponse.status === 200) {
            alert('Successfully logged in as Super Admin');
            window.location.href = '../SAdmin/Dashboard.html'; // Redirect to super admin dashboard
        } else if ( superAdminResponse.status === 400 || superAdminResponse.status === 404) {
            console.log('Super Admin login failed. Attempting Admin login...');
            return fetch('https://betcha-booking-api-master.onrender.com/LoginAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
        } else {
            throw new Error('Super Admin login failed');
        }
    })
    .then(AdminResponse => {
        if ( AdminResponse.status === 200) {
            alert('Successfully logged in as Admin');
            window.location.href = '../Admin/Dashboard.html'; // Redirect to admin dashboard
        } else if ( AdminResponse.status === 400 ||  AdminResponse.status === 404) {
            throw new Error('Admin login failed');
        } else {
            throw new Error('Admin login failed with an unexpected status');
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
        alert('Failed to login: ' + error.message);  // Display a more specific error message
    });
}

document.getElementById('login-btn').addEventListener('click', LoginButton);
