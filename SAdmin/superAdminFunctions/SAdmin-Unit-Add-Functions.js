//unifinished



function SAdminAddUnit(){

    const unitName = document.getElementById('input-unit-name-1').value;
    const location = document.getElementById('input-unit-loc-1').value;
    const packCap = document.getElementById('input-unit-num-pax-1').value; 
    const maxPax = document.getElementById('input-unit-max-pax-1').value;
    const unitPrice = document.getElementById('input-unit-price-1').value;
    const reservationFee = document.getElementById('input-unit-reservation-fee-1').value;
    const pricePerPax = document.getElementById('input-unit-price-per-pax-1').value;
    const status = document.getElementById('select-status').value;
    const category = document.getElementById('select-category').value;
    const inclusion = document.getElementById('input-unit-price-per-pax-1').value;
    const description = document.getElementById('input-unit-desc-1').value;
  
    const registerUnitData = {
        unitName:unitName,
        location:location,
        maplink:,
        maxPax:maxPax,
        unitPrice:unitPrice,
        reservationFee:reservationFee,
        pricePerPax:pricePerPax,
        Status:status,
        category:category,
        //inclusion how? 
        description:description,

    };


    fetch('https://betcha-booking-api-master.onrender.com/addUnit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerUnitData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            alert('Registration successful: ' + data.message);
        } else {
            alert('Registration successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });

}
    