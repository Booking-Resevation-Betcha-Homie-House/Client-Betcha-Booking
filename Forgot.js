const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

const errorMessage = document.getElementById('error-message');
errorMessage.style.display = 'none'; 

function changePass() {
    openLoading();
    const password = document.getElementById('fp-new-password').value;
    const Cpassword = document.getElementById('fp-confirm-password').value;

    if (password !== Cpassword) {
        closeLoading();
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed: Password does not match!';
        return;
    }

    const updatedData = {
        email: email,            
        password: password,      
    };

    fetch('https://betcha-booking-api-master.onrender.com/user/updateEmail', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify(updatedData), 
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            closeLoading();
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Failed: ' + data.error;
        } else {
            closeLoading();
            window.location.href="Login.html";
        }
    })
    .catch(error => {
        closeLoading();
        alertCustom('Request Failed', 'There was an error while updating the data.');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed: There was an error while updating the data.';
        console.error('Error:', error);
    });
}
document.getElementById('save-btn').addEventListener('click', changePass);