const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

async function loadUnitEditData(){
    try {
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getUnitById/${refID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch unit data');
        }
        const unit = await response.json();

        // Set unit data in the form fields
        document.getElementById('input-unit-name').value = unit.unitName;
        document.getElementById('input-unit-loc').value = unit.location;
        document.getElementById('input-unit-map-link').value = unit.maplink;
        document.getElementById('input-unit-num-pax').value = unit.packageCapacity;
        document.getElementById('input-unit-max-pax').value = unit.maxPax;
        document.getElementById('input-unit-price').value = unit.unitPrice;
        document.getElementById('input-unit-reservation-fee').value = unit.reservation;
        document.getElementById('input-unit-price-per-pax').value = unit.pricePerPax;
        document.getElementById('input-unit-other').value = unit.otherAmenities;
        document.getElementById('input-unit-desc').value = unit.description;

        const statuscell = document.getElementById('select-status').value;
        statuscell.value = unit.isAvailable ? 'Available' : 'Unavailable';

        const category = document.getElementById('select-category');
        category.value = unit.category || 'Others';

        let itemnumber = 1;

        Object.entries(unit.amenities).forEach(([amenity, isChecked]) => {
            console.log(amenity,isChecked);
            const itemElement = document.getElementById(`item${itemnumber}`);
            console.log(itemElement);
            if (itemElement) {
                itemElement.checked = isChecked; // Set the checkbox to checked or unchecked based on isChecked
            }
            itemnumber++;
        });

        // Optional: Handle unit images if needed
        unit.UnitImages.forEach(element => {
            // Process images (for example, display them or store them)
        });


        document.getElementById('input-unit-image').files; // Handle images if needed

    } catch (error) {
        console.error('Error:', error);
    }
}

function editData(){
   
    const unitname =document.getElementById('input-unit-name').value;
    console.log(unitname);
    const loc =document.getElementById('input-unit-loc').value;
    const mapLink =document.getElementById('input-unit-map-link').value;
    const packageCapacity =document.getElementById('input-unit-num-pax').value;
    const maxPax =document.getElementById('input-unit-max-pax').value;
    const unitPrice =document.getElementById('input-unit-price').value;
    const reservationFee =document.getElementById('input-unit-reservation-fee').value;
    const pricePerPax = document.getElementById('input-unit-price-per-pax').value;
    
    const status =  document.getElementById('select-status').value;
    var stat;
    if (status === 'Available'){
        stat = true;
    }
    else {
        stat = false;
    }

    const categ = document.getElementById('select-category').value;
    const otherAmenities = document.getElementById('input-unit-other').value;
    const desc = document.getElementById('input-unit-desc').value;
    const imgs = document.getElementById('input-unit-image').files;

    const items = {
        "towels": document.getElementById('item1').checked,
        "toiletPaper": document.getElementById('item2').checked,
        "airConditioning": document.getElementById('item3').checked,
        "soapAndShampoo": document.getElementById('item4').checked,
        "hotWater": document.getElementById('item5').checked,
        "comfortableBed": document.getElementById('item6').checked,
        "washingMachineAndDryer": document.getElementById('item7').checked,
        "closetsOrDrawers": document.getElementById('item8').checked,
        "television": document.getElementById('item9').checked,
        "streamingServices": document.getElementById('item10').checked,
        "booksOrBoardGames": document.getElementById('item11').checked,
        "ceilingFans": document.getElementById('item12').checked,
        "smokeDetectors": document.getElementById('item13').checked,
        "fireExtinguisher": document.getElementById('item14').checked,
        "firstAidKit": document.getElementById('item15').checked,
        "secureLocks": document.getElementById('item16').checked,
        "freeWiFi": document.getElementById('item17').checked,
        "stoveAndOven": document.getElementById('item18').checked,
        "refrigerator": document.getElementById('item19').checked,
        "microwave": document.getElementById('item20').checked,
        "cookingUtensils": document.getElementById('item21').checked,
        "coffeeMaker": document.getElementById('item22').checked,
        "balconyOrTerrace": document.getElementById('item23').checked,
        "privateGarden": document.getElementById('item24').checked,
        "swimmingPoolAccess": document.getElementById('item25').checked,
        "parkingFacilities": document.getElementById('item26').checked,
        "parkingSpace": document.getElementById('item27').checked,
        "gymAccess": document.getElementById('item28').checked,
        "elevator": document.getElementById('item29').checked
    }

    const updateData = new FormData();
    updateData.append('unitName',unitname);
    updateData.append('location',loc);
    updateData.append('maplink',mapLink);
    updateData.append('description',desc);
    updateData.append('amenities',JSON.stringify(items)); 
    updateData.append('otherAmenities',otherAmenities);
    updateData.append('unitPrice',unitPrice);
    updateData.append('reservationFee',reservationFee);
    updateData.append('packageCapacity',packageCapacity);
    updateData.append('isAvailable',stat);
    updateData.append('maxPax',maxPax);
    updateData.append('pricePerPax',pricePerPax);
    updateData.append('category',categ);

    if(imgs.length > 0){
    for (let i = 0; i < imgs.length; i++) {
        updateData.append('unitImages', imgs[i]);
    }
    }
    console.log(unitname, loc, mapLink, packageCapacity, maxPax, unitPrice, reservationFee, pricePerPax, stat, categ, otherAmenities, desc, imgs);

    console.log(JSON.stringify(updateData));
    openLoading();
    fetch(`https://betcha-booking-api-master.onrender.com/editUnit/${refID}`, {
        method: 'PUT',
        body: updateData
})
    .then(response => response.json())
    .then(data => {
        alert('Admin updated successfully');
        closeLoading();
        window.location.href=`Unit-View.html?id=${refID}`;
    })
    .catch(error => {
        closeLoading();
        console.error('Error during update:', error);
        alert('Failed to update Admin: ' + error.message);
    }); 
}

function back(){
    window.location.href=`Unit-View.html?id=${refID}`;
}


document.getElementById('save-edit-btn').addEventListener('click',editData);
document.getElementById('cancel-btn').addEventListener('click',back);
