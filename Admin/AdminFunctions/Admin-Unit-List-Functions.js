async function loadUnits() {
    console.log('loading Data');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units');
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        
        }

        const listUnit = await response.json();
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        const tdElements = document.querySelectorAll('td');

        if (listUnit.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-data">No admin data available</td></tr>';
            return;
        }

        listUnit.forEach(listunits => {
            const row = document.createElement('tr');

            const unitNameCell = document.createElement('td');
            unitNameCell.textContent = listunits.unitName;
            row.appendChild(unitNameCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = listunits.location;
            row.appendChild(locationCell);

            const maxPaxCell = document.createElement('td');
            maxPaxCell.textContent = listunits.maxPax;
            maxPaxCell.style.textAlign = 'center';
            row.appendChild(maxPaxCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = listunits.unitPrice;
            priceCell.style.textAlign = 'right';
            row.appendChild(priceCell);
            
            
            const pricePerPaxCell = document.createElement('td');
            pricePerPaxCell.textContent = listunits.pricePerPax;
            pricePerPaxCell.style.textAlign = 'right';
            row.appendChild(pricePerPaxCell);

            if(listunits.isAvailable === true) {

                const statusCell = document.createElement('td');
                const badge = document.createElement('span');
                badge.textContent = 'Available';
                badge.classList.add('badge','bg-primary');
                statusCell.appendChild(badge);
                row.appendChild(statusCell);
            }
            else {
                const statusCell = document.createElement('td');
                const badge = document.createElement('span');
                badge.textContent = 'Unavailable';
                badge.classList.add('badge','bg-dark');
                statusCell.appendChild(badge)
                row.appendChild(statusCell);
            }

            const viewDetailsActionCell = document.createElement('td');
            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.textContent = 'View Details';
            viewDetailsButton.classList.add('btn','btn-secondary');
            viewDetailsButton.onclick = () => {
                console.log(listunits._id);
                window.location.href = `Unit-View.html?id=${listunits._id}`;
            };
            viewDetailsActionCell.appendChild(viewDetailsButton);
            row.appendChild(viewDetailsActionCell);
        //    editBtn = () => retrieveAdminId(admin._id);

            tbody.appendChild(row);

            const tdElements = document.querySelectorAll('td');

            tdElements.forEach(td => {
            const maxLength = 20; 
            if (td.innerText.length > maxLength) {
            td.innerText = td.innerText.slice(0, maxLength) + "...";
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}