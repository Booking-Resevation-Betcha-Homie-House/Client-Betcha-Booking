//Unfisnished
async function loadUnitData() {
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units');
        if (!response.ok) {
            throw new Error('Failed to fetch unit data');
        }

        const units = await response.json();
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        if (admins.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-data">No unit data available</td></tr>';
            return;
        }

        units.forEach(unit => {
            const row = document.createElement('tr');

            const unitNameCell = document.createElement('td');
            unitNameCell.textContent = unit.unitName;
            row.appendChild(unitNameCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = unit.location;
            row.appendChild(locationCell);

            const mapCell = document.createElement('td');
            mapCell.textContent = unit.maplink;
            row.appendChild(mapCell);

            const maxPaxCell = document.createElement('td');
            maxPaxCell.textContent = unit.maxPax;
            row.appendChild(maxPaxCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = unit.unitPrice;
            row.appendChild(priceCell);

            const pricePerPaxCell = document.createElement('td');
            pricePerPaxCell.textContent = unit.pricePerPax;
            row.appendChild(pricePerPaxCell);
           
            
            const statusCell = document.createElement('td');
            if (unit.isAvailable === 'true') {
 
            const originalBadge = document.getElementById('badge-occupied');
            const clonedBadge = originalBadge.cloneNode(true);
    

            clonedBadge.textContent = 'Available'; 
            clonedBadge.className = 'badge bg-primary'; 

            statusCell.appendChild(clonedBadge);
            } else {
   
            const originalBadge = document.getElementById('badge-occupied');
            const clonedBadge = originalBadge.cloneNode(true);

            clonedBadge.textContent = 'Occupied'; 
            clonedBadge.className = 'badge bg-danger'; 
            }
            statusCell.appendChild(clonedBadge);

            const actionCell = document.createElement('td');
            const actionBtn = document.createElement('button');
            actionBtn.textContent = 'View Details';
            actionBtn.classList.add('action-btn');
            //actionBtn.onclick = () => retrieveAdminId(admin._id); iba gagawin ng button
            actionCell.appendChild(actionBtn);
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
// Di pa naseset kung saan html or button to