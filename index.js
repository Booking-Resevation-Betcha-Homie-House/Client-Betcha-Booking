function onloadFunction(){
    const role = localStorage.getItem('role');
    console.log(role);
    setTimeout(() => {
        checkForAllUsers(role);
    }, 3000);
}