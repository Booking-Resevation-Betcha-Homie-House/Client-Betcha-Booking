async function loadMonthPicks() { 
    console.log('function called!');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units/bottom');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const units = await response.json();
        const container = document.getElementById('units-popular');

    
        container.innerHTML = '';

        units.data.forEach(unit => {
     
            const featuredUnit = document.createElement('div');
            featuredUnit.className = 'col p-3';

      
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            const image = document.createElement('img');
            image.alt = `Beautiful view of ${unit.unitName}`;
            image.className = 'featured-image';
            image.src = `https://drive.google.com/thumbnail?id=${unit.UnitImages[0].fileId}&sz=w1920-h1080`;
            imageContainer.appendChild(image);


            const unitOverlay = document.createElement('div');
            unitOverlay.className = 'd-flex justify-content-between align-items-end unit-overlay';


            const unitNameContainer = document.createElement('div');
            unitNameContainer.className = 'm-3';

     
            const unitNameHeading = document.createElement('h5');
            unitNameHeading.id = `unit-name-${unit._id}`;
            unitNameHeading.className = 'heading-unit';
            unitNameHeading.textContent = unit.unitName;
            unitNameContainer.appendChild(unitNameHeading);
            unitOverlay.appendChild(unitNameContainer);

        
            imageContainer.appendChild(unitOverlay);

            featuredUnit.appendChild(imageContainer);

        
            featuredUnit.onclick = () => {
                console.log(`Redirecting to Room-View for unit: ${unit._id}`);
                window.location.href = `../User/LoggedIn/Room-View.html?id=${unit._id}`;
            };

            container.appendChild(featuredUnit);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

