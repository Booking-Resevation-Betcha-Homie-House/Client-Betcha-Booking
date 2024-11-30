async function LoginButton() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; // Hide error message at the start

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('password-input').value;

    const loginData = { email: email, password: password };
    console.log('Data:', JSON.stringify(loginData));

    try {
        openLoading();

        // Function to try login for a specific role (customer, admin, superAdmin)
        async function tryLogin(url, data) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response;
        }

        // Try customer login first
        let response = await tryLogin('https://betcha-booking-api-master.onrender.com/Login', loginData);
        if (response.status === 200) {
            const customerData = await response.json();
            alert('Successfully logged in as Customer');
            localStorage.setItem('id', customerData.userId);
            console.log('Logged in ID:', localStorage.getItem('id'));
            closeLoading();
            return;
        }

        // Try Super Admin login if customer login fails
        response = await tryLogin('https://betcha-booking-api-master.onrender.com/superAdminLogin', loginData);
        if (response.status === 200) {
            const superAdminData = await response.json();
            alert('Successfully logged in as Super Admin');
            localStorage.setItem('id', superAdminData.superAdminId);
            console.log('Logged in ID:', localStorage.getItem('id'));
            closeLoading();
            return;
        }

        // Try Admin login if previous logins fail
        response = await tryLogin('https://betcha-booking-api-master.onrender.com/LoginAdmin', loginData);
        if (response.status === 200) {
            const adminData = await response.json();
            alert('Successfully logged in as Admin');
            localStorage.setItem('id', adminData.adminId);
            console.log('Logged in ID:', localStorage.getItem('id'));
            closeLoading();
            return;
        }

        // If all login attempts fail, show error message
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

document.getElementById('login-btn').addEventListener('click', LoginButton);
