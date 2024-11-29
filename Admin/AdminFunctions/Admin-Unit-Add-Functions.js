//need bumalik sa view unit

function SAdminAddUnit(){
    console.log('function called');
    const unitName = document.getElementById('input-unit-name-1').value;
    const location = document.getElementById('input-unit-loc-1').value;
    const packCap = document.getElementById('input-unit-num-pax-1').value; 
    const maxPax = document.getElementById('input-unit-max-pax-1').value;
    const unitPrice = document.getElementById('input-unit-price-1').value;
    const reservationFee = document.getElementById('input-unit-reservation-fee-1').value;
    const pricePerPax = document.getElementById('input-unit-price-per-pax-1').value;
    const status = document.getElementById('select-status').value;
    var stat;
    if (status === 'Available'){
         stat =  true;
    }
    else{
         stat = false;
    }
    console.log(status);
    const category = document.getElementById('select-category').value;
    console.log(category);
    const description = document.getElementById('input-unit-desc').value;
    console.log(description);
    const maplink = document.getElementById('input-unit-map-link-1').value;
    const UnitImage = document.getElementById('input-unit-image').files;
    const otheramenities = document.getElementById('input-unit-other').value;

  
    
    const items = {
        "towels": document.getElementById('towels').checked,
        "toiletPaper": document.getElementById('toiletPaper').checked,
        "airConditioning": document.getElementById('airConditioning').checked,
        "soapAndShampoo": document.getElementById('soapAndShampoo').checked,
        "hotWater": document.getElementById('hotWater').checked,
        "comfortableBed": document.getElementById('comfortableBed').checked,
        "washingMachineAndDryer": document.getElementById('washingMachineAndDryer').checked,
        "closetsOrDrawers": document.getElementById('closetsOrDrawers').checked,
        "television": document.getElementById('television').checked,
        "streamingServices": document.getElementById('streamingServices').checked,
        "booksOrBoardGames": document.getElementById('booksOrBoardGames').checked,
        "ceilingFans": document.getElementById('ceilingFans').checked,
        "smokeDetectors": document.getElementById('smokeDetectors').checked,
        "fireExtinguisher": document.getElementById('fireExtinguisher').checked,
        "firstAidKit": document.getElementById('firstAidKit').checked,
        "secureLocks": document.getElementById('secureLocks').checked,
        "freeWiFi": document.getElementById('freeWiFi').checked,
        "stoveAndOven": document.getElementById('stoveAndOven').checked,
        "refrigerator": document.getElementById('refrigerator').checked,
        "microwave": document.getElementById('microwave').checked,
        "cookingUtensils": document.getElementById('cookingUtensils').checked,
        "coffeeMaker": document.getElementById('coffeeMaker').checked,
        "balconyOrTerrace": document.getElementById('balconyOrTerrace').checked,
        "privateGarden": document.getElementById('privateGarden').checked,
        "swimmingPoolAccess": document.getElementById('swimmingPoolAccess').checked,
        "parkingFacilities": document.getElementById('parkingFacilities').checked,
        "parkingSpace": document.getElementById('parkingSpace').checked,
        "gymAccess": document.getElementById('gymAccess').checked,
        "elevator": document.getElementById('elevator').checked
    }

    console.log(items);
    const registerUnitData = new FormData() 
        registerUnitData.append('unitName',unitName);
        registerUnitData.append('location',location);
        registerUnitData.append('maplink',maplink);
        registerUnitData.append('description',description);
        registerUnitData.append('amenities',JSON.stringify(items));
        registerUnitData.append('otheramenities',otheramenities);
        registerUnitData.append('unitPrice',unitPrice);
        registerUnitData.append('reservationFee',reservationFee);
        registerUnitData.append('packageCapacity',packCap);
        registerUnitData.append('isAvailable',stat);
        registerUnitData.append('maxPax',maxPax);
        registerUnitData.append('pricePerPax',pricePerPax);
        registerUnitData.append('category',category);

        for (let i = 0; i < UnitImage.length; i++) {
            registerUnitData.append('unitImages', UnitImage[i]);
        }
        console.log(JSON.stringify(registerUnitData));
        openLoading();
    fetch('https://betcha-booking-api-master.onrender.com/addUnit', {
        method: 'POST',
        body: registerUnitData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            alert('Adding Unit successful: ' + data.message);
            closeLoading();
        } else {
            alert('Adding unit successful, but no message returned.');
            closeLoading();
        }
    })
    .catch(error => {
        console.error('Error during adding unit:', error);
        alert('Failed to register unit: ' + error.message);
        closeLoading();
    });

}
function back(){
    window.location.href="Units-List.html";
}
    
document.getElementById('addUnit').addEventListener('click',SAdminAddUnit);
document.getElementById('cancel-id').addEventListener('click',back);

