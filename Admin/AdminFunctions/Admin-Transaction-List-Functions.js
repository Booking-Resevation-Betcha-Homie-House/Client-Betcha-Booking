// Finished function with 3 seconds automatic reload
async function loadTransactionData() {
    try {
        // Fetch completed transactions data
        const response = await fetch('https://betcha-booking-api-master.onrender.com/getCompleted');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const admins = await response.json();
        const tbodycompleted = document.getElementById('table-body-completed');
        tbodycompleted.innerHTML = ''; // Clear existing data

        console.log(admins);

        if (admins.length === 0) {
            tbodycompleted.innerHTML = '<tr><td colspan="4" class="no-data">No admin data available</td></tr>';
            return;
        }

        admins.bookings.forEach(admin => {
            const row = document.createElement('tr');

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = admin.Reference;
            referenceNumberCell.style.textAlign = 'center';
            row.appendChild(referenceNumberCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.UserId.firstName + ' ' + admin.UserId.lastName;
            nameCell.style.textAlign = 'center';
            row.appendChild(nameCell);

            const unitNameCell = document.createElement('td');
            unitNameCell.textContent = admin.UnitId.unitName;
            unitNameCell.style.textAlign = 'center';
            row.appendChild(unitNameCell);

            const dateCell = document.createElement('td');
            const formatdate = admin.Date;
            const editeddate = formatdate.split('T')[0];
            dateCell.textContent = editeddate;
            dateCell.style.textAlign = 'center';
            row.appendChild(dateCell);

            const paymentModeCell = document.createElement('td');
            const paymentMethod = admin.PaymentId && admin.PaymentId.Mop ? admin.PaymentId.Mop : 'N/A';
            paymentModeCell.textContent = paymentMethod;
            paymentModeCell.style.textAlign = 'center';
            row.appendChild(paymentModeCell);

            const totalAmountCell = document.createElement('td');
            totalAmountCell.textContent = admin.Total;
            totalAmountCell.style.textAlign = 'right';
            row.appendChild(totalAmountCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = admin.Status;
            statusCell.style.textAlign = 'center';
            row.appendChild(statusCell);

            const actionCell = document.createElement('td');
            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.textContent = 'View Details';
            viewDetailsButton.classList.add('btn', 'btn-secondary');
            viewDetailsButton.onclick = () => {
                console.log(admin.Reference);
                window.location.href = `Transactions-View.html?id=${admin.Reference}`;
            };
            actionCell.appendChild(viewDetailsButton);
            row.appendChild(actionCell);

            tbodycompleted.appendChild(row);
        });

        // Fetch pending transactions data
        const responses = await fetch('https://betcha-booking-api-master.onrender.com/bookings/pending');
        if (!responses.ok) {
            throw new Error('Failed to fetch pending data');
        }

        const pending = await responses.json();
        const tbodypending = document.getElementById('table-body-pending');
        tbodypending.innerHTML = ''; // Clear existing data
        console.log(pending);

        if (pending.length === 0) {
            tbodypending.innerHTML = '<tr><td colspan="4" class="no-data">No pending data available</td></tr>';
            return;
        }

        pending.bookings.forEach(pendingItem => {
            const row = document.createElement('tr');

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = pendingItem.Reference;
            referenceNumberCell.style.textAlign = 'center';
            row.appendChild(referenceNumberCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = pendingItem.UserId.firstName + ' ' + pendingItem.UserId.lastName;
            nameCell.style.textAlign = 'center';
            row.appendChild(nameCell);

            const unitNameCell = document.createElement('td');
            unitNameCell.textContent = pendingItem.UnitId.unitName;
            unitNameCell.style.textAlign = 'center';
            row.appendChild(unitNameCell);

            const dateCell = document.createElement('td');
            const formatdate = pendingItem.Date;
            const editeddate = formatdate.split('T')[0];
            dateCell.textContent = editeddate;
            dateCell.style.textAlign = 'center';
            row.appendChild(dateCell);

            const paymentModeCell = document.createElement('td');
            const paymentMethod = pendingItem.PaymentId && pendingItem.PaymentId.Mop ? pendingItem.PaymentId.Mop : 'N/A';
            paymentModeCell.textContent = paymentMethod;
            paymentModeCell.style.textAlign = 'center';
            row.appendChild(paymentModeCell);

            const totalAmountCell = document.createElement('td');
            totalAmountCell.textContent = pendingItem.Total;
            totalAmountCell.style.textAlign = 'right';
            row.appendChild(totalAmountCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = pendingItem.Status;
            statusCell.style.textAlign = 'center';
            row.appendChild(statusCell);

            const actionCell = document.createElement('td');
            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.textContent = 'View Details';
            viewDetailsButton.classList.add('btn', 'btn-secondary');
            viewDetailsButton.onclick = () => {
                console.log(pendingItem.Reference);
                window.location.href = `Transactions-View.html?id=${pendingItem.Reference}`;
            };
            actionCell.appendChild(viewDetailsButton);
            row.appendChild(actionCell);

            tbodypending.appendChild(row);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Set interval to refresh data every 3 seconds (3000 milliseconds)
setInterval(loadTransactionData, 3000);

// Load transaction data initially when the page loads
loadTransactionData();

// Logout functionality
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href = '../LogIn.html';
};
