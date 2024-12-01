//unfinshed
// di sure kung anong gagamitin
const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function loadDateEdit(){
   const response = fetch(`https://betcha-booking-api-master.onrender.com/getAdminInfo/${refID}`)
   
}


function editadmin(){

    const role = localStorage.getItem('role')
    console.log(role);
    checkAdmin(role);
    
    const adminUsername = document.getElementById('input-profile-username').value;
    const adminEmail = document.getElementById('input-profile-email').value;
    const adminpass = document.getElementById('input-profile-password').value;// wala pa tong textbox need pa iedit
    const adminconfirm = document.getElementById('input-profile-confirmpw').value;
    
    const adminData = {};

    if (adminUsername){
        adminData.adminName = adminUsername;
        console.log(adminEmail);
    }

    if(!adminEmail){
        
        adminData.email = adminEmail;
        console.log(adminUsername);
    }

    if(adminpass === adminconfirm){
    if(!adminpass){
        adminData.password = adminpass
        console.log(adminpass);
    }
    }
    
    fetch(`https://betcha-booking-api-master.onrender.com/updateAdmin/${refID}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
    })
    .then (respone => respone.json())
    .then(data =>{
        console.log(data);
        alert('Info Updated!' + data.message);
    })
    .catch(error => {
        console.log(error)
        alert('Failed to Update the info' + error.message)
    });
}

document.getElementById('edit-btn').onclick = () =>{
    console.log
    editadmin();
};
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}
