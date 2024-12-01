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
            tbodycompleted.innerHTML = '<tr><td colspan="4" class="no-data">No admin data available</td></tr>';
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
            paymentModeCell.textContent = admin.PaymentId.Mop;  
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
            tbodypending.innerHTML = '<tr><td colspan="4" class="no-data">No pending data available</td></tr>';
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

    try{
        const response = await fetch('https://betcha-booking-api-master.onrender.com/earnings/thisMonth');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
        const price = await response.json()
        console.log(response.earnings)
        document.getElementById('total-earnings-monthly').innerHTML = '<strong>₱' +  price.earnings + '</strong>';

    }
    catch (error) {
        console.error('Error:', error);
    }

    try{
        const response = await fetch('https://betcha-booking-api-master.onrender.com/earnings/thisYear');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
        const price = await response.json()
        console.log(response)
        document.getElementById('total-earnings-yearly').innerHTML = '<strong>₱' + price.earnings + '</strong>';


    }
    catch (error) {
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

async function loadMonthlyTopUnits(){
    console.log('called monthy')
   
    const month = document.getElementById('select-month').value;
    const year = document.getElementById('select-year').value
    const response = await fetch(`https://betcha-booking-api-master.onrender.com/getMonth/${month}/${year}`);
        if (!response.ok) {
           
            throw new Error('Failed to fetch top units data');
        }
       
        const units = await response.json();
        const tablemonth = document.getElementById('table-monthly');
   
        tablemonth.innerHTML = '';
        
        if (units.length === 0) {
            tablemonth.innerHTML = '<tr><td colspan="4" class="no-data">No data available</td></tr>';
           
            return;
        }
        
        units.forEach(unit => {
            const row = document.createElement('tr');

            const rankCell = document.createElement('td');
            rankCell.textContent = unit.top;  
            rankCell.style.textAlign = 'center';
            row.appendChild(rankCell);

            const unitNameCell = document.createElement('td');
            unitNameCell.textContent = unit.unitName;  
            unitNameCell.style.textAlign = 'center';
            row.appendChild(unitNameCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = unit.location;  
            locationCell.style.textAlign = 'center';
            row.appendChild(locationCell);

            const totalEarningsCell = document.createElement('td');
            totalEarningsCell.textContent = unit.totalEarnings;  
            totalEarningsCell.style.textAlign = 'center';
            row.appendChild(totalEarningsCell);

            tablemonth.appendChild(row);
        
        });
  
}

async function loadYearlyTopUnits(){
    console.log('called yearly')
  
    const year = document.getElementById('select-year1').value
    
    const response = await fetch(`https://betcha-booking-api-master.onrender.com/getAnnual/${year}`);
    if (!response.ok) {
       
        throw new Error('Failed to data');
    }
   
    const units = await response.json();
    const tableyear = document.getElementById('table-yearly');

    tableyear.innerHTML = '';

    
    if (units.length === 0) {
        tableyear.innerHTML = '<tr><td colspan="4" class="no-data">No admin data available</td></tr>';
     
        return;
    }
    
    units.forEach(unit => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = unit.top;  
        rankCell.style.textAlign = 'center';
        row.appendChild(rankCell);

        const unitNameCell = document.createElement('td');
        unitNameCell.textContent = unit.unitName;  
        unitNameCell.style.textAlign = 'center';
        row.appendChild(unitNameCell);

        const locationCell = document.createElement('td');
        locationCell.textContent = unit.location;  
        locationCell.style.textAlign = 'center';
        row.appendChild(locationCell);

        const totalEarningsCell = document.createElement('td');
        totalEarningsCell.textContent = unit.totalEarnings;  
        totalEarningsCell.style.textAlign = 'center';
        row.appendChild(totalEarningsCell);

        tableyear.appendChild(row);
    });
   
}

document.getElementById('select-month').addEventListener('change', (event) =>{
    openLoading();
    loadMonthlyTopUnits();
    closeLoading(); 
})

document.getElementById('select-year').addEventListener('change', (event) =>{

    openLoading();
    loadMonthlyTopUnits();
    closeLoading(); 
})

document.getElementById('select-year1').addEventListener('change', (event) =>{
    openLoading();
    loadYearlyTopUnits();
    closeLoading();
})
//
document.getElementById('pending-v').onclick=function(){
    window.location.href = '../Admin/User-Verify.html'
}; 

document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}