const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);


//di pa tapos yung image
//unfinished 
// mag lagay ng delete function 
//ayusin yung mga id ng items may mga tinaggal pala na items

async function loadUnitData() {
    
    try {
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getUnitById/${refID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch unit data');
        }
        console.log('Unit ID from URL: ', refID);
        const unit = await response.json();

        document.getElementById('view-unit-name').innerHTML = unit.unitName;
        document.getElementById('view-unit-loc').innerHTML = unit.location;
        document.getElementById('view-unit-num-pax').innerHTML = unit.packageCapacity;
        document.getElementById('view-unit-max-pax').innerHTML = unit.maxPax;
        document.getElementById('view-unit-price').innerHTML = unit.unitName;
        document.getElementById('view-unit-reservation').innerHTML = unit.unitName;
        document.getElementById('view-unit-price-per-pax').innerHTML = unit.unitName;

        const statuscell = document.getElementById('unit-status');
        statuscell.innerHTML = '';
        if (unit.isAvailable === true) {
            const badge = document.createElement('span');
            badge.textContent = 'Available';
            badge.classList.add('badge', 'bg-primary');
            statuscell.appendChild(badge);
        } else {
            const badge = document.createElement('span');
            badge.textContent = 'Unavailable';
            badge.classList.add('badge', 'bg-dark');
            statuscell.appendChild(badge);
        }

        document.getElementById('view-unit-category').innerHTML = unit.category;

        let itemnumber = 1;
        Object.entries(unit.amenities).forEach(([amenity, isAvailable]) => {
            const itemElement = document.getElementById(`item${itemnumber}`);
            console.log(itemElement);
            if (itemElement) {
                itemElement.style.textDecoration = isAvailable ? 'none' : 'line-through';
            }
            itemnumber++
        });

        document.getElementById('view-unit-other').innerHTML = unit.otherAmenities;
        document.getElementById('view-unit-desc').innerHTML = unit.description;

        const carouselInner = document.querySelector('#carousel-1 .carousel-inner');
        carouselInner.innerHTML = '';

        unit.UnitImages.forEach((image, index) => {
            const imageUrl = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = image.filename;
            imgElement.classList.add('d-block', 'w-100'); 

            carouselItem.appendChild(imgElement);

            carouselInner.appendChild(carouselItem);

            const carouselIndicator = document.createElement('button');
            carouselIndicator.setAttribute('type', 'button');
            carouselIndicator.setAttribute('data-bs-target', '#carousel-1');
            carouselIndicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) {
                carouselIndicator.classList.add('active');
            }

           
            const carouselIndicators = document.querySelector('#carousel-1 .carousel-indicators');
            carouselIndicators.appendChild(carouselIndicator);
        });

        const style = document.createElement('style');
        style.innerHTML = `
            #carousel-1 .carousel-item img {
                object-fit: cover;
                height: 400px; /* Adjust height as needed */
            }
        `;
        document.head.appendChild(style);

    } catch (error) {
        console.error('Error:', error);
    }
}



function DelUnit() {
    
    openLoading();
    fetch(`https://betcha-booking-api-master.onrender.com/deleteUnit/${refID}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        closeLoading();
        console.log('Unit deleted successfully', response);
        deleteUnitAuditTrail(localStorage.getItem('id'),localStorage.getItem('role'));
        setTimeout(() => {
            window.location.href = `Units-List.html`;
        }, 2000);
    })
    .catch(error => {
        console.error('Error during delete:', error);
        console.log('Failed to delete unit: ', error.message);
        closeLoading();
    })
}

document.getElementById('delete-btn').addEventListener('click',DelUnit);

document.getElementById('edit-btn').addEventListener('click', () => {
    window.location.href = `Unit-Edit.html?id=${refID}`;
});
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}
