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
            //window.location.href = "../Customer/Dashboard.html" lagyan if meron na
            alert('Successfully logged in as Customer');
            localStorage.setItem('id', customerData.userId);
            localStorage.setItem('role', customerData.role);
            console.log('Logged in ID:', localStorage.getItem('id'));
            console.log('Role: ', localStorage.getItem('role'))
            closeLoading();
            return;
        }

        response = await tryLogin('https://betcha-booking-api-master.onrender.com/superAdminLogin', loginData);
        if (response.status === 200) {
            const superAdminData = await response.json();
            window.location.href = "../SAdmin/Dashboard.html"
            localStorage.setItem('id', superAdminData.superAdminId);
            localStorage.setItem('role', superAdminData.role);
            console.log('Logged in ID:', localStorage.getItem('id'));
            console.log('Role: ', localStorage.getItem('role'))
            closeLoading();
            return;
        }

        response = await tryLogin('https://betcha-booking-api-master.onrender.com/LoginAdmin', loginData);
        if (response.status === 200) {
            const adminData = await response.json();
            window.location.href = "../Admin/Dashboard.html"
            localStorage.setItem('id', adminData.adminId);
            localStorage.setItem('role', adminData.role);
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

document.getElementById('login-btn').addEventListener('click', LoginButton);
