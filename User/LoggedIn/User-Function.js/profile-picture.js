function getPfp() {
    const userId = localStorage.getItem('id');
    const url = `https://betcha-booking-api-master.onrender.com/profile-image/${userId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const fileId = data.fileId;
            if (fileId) {

                const imageLink = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920-h1080`;
                const email = data.email;
                localStorage.setItem('email', email);
                console.log(localStorage.getItem('email'));
                document.getElementById('profile-picture').src = imageLink;
            } else {
                console.error('No fileId received for the profile picture.');
            }
        })
        .catch(error => {
            console.error('Error fetching profile image fileId:', error);
        });
}
