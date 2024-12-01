async function loadAdminData() { 
    console.log('function called!');
    try {
        const role = localStorage.getItem('role')
        console.log(role);
        checkSuperAdmin(role);
        const response = await fetch('https://betcha-booking-api-master.onrender.com/getAllAdmins');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const admins = await response.json();
        const tbody = document.getElementById('table-body');

        tbody.innerHTML = '';

        admins.forEach(admin => {
            const row = document.createElement('tr');

            const adminNameCell = document.createElement('td');
            adminNameCell.textContent = admin.adminName;
            row.appendChild(adminNameCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.email;
            row.appendChild(nameCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = admin.role;
            row.appendChild(roleCell);

            const actionCell = document.createElement('td');
            const actionBtn = document.createElement('a'); 
            actionBtn.textContent = 'View Details';
            actionBtn.classList.add('btn', 'btn-secondary');
            actionBtn.onclick = () => {
                console.log(admin._id);
                window.location.href = `Admin-View.html?id=${admin._id}`;
            };

            actionCell.appendChild(actionBtn);
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}

