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
        const container = document.getElementById('popular-units'); // lagay ng id ng container

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
        console.log(unit._id);

        // Append the featured unit to a container in your HTML
        featuredUnit.onclick = () => {
            console.log(unit._id);
            window.location.href = `../User/LoggedIn/Room-View.html?id=${unit._id}`; // lagay href with id 
        }
            container.appendChild(featuredUnit);

        });
            } catch (error) {
                console.error('Error:', error);
            }
        }