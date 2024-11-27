//unfinished

function SAdminProfile (){

    //ask knug anong api gagamitin dito
    fetch('https://betcha-booking-api-master.onrender.com/getAllSuperAdmin')
    .then(response => response.json())
    .then(data => {
        if (data && data.data) {
            const user = data.data; 
            document.getElementById('user-email').textContent = `Email: ${user.email}`; //palitan id

            document.getElementById('user-password').textContent = `Password: ${user.password}`; // palitan id

            document.getElementById('user-phone').textContent = `Phone Number: ${user.superAdminName}`; // palitan id
        } else {
            alert('Super Admin not found or missing data.');
        }
    })
    .catch(error => {
        console.error('Error during display:', error);
        alert('Failed to display Super Admin info: ' + error.message);
    });
}

//di pa na seset kung san button or html to
