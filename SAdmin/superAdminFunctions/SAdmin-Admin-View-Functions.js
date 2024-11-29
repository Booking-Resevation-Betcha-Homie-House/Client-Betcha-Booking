const urlParams = new URLSearchParams(window.location.search);
const adminID = urlParams.get('id');
console.log('Unit ID from URL: ', adminID);

async function adminViewLoadData(){

   const response = await fetch(`https://betcha-booking-api-master.onrender.com/getAdminInfo/${adminID}`);

    const admin = await response.json();
    
    console.log(admin);
    console.log(admin.data.adminName);
    console.log(admin.data.email);
    console.log(admin.data.password);
    console.log(admin.data.role);

    document.getElementById('view-admin-name').innerHTML=admin.data.adminName;
    document.getElementById('view-admin-email').innerHTML=admin.data.email;
    document.getElementById('view-admin-role').innerHTML=admin.data.role;

   // const button  = document.getElementById('btn-admin-edit');

    document.getElementById('btn-admin-edit').onclick = () => {
        console.log(admin._id);
        window.location.href = `Admin-Edit.html?id=${adminID}`;
    };

}

function DelAdmin() {
    fetch(`https://betcha-booking-api-master.onrender.com/deleteAdmin/${adminID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || 'Failed to delete admin');
                
            });
        }
        closeLoading();
        return response.json();
    })
    .then(data => {
        alert(data.message || 'Admin deleted successfully');
        window.location.href="../SAdmin/Admin-List.html"
        closeLoading();
    })
    .catch(error => {
        console.error('Error during delete:', error);
        alert('Failed to delete admin: ' + error.message);
        closeLoading();
    })
}


document.getElementById('btn-remove').addEventListener('click',DelAdmin);
//document.getElementById('modal-unit-add').addEventListener();