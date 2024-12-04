async function LoginButton() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; 

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('password-input').value;

    const loginData = { email: email, password: password };
    console.log('Data:', JSON.stringify(loginData));

    try {
        openLoading();

        async function tryLogin(url, data) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response;
        }

        let response = await tryLogin('https://betcha-booking-api-master.onrender.com/Login', loginData);
        if (response.status === 200) {
            const customerData = await response.json();
            window.location.href = "../User/LoggedIn/Rooms.html"
            
            localStorage.setItem('id', customerData.userId);
            localStorage.setItem('role', customerData.role);
            console.log('Logged in ID:', localStorage.getItem('id'));
            console.log('Role: ', localStorage.getItem('role'));

            const fullname = customerData.firstName + ' '+ customerData.lastName;
            localStorage.setItem('username', fullname);
            console.log('Username: ', localStorage.getItem('username'));

            let isVerified = customerData.isVerified;
            localStorage.setItem('isVerified', isVerified.toString()); 
            
            let storedIsVerified = localStorage.getItem('isVerified') === 'true';
            console.log(storedIsVerified);

            // how to use?:
            // let storedIsVerified = localStorage.getItem('isVerified') === 'true';
            // console.log(storedIsVerified);

            closeLoading();
            setTimeout(() => {
                console.log('Login','Successfully logged in as Customer');
            }, 1000);
            return;
        }

        response = await tryLogin('https://betcha-booking-api-master.onrender.com/superAdminLogin', loginData);
        if (response.status === 200) {
            const superAdminData = await response.json();
            window.location.href = "../SAdmin/Dashboard.html"
            localStorage.setItem('id', superAdminData.superAdminId);
            localStorage.setItem('role', superAdminData.role);
            localStorage.setItem('username', superAdminData.superAdminName)
            console.log('Logged in ID:', localStorage.getItem('id'));
            console.log('Role: ', localStorage.getItem('role'));
            closeLoading();
            return;
        }

        response = await tryLogin('https://betcha-booking-api-master.onrender.com/LoginAdmin', loginData);
        if (response.status === 200) {
            const adminData = await response.json();
            window.location.href = "../Admin/Dashboard.html"
            localStorage.setItem('id', adminData.adminId);
            localStorage.setItem('role', adminData.role);
            localStorage.setItem('username', adminData.adminName)
            console.log('Logged in ID:', localStorage.getItem('id'));
            console.log('Role: ', localStorage.getItem('role'))
            closeLoading();
            return;
        }

        closeLoading();
        throw new Error('Invalid credentials');
    } catch (error) {
        closeLoading();
        setTimeout(() => {
            console.error('Error during login:', error);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Login failed: ' + error.message;
        }, 1000);
    }
}


function resetButton() {
    const email = document.querySelector('#modal-forgot-pass .modal-body input').value;

    if (!email) {
        alert('Please enter an email address.');
        return;
    }

    localStorage.setItem('emailForgot', email);
    console.log(localStorage.getItem('emailForgot'));
    openLoading();
    fetch('https://betcha-booking-api-master.onrender.com/otp/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email }), 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            closeLoading();
            console.log('API Response:', data);
            const otpModal = new bootstrap.Modal(document.getElementById('modal-otp'));
            otpModal.show();
        })
        .catch(error => {
            closeLoading()
            console.error('Error:', error);
            alert('Failed to send OTP. Please try again later.');
        });
}
function confirmOtp() {
    console.log('verifying otp');
    const otp = document.getElementById('otp-pin-input').value;
    const email = localStorage.getItem('emailForgot');

    console.log('otp: ', otp);
    console.log('email: ', email);

    if (!email || !otp) {
        alertCustom('OTP', 'Please enter valid OTP');
        return;
    }

    const requestBody = {
        email: email,  
        otp: otp       
    };

    console.log('Request Body:', JSON.stringify(requestBody));

    fetch('https://betcha-booking-api-master.onrender.com/otp/forgot/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), 
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(`Error: ${err.error || err.message}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('OTP verification successful:', data);
        alertCustom('OTP', 'OTP verified successfully!');
        window.location.href = `../ForgotPassword.html?id=${email}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alertCustom('OTP', 'Failed to verify OTP. ' + error.message);
    });
}

document.getElementById('reset').addEventListener('click', resetButton);
document.getElementById('Confirm-otp').addEventListener('click', confirmOtp);
document.getElementById('login-btn').addEventListener('click', LoginButton);

