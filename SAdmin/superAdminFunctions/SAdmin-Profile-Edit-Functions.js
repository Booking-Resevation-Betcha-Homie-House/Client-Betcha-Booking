//unfinshed

localStorage.setItem();

function editSAdmin(){


    const sadminUsername = document.getElementById('input-profile-username');
    const sadminEmail = document.getElementById('input-profile-email');
    const sadminpass = document.getElementById('input-profile-password');// wala pa tong textbox need pa iedit
    

    const SadminData = {
        email : adminEmail,
        password : adminPassword,
        adminName : adminUsername
    }
    fetch('https://betcha-booking-api-master.onrender.com/getAllSuperAdmin',{
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