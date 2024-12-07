function checkVerified(){
    let storedIsVerified = localStorage.getItem('isVerified') === 'true';
    console.log(storedIsVerified);

    if(storedIsVerified){
        console.log('verified user')
        return;
    }
    else{
        openLoading();
        alertCustom('Verifying Your Account', 'Your account is still being reviewed by our personnel. Redirecting you in homepage...');
        closeLoading5()
        setTimeout(()=>{
            window.location.href="/User/LoggedIn/Rooms.html";
        }, 3000)

    }
}