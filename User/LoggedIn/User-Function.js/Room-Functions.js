async function loadRoomsData() { 
    console.log('function called!');
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP', 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const units = await response.json();
        const container = document.getElementById('display-container');

        container.innerHTML = '';

        units.forEach(unit => {

        const displayUnit = document.createElement('div');
        displayUnit.className = 'col';
        displayUnit.id = 'display-unit';

        const containerUnit = document.createElement('div');
        containerUnit.className = 'container-unit';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container image-container2';

        const image = document.createElement('img');
        image.className = 'unit-list-image';
        image.alt = 'Beautiful view of Santorini';

        console.log(unit.UnitImages[0].fileId);
        const imageUrl = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`; // img src
        image.src = imageUrl; 

        imageContainer.appendChild(image);

        const unitOverlay = document.createElement('div');
        unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';

        const innerContainer = document.createElement('div');
        innerContainer.className = 'm-3';

        const whitePillOverlay = document.createElement('div');
        whitePillOverlay.className = 'd-flex justify-content-center align-items-center align-content-center white-pill-overlay';

        const priceHeading = document.createElement('h5');
        priceHeading.id = 'unit-price-5';
        priceHeading.className = 'm-0 p-unit';
        const unitPriceF = formatter.format(unit.unitPrice);
        priceHeading.innerHTML = `<strong>${unitPriceF}</strong>`; 

        const priceSpan = document.createElement('span');
        priceSpan.className = 'text-gray-600';
        priceSpan.innerHTML = '&nbsp;/ day';

        whitePillOverlay.appendChild(priceHeading);
        whitePillOverlay.appendChild(priceSpan);

        innerContainer.appendChild(whitePillOverlay);

        unitOverlay.appendChild(innerContainer);

        imageContainer.appendChild(unitOverlay);

        containerUnit.appendChild(imageContainer);

        const textContainer = document.createElement('div');
        textContainer.className = 'p-0';

        const unitName = document.createElement('h4');
        unitName.id = 'unit-name'; 
        unitName.className = 'p-unit';
        unitName.innerHTML = `<strong>${unit.unitName}</strong>`;

        const unitLocation = document.createElement('p');
        unitLocation.id = 'unit-location';
        unitLocation.textContent = `${unit.location}`; 

        textContainer.appendChild(unitName);
        textContainer.appendChild(unitLocation);

        containerUnit.appendChild(textContainer);

        displayUnit.onclick = () => {
            window.location.href = `Room-View.html?id=${unit._id}`; 
        }
        displayUnit.style.cursor = 'pointer'; 
        displayUnit.appendChild(containerUnit);

        container.appendChild(displayUnit);

        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadPopularPicks() { 
    console.log('function called!');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/get/top');
        if (!response.ok) {
            throw new Error('Failed to fetch popular picks');
        }

        const units = await response.json();
        const container = document.getElementById('units-popular');

        container.innerHTML = ''; // Clear existing content

        units.data.forEach(unit => {
            const featuredUnit = document.createElement('div');
            
            featuredUnit.className = 'col p-3';
            featuredUnit.id = 'featured-units';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            const image = document.createElement('img');
            image.alt = 'Beautiful view of Santorini';
            image.className = 'featured-image';

            // Adjust the URL for the image based on the `fileId`
            const imageUrl = `https://drive.google.com/thumbnail?id=${unit.unitImages[0].fileId}&sz=w1920-h1080`;
            image.src = imageUrl;

            imageContainer.appendChild(image);

            const unitOverlay = document.createElement('div');
            unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';

            const unitNameContainer = document.createElement('div');
            unitNameContainer.className = 'm-3';

            const unitNameHeading = document.createElement('h5');
            unitNameHeading.id = 'unit-name-5';
            unitNameHeading.className = 'heading-unit';
            unitNameHeading.style.fontSize = '20px';
            unitNameHeading.textContent = unit.unitName;

            unitNameContainer.appendChild(unitNameHeading);
            unitOverlay.appendChild(unitNameContainer);

            imageContainer.appendChild(unitOverlay);

            featuredUnit.appendChild(imageContainer);

            featuredUnit.onclick = () => {
                window.location.href = `Room-View.html?id=${unit.unitId}`;
            };
            featuredUnit.style.cursor = 'pointer'; 

            container.appendChild(featuredUnit);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadMonthPicks() { 
    console.log('function called!');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/get/bottom');
        if (!response.ok) {
            throw new Error('Failed to fetch month picks');
        }

        const units = await response.json();
        const container = document.getElementById('units-featured');

        container.innerHTML = ''; // Clear existing content

        units.data.forEach(unit => {
            const featuredUnit = document.createElement('div');
            featuredUnit.className = 'col p-3';
            featuredUnit.id = 'featured-units';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            const image = document.createElement('img');
            image.alt = 'Beautiful view of Santorini';
            image.className = 'featured-image';

            // Adjust the URL for the image based on the `fileId`
            const imageUrl = `https://drive.google.com/thumbnail?id=${unit.unitImages[0].fileId}&sz=w1920-h1080`;
            image.src = imageUrl;

            imageContainer.appendChild(image);

            const unitOverlay = document.createElement('div');
            unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';

            const unitNameContainer = document.createElement('div');
            unitNameContainer.className = 'm-3';

            const unitNameHeading = document.createElement('h5');
            unitNameHeading.id = 'unit-name-5';
            unitNameHeading.className = 'heading-unit';
            unitNameHeading.textContent = unit.unitName;

            unitNameContainer.appendChild(unitNameHeading);
            unitOverlay.appendChild(unitNameContainer);

            imageContainer.appendChild(unitOverlay);

            featuredUnit.appendChild(imageContainer);

            featuredUnit.onclick = () => {
                window.location.href = `Room-View.html?id=${unit.unitId}`;
            };
            featuredUnit.style.cursor = 'pointer'; 
            container.appendChild(featuredUnit);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    logoutbtn();
}

function updateTop() {
    fetch('https://betcha-booking-api-master.onrender.com/updateTopUnits')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Or response.text() depending on the response type
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
