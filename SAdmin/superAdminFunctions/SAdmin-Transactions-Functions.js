function loadTransactionData() {
    const role = localStorage.getItem('role');
    console.log(role);
    checkSuperAdmin(role);

    $.ajax({
        url: 'https://betcha-booking-api-master.onrender.com/getCompleted',
        method: 'GET',
        success: function(admins) {
            const tbodycompleted = document.getElementById('table-body-completed');
            tbodycompleted.innerHTML = '';
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
                let Dates = admin.Date;
                let DateBook = new Date(Dates);

                const formatdate = DateBook instanceof Date && !isNaN(DateBook) ? DateBook.toISOString().split('T')[0] : 'Invalid Date';
                dateCell.textContent = formatdate;
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
        },
        error: function(error) {
            console.error('Failed to fetch completed data', error);
        }
    });

    $.ajax({
        url: 'https://betcha-booking-api-master.onrender.com/bookings/pending',
        method: 'GET',
        success: function(pending) {
            const tbodypending = document.getElementById('table-body-pending');
            tbodypending.innerHTML = '';
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
        },
        error: function(error) {
            console.error('Failed to fetch pending data', error);
        }
    });
}

setInterval(loadTransactionData, 3000);
