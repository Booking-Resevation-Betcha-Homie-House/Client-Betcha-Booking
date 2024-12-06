const otpModal = new bootstrap.Modal(document.getElementById('modal-otp'));

function Register() {
    openLoading();
    const errorMessage = document.getElementById('error-message');
    const errorMessage1 = document.getElementById('error-message-1');
    let hasError = false;

    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-pass').value;
    const firstName = document.getElementById('reg-fname').value;
    const middleInitial = document.getElementById('reg-mname').value; 
    const lastName = document.getElementById('reg-lname').value;
    const sex = document.getElementById('reg-sex').value;
    const phoneNumber = document.getElementById('reg-phone-num').value;
    const idImage = document.getElementById('imageInput');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    if(middleInitial) formData.append('middleInitial', middleInitial);
    formData.append('lastName', lastName);
    formData.append('sex', sex);  
    formData.append('phoneNumber', phoneNumber);
    formData.append('IdImage', idImage.files[0]); 

    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    function validateField(field, name) {
        if (!field || !field.value) {
            field.style.border = '2px solid red';
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Register failed: ${name} is required.`;
            errorMessage1.style.display = 'block';
            errorMessage1.textContent = `Register failed: ${name} is required.`;
            hasError = true;
            closeLoading();
        } else {
            field.style.border = ''; 
        }
    }

    validateField(document.getElementById('reg-email'), 'Email');
    validateField(document.getElementById('reg-password'), 'Password');
    validateField(document.getElementById('reg-fname'), 'First Name');
    validateField(document.getElementById('reg-lname'), 'Last Name');
    validateField(document.getElementById('reg-sex'), 'Sex');
    validateField(document.getElementById('reg-phone-num'), 'Phone Number');
    validateField(idImage, 'ID Image');

    if (password !== confirmPassword) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Register failed: Passwords do not match.';
        errorMessage1.style.display = 'block';
        errorMessage1.textContent = 'Register failed: Passwords do not match.';
        document.getElementById('reg-password').style.border = '2px solid red';
        document.getElementById('reg-confirm-pass').style.border = '2px solid red';
        hasError = true;
        closeLoading();
    }

    if (hasError) {
        return; 
    }

    fetch('https://betcha-booking-api-master.onrender.com/Register', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                console.log('Error details:', data);
                closeLoading();
                throw new Error(`Register failed: ${data.message || 'Unknown error'}`);
            }
            closeLoading();
            return data;
        });
    })
    .then(data => {
        if (data.error) {
            closeLoading();
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Register failed: ${data.error}`;
            errorMessage1.style.display = 'block';
            errorMessage1.textContent = `Register failed: ${data.error}`;
        } else {
            closeLoading();
            alertCustom('User registered successfully!');
            console.log('User Data:', data);

            setTimeout(() => {
                window.location.href= 'Login.html';
            }, 2000);
        }
    })
    .catch((error) => {
        console.error('Error during registration:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Register failed: ${error.message}`;
        errorMessage1.style.display = 'block';
        errorMessage1.textContent = `Register failed: ${error.message}`;
    });
}

function OTPSend(){
    const errorMessage = document.getElementById('error-message');
    const errorMessage1 = document.getElementById('error-message-1');
    let hasError = false;

    const email = document.getElementById('reg-email');
    const password = document.getElementById('reg-password');
    const confirmPassword = document.getElementById('reg-confirm-pass');
    const firstName = document.getElementById('reg-fname');
    const middleInitial = document.getElementById('reg-mname'); 
    const lastName = document.getElementById('reg-lname');
    const sex = document.getElementById('reg-sex');
    const phoneNumber = document.getElementById('reg-phone-num');
    const idImage = document.getElementById('imageInput');
    const check = document.getElementById('formCheck-1').checked

    regexCheck(email.value, password.value);

    errorMessage.style.display = 'none';
    errorMessage1.style.display = 'none';

    function validateField(field) {
        if (field.type === 'file') {

            if (!field.files || field.files.length === 0) {
                field.style.border = '2px solid red';
                hasError = true;
            } else {
                field.style.border = '';
            }
        } else if (!field.value) {
            field.style.border = '2px solid red';
            hasError = true;
        } else {
            field.style.border = '';
        }
    }
    if(!check){field.style.border = '2px solid red'; hasError = true;}
    validateField(email);
    validateField(password);
    validateField(confirmPassword);
    validateField(firstName);
    validateField(lastName);
    validateField(sex);
    validateField(phoneNumber);
    validateField(idImage);

    if (password.value !== confirmPassword.value) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Register failed: Password does not match.'
        errorMessage1.style.display = 'block';
        errorMessage1.textContent = 'Register failed: Password does not match.'
        password.style.border = '2px solid red';
        confirmPassword.style.border = '2px solid red';
        hasError = true;
    }

    if (hasError) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Register failed: Please fix the highlighted fields.';
        errorMessage1.style.display = 'block';
        errorMessage1.textContent = 'Register failed: Password does not match.'
        return;
    }

    console.log('test otp')

    const email1 = document.getElementById('reg-email').value;
    console.log(email1)

    const requestBody = {
        email: email1,        
    };
    if(!email){alertCustom('No email found!')}
    fetch('https://betcha-booking-api-master.onrender.com/otp/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(requestBody), 
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
            otpModal.show();
        })
        .catch(error => {
            closeLoading()
            console.error('Error:', error);
            alertCustom('Failed to send OTP', 'Please try again later.');
        });
}

