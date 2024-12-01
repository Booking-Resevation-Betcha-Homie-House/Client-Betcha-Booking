// copy paste sa lahat ng page (if wala pa)
function checkCustomer(CustomerRole){
    console.log('Checking Customer')
    if (CustomerRole === 'Customer'){
        console.log('Customer verified');
        return;
    }
    else if (CustomerRole === 'Admin'){
        console.log('This is for admin page');
        window.location.href = "../Admin/Dashboard.html";
    }
    else if (CustomerRole === 'SuperAdmin'){
        console.log('This is for Super Admin page');
        window.location.href = "../SAdmin/Dashboard.html";
    }
    else{
        console.log('no logged in user')
        // window.location.href = "../landing page"; lagyan kapag meron na
    }
}

function checkAdmin(AdminRole){
    console.log('Checking admin')
    if (AdminRole === "Admin"){
        console.log('Admin Confirmed');
        return;
    }
    else if (AdminRole === 'SuperAdmin'){
        console.log('This is for Super Admin page');
        window.location.href = "../SAdmin/Dashboard.html";
    }
    else if (AdminRole === 'Customer'){
        console.log('This page is for customers');
        // window.location.href = "../Customer/Dashboard"; lagyan kapag meron na
    }
    else{
        console.log('no logged in user')
        // window.location.href = "../landing page"; lagyan kapag meron na
    }
}

function checkSuperAdmin(SuperAdmin){
    console.log('Checking super admin')
    if (SuperAdmin === 'SuperAdmin'){
        console.log('SuperAdmin Confirmed');
        return;
    }
    else if (SuperAdmin === 'Admin'){
        console.log('This is for admin page');
        window.location.href = "../Admin/Dashboard.html";
    }
    else if (SuperAdmin === 'Customer'){
        console.log('This page is for customers');
        // window.location.href = "../Customer/Dashboard"; lagyan kapag meron na
    }
    else{
        console.log('no logged in user')
        // window.location.href = "../landing page"; lagyan kapag meron na
    }
}

function checkForAllUsers(role){
    if (role === 'SuperAdmin'){
        window.location.href = "../SAdmin/Dashboard.html";
    }
    else if (role === 'Admin'){
        console.log('This is for admin page');
        window.location.href = "../Admin/Dashboard.html";
    }
    else if (role === 'Customer'){
        console.log('This page is for customers');
        // window.location.href = "../Customer/Dashboard"; lagyan kapag meron na
    }
    else{
        console.log('no logged in user')
        window.location.href = "../LogIn.html";
    }
}