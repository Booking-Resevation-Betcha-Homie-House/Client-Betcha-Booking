//unfinshed
// di sure kung anong gagamitin
const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function editSAdmin(){

    const role = localStorage.getItem('role')
    console.log(role);
    checkSuperAdmin(role);
    
    const sadminUsername = document.getElementById('input-profile-username');
    const sadminEmail = document.getElementById('input-profile-email');
    const sadminpass = document.getElementById('input-profile-password');// wala pa tong textbox need pa iedit
    

    const SadminData = {
        email : adminEmail,
        password : adminPassword,
    }
    fetch(`https://betcha-booking-api-master.onrender.com/superAdminEdit/${refID}`,{
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SadminData)
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

document.getElementsByClassName('btn btn-primary').addEventListener('click',editSAdmin());
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}
