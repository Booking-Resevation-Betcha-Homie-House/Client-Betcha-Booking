//finished 
async function loadRoomsData() { 
    console.log('function called!');
    try {
       /* const role = localStorage.getItem('role')
        console.log(role);
        checkSuperAdmin(role);*/
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const units = await response.json();
        const container = document.getElementById('display-container'); // lagay ng id ng container

        container.innerHTML = '';

        units.forEach(unit => {
          // Create main container div
        const displayUnit = document.createElement('div');
        displayUnit.className = 'col';
        displayUnit.id = 'display-unit';

        // Create the container-unit div
        const containerUnit = document.createElement('div');
        containerUnit.className = 'container-unit';

        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container image-container2';

        // Create image element
        const image = document.createElement('img');
        image.className = 'unit-list-image';
        image.alt = 'Beautiful view of Santorini';

        console.log(unit.UnitImages[0].fileId);
        const imageUrl = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`; // img src
        image.src = imageUrl; // img 

        // Append image to image container
        imageContainer.appendChild(image);

        // Create unit-overlay div
        const unitOverlay = document.createElement('div');
        unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';

        // Create the inner container div
        const innerContainer = document.createElement('div');
        innerContainer.className = 'm-3';

        // Create white-pill-overlay div
        const whitePillOverlay = document.createElement('div');
        whitePillOverlay.className = 'd-flex justify-content-center align-items-center align-content-center white-pill-overlay';

        // Create price heading
        const priceHeading = document.createElement('h5');
        priceHeading.id = 'unit-price-5';
        priceHeading.className = 'm-0 p-unit';
        priceHeading.innerHTML = `<strong>₱ ${unit.unitPrice}</strong>`; // price

        // Create price span
        const priceSpan = document.createElement('span');
        priceSpan.className = 'text-gray-600';
        priceSpan.innerHTML = '&nbsp;/ day';

        // Append price elements to white-pill-overlay
        whitePillOverlay.appendChild(priceHeading);
        whitePillOverlay.appendChild(priceSpan);

        // Append white-pill-overlay to inner container
        innerContainer.appendChild(whitePillOverlay);

        // Append inner container to unit-overlay
        unitOverlay.appendChild(innerContainer);

        // Append unit-overlay to image container
        imageContainer.appendChild(unitOverlay);

        // Append image container to container-unit
        containerUnit.appendChild(imageContainer);

        // Create text container div
        const textContainer = document.createElement('div');
        textContainer.className = 'p-0';

        // Create unit name heading
        const unitName = document.createElement('h4');
        unitName.id = 'unit-name'; 
        unitName.className = 'p-unit';
        unitName.innerHTML = `<strong>${unit.unitName}</strong>`; // unit name

        // Create unit location paragraph
        const unitLocation = document.createElement('p');
        unitLocation.id = 'unit-location';
        unitLocation.textContent = `${unit.location}`; // location 

        // Append unit name and location to text container
        textContainer.appendChild(unitName);
        textContainer.appendChild(unitLocation);

        // Append text container to container-unit
        containerUnit.appendChild(textContainer);

        displayUnit.onclick = () => {
            window.location.href = `Room-View.html?id=${unit._id}`; // lagay href with id 
        }
        displayUnit.appendChild(containerUnit);
        

        // Append displayUnit to the body or any specific container
        container.appendChild(displayUnit);

        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadMonthPicks() { 
    console.log('function called!');
    try {
       /* const role = localStorage.getItem('role')
        console.log(role);
        checkSuperAdmin(role);*/
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units/bottom');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const units = await response.json();
        const container = document.getElementById('units-featured'); // lagay ng id ng container

        container.innerHTML = '';

        units.data.forEach(unit => {
          // Create main container div
       // Create the main container div
        const featuredUnit = document.createElement('div');
        featuredUnit.className = 'col p-3';
        featuredUnit.id = 'featured-units';

        // Create the image container div
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        // Create the image element
        const image = document.createElement('img');
        image.alt = 'Beautiful view of Santorini';
        image.className = 'featured-image';

        const imageUrl = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`;
        image.src = imageUrl;

        // Append the image to the image container
        imageContainer.appendChild(image);

        // Create the overlay div
        const unitOverlay = document.createElement('div');
        unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';

        // Create the left container div for the unit name
        const unitNameContainer = document.createElement('div');
        unitNameContainer.className = 'm-3';

        // Create the heading for the unit name
        const unitNameHeading = document.createElement('h5');
        unitNameHeading.id = 'unit-name-5';
        unitNameHeading.className = 'heading-unit';
        unitNameHeading.textContent = unit.unitName;

        // Append the heading to the left container
        unitNameContainer.appendChild(unitNameHeading);

        unitOverlay.appendChild(unitNameContainer);

        // Append the overlay to the image container
        imageContainer.appendChild(unitOverlay);

        // Append the image container to the main container
        featuredUnit.appendChild(imageContainer);

        // Append the featured unit to a container in your HTML
        featuredUnit.onclick = () => {
            window.location.href = `Room-View.html?id=${unit._id}`; // lagay href with id 
        }
            container.appendChild(featuredUnit);

        });
            } catch (error) {
                console.error('Error:', error);
            }
        }

async function loadPopularPicks() { 
    console.log('function called!');
    try {
    /* const role = localStorage.getItem('role')
        console.log(role);
        checkSuperAdmin(role);*/
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units/top');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const units = await response.json();
        const container = document.getElementById('units-popular'); // lagay ng id ng container

        container.innerHTML = '';

        units.data.forEach(unit => {
        // Create main container div
    // Create the main container div
        const featuredUnit = document.createElement('div');
        featuredUnit.className = 'col p-3';
        featuredUnit.id = 'featured-units';

        // Create the image container div
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        // Create the image element
        const image = document.createElement('img');
        image.alt = 'Beautiful view of Santorini';
        image.className = 'featured-image';

        const imageUrl = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`;
        image.src = imageUrl;

        // Append the image to the image container
        imageContainer.appendChild(image);

        // Create the overlay div
        const unitOverlay = document.createElement('div');
        unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';

        // Create the left container div for the unit name
        const unitNameContainer = document.createElement('div');
        unitNameContainer.className = 'm-3';

        // Create the heading for the unit name
        const unitNameHeading = document.createElement('h5');
        unitNameHeading.id = 'unit-name-5';
        unitNameHeading.className = 'heading-unit';
        unitNameHeading.style.fontSize = '20px';
        unitNameHeading.textContent = unit.unitName;

        // Append the heading to the left container
        unitNameContainer.appendChild(unitNameHeading);


        // Append the name container and SVG container to the overlay
        unitOverlay.appendChild(unitNameContainer);

        // Append the overlay to the image container
        imageContainer.appendChild(unitOverlay);

        // Append the image container to the main container
        featuredUnit.appendChild(imageContainer);

        // Append the featured unit to a container in your HTML
        featuredUnit.onclick = () => {
            window.location.href = `Room-View.html?id=${unit._id}`; // lagay href with id 
        }
            container.appendChild(featuredUnit);

});
    } catch (error) {
        console.error('Error:', error);
    }
}