function OTPVerify(){
    const email = document.getElementById('reg-email').value;
    const otp = document.getElementById('verify-input').value
    const requestBody = {
        email: email,  
        otp: otp       
    };

    console.log('Request Body:', JSON.stringify(requestBody));

    fetch('https://betcha-booking-api-master.onrender.com/otp/verify', {
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
        otpModal.hide(); 
        otpModal.dispose();
        setTimeout(()=>{
            Register();
        }, 1000)
    })
    .catch(error => {
        console.error('Error:', error);
        alertCustom('OTP', 'Failed to verify OTP. ' + error.message);
    });
}

function onloadRegex() {
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const phoneInput = document.getElementById('reg-phone-num');
    const emailSuggestion = document.getElementById('email-suggestion');
    const passwordSuggestion = document.getElementById('password-suggestion');
    const phoneSuggestion = document.getElementById('phone-suggestion');
    
    const nextBtn = document.getElementById('nextBtn'); 
    const registerBtn = document.getElementById('btn-register-1'); 

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;

    const phoneRegex = /^09\d{9}$/;

    function validateEmail() {
        const email = emailInput.value;
        if (!emailRegex.test(email)) {
            emailSuggestion.textContent = 'Email should be valid (e.g. example@gmail.com)';
            registerBtn.disabled = true;
            registerBtn.style.backgroundColor = '#147B42';  
        } else {
            emailSuggestion.textContent = ''; 
            validateForm1(); 
        }
    }


    function validatePassword() {
        const password = passwordInput.value;
        if (!passwordRegex.test(password)) {
            passwordSuggestion.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, and one special character.';
            registerBtn.disabled = true; 
            registerBtn.style.backgroundColor = '#147B42';  
        } else {
            passwordSuggestion.textContent = ''; 
            validateForm1();
        }
    }


    function validatePhone() {
        const phone = phoneInput.value;
        if (!phoneRegex.test(phone)) {
            phoneSuggestion.textContent = 'Phone number should start with 09 and have exactly 11 digits.';
            nextBtn.disabled = true; 
            nextBtn.style.backgroundColor = '#147B42';        
        } else {
            phoneSuggestion.textContent = ''; 
            validateForm1(); 
            enableButtons()
        }
    }

    function validateForm1() {
        const emailValid = emailRegex.test(emailInput.value);
        const passwordValid = passwordRegex.test(passwordInput.value);
        const phoneValid = phoneRegex.test(phoneInput.value);

        if (emailValid && passwordValid && phoneValid) {
            registerBtn.disabled = false;
            nextBtn.disabled = false;
            enableButtons();
        }
    }

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    phoneInput.addEventListener('input', validatePhone);

    validateForm1();
}



function regexCheck(email, password){
    const emailSuggestion = document.getElementById('email-suggestion');
    const passwordSuggestion = document.getElementById('password-suggestion');
    const emailRegex1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    validateEmail()
    validatePassword()
    function validateEmail() {

        if (!emailRegex1.test(email)) {
            emailSuggestion.textContent = 'Email should be valid (e.g. example@gmail.com)';
            alertCustom('Invalid email', 'Invalid email input')
            throw new error('invalid email')
        } else {
            emailSuggestion.textContent = ''; 
        }
    }

    function validatePassword() {
        if (!passwordRegex1.test(password)) {
            passwordSuggestion.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, and one special character.';
            alertCustom('Invalid Password', 'Invalid password input')
            throw new error('invalid password')
        } else {
            passwordSuggestion.textContent = ''; 
        }
    }
    
}

function enableButtons() {
    const nextBtn = document.getElementById('nextBtn');
    const registerBtn = document.getElementById('btn-register-1');
  
    nextBtn.removeAttribute('disabled');
    registerBtn.removeAttribute('disabled');
    registerBtn.removeAttribute('style');
    registerBtn.removeAttribute('style');
  }

window.addEventListener('load', onloadRegex);

document.getElementById('agree-btn').onclick = function(){
    console.log('keasnfwkef')
    document.getElementById('formCheck-1').checked = true;
}

document.getElementById('confirm-otp').addEventListener('click', OTPVerify);

document.getElementById('btn-register-1').addEventListener('click', OTPSend);