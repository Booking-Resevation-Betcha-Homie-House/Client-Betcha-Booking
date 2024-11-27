// cancel button pabalik yung kulang
const urlParams = new URLSearchParams(window.location.search);
const adminID = urlParams.get('id');
console.log('Unit ID from URL: ', adminID);



async function adminFill(){

    console.log('func called');

    const response = await fetch(`https://betcha-booking-api-master.onrender.com/getAdminInfo/${adminID}`);

    const admin = await response.json()
    
    console.log(admin.data.adminName);
    document.getElementById('input-admin-name').value =admin.data.adminName;
    document.getElementById('input-admin-email').value =admin.data.email;   

  
}


function dropdownFunc() {
    var selectedItem;

    document.addEventListener('DOMContentLoaded', function () {
    
        const dropdownItems = document.querySelectorAll('.dropdown-item');
    
        dropdownItems.forEach(item => {
            item.addEventListener('click', function (event) {
                // Store the selected item's text content
                selectedItem = event.target.textContent;

                // Set the value of the button to the selected item
                document.getElementById('drop-item').textContent = selectedItem;

                // Log the selected value for debugging
                console.log('Selected Value:', selectedItem);
            });
        });
    });
}



function adminEdit(event) {

    event.preventDefault(); 
    event.stopPropagation(); 

    console.log('function called');
    const email = document.getElementById('input-admin-email').value;
    const password = document.getElementById('input-unit-num-pax').value;
    const adminName = document.getElementById('input-admin-name').value;

    // Create an object to store the data
    const updateData = {};

    if (email) {
        updateData.email = email;
    }
    if (password) {
        updateData.password = password;
    }
    if (adminName) {
        updateData.adminName = adminName;
    }

    console.log(updateData);

    fetch(`https://betcha-booking-api-master.onrender.com/updateAdmin/${adminID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updateData) 
})
    .then(response => response.json())
    .then(data => {
        alert('Admin updated successfully');
        location.reload();
    })
    .catch(error => {
        console.error('Error during update:', error);
        alert('Failed to update Admin: ' + error.message);
    }); 
}

function previouspage(){
     window.location.href = `Admin-View.html?id=${adminID}`
    //window.history.back() // pwede palitan ng  window.location.href = `Admin-List.html`; palitan lang ng html kung saan mapupunta
}
document.getElementById('cancel-button').addEventListener('click', previouspage);
document.getElementById('save-button').addEventListener('click', adminEdit);




