async function loadTransactionData() {
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/getCompleted');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const admins = await response.json();
        const tbodycompleted = document.getElementById('table-completed');
   
        tbodycompleted.innerHTML = '';

        console.log(admins);
        
        if (admins.length === 0) {
            tbodycompleted.innerHTML = `
                <tr>
                    <td style="text-align: center;">-</td>
                    <td style="text-align: center;" colspan="7">No data</td>
                </tr>`;
            return;
        }
        
        const limit = 5;
        let count = 0;
        admins.bookings.forEach(admin => {
            if(count>=limit) return;
            const row = document.createElement('tr');

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = admin.Reference;  
            referenceNumberCell.style.textAlign = 'center';
            row.appendChild(referenceNumberCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.UserId.firstName + ' ' + admin.UserId.middleInitial + ' ' + admin.UserId.lastName;  
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
            paymentModeCell.textContent = admin.PaymentId.Mop 
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

            tbodycompleted.appendChild(row);
            count++
        });

        const responses = await fetch('https://betcha-booking-api-master.onrender.com/bookings/pending');
        if (!responses.ok) {
            throw new Error('Failed to fetch pending data');
        }
       
        const pending = await responses.json();
        const tbodypending = document.getElementById('table-pending');
        
        tbodypending.innerHTML = '';
        console.log(pending);  

        if (pending.length === 0) {
            tbodypending.innerHTML = `
                <tr>
                    <td style="text-align: center;">-</td>
                    <td style="text-align: center;" colspan="7">No data</td>
                </tr>`;
            return;
        }
            var num = 0
        pending.bookings.forEach(pendingItem => {
            
            if(num>=5) return;
            const row = document.createElement('tr');

            const referenceNumberCell = document.createElement('td');
            referenceNumberCell.textContent = pendingItem.Reference;  
            referenceNumberCell.style.textAlign = 'center';
            row.appendChild(referenceNumberCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = pendingItem.UserId.firstName + ' ' + pendingItem.UserId.middleInitial + ' ' + pendingItem.UserId.lastName; 
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
            paymentModeCell.textContent = pendingItem.PaymentId.Mop;
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

            tbodypending.appendChild(row);
            num++  
          
        });
    } catch (error) {
        console.error('Error:', error);
    }
    try {
        const responseMonth = await fetch('https://betcha-booking-api-master.onrender.com/earnings/thisMonth');
        if (!responseMonth.ok) {
            throw new Error('Failed to fetch monthly earnings');
        }
        const priceMonth = await responseMonth.json();
        console.log('fewjknfwj', priceMonth);
        document.getElementById('total-earnings-monthly').innerHTML = '<strong>₱' + priceMonth.earnings + '</strong>';
    } catch (error) {
        console.error('Error:', error);
    }
    
    try {
        const responseYear = await fetch('https://betcha-booking-api-master.onrender.com/earnings/thisYear');
        if (!responseYear.ok) {
            throw new Error('Failed to fetch yearly earnings');
        }
        const priceYear = await responseYear.json();
        console.log('faekjfksfja', priceYear);
        document.getElementById('total-earnings-yearly').innerHTML = '<strong>₱' + priceYear.earnings + '</strong>';
    } catch (error) {
        console.error('Error:', error);
    }
      


    try{
        const response = await fetch('https://betcha-booking-api-master.onrender.com/users/unverified');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
        const count = await response.json()
        console.log(response)
        document.getElementById('total-pending-verifications').innerHTML = '<strong>' +count.count+ '</strong>';

    }
    catch (error) {
        console.error('Error:', error);
    } 

}   
document.getElementById('pending-v').onclick=function(){
    window.location.href = '../Admin/User-Verify.html'
}; 
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}