//unfinisehd
const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);


    var checkbox1 = document.getElementById('formCheck-1'); // reserved
    var checkbox2 = document.getElementById('formCheck-4'); // Fully paid
    var checkbox3 = document.getElementById('formCheck-3'); //Arrived
    var checkbox4 = document.getElementById('formCheck-2'); // sucessfull


function loadTransactionEditData(){
   
    fetch(`https://betcha-booking-api-master.onrender.com/booking/${refID}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data) {
            console.log(data);
            const user = data; 
            
          
            if(user.Status ==='Reserved'){
                console.log('called1')
                const lbReserved = document.getElementById('reserve');//label
                const cbReserve = document.getElementById('formCheck-1')
                lbReserved.style.textDecoration = 'line-through';
                cbReserve.disabled = true;
            }
            else if(user.Status==='Fully-Paid'){
                console.log('called2')
                const lbReserved = document.getElementById('reserve');//label
                const cbReserve = document.getElementById('formCheck-1')
                lbReserved.style.textDecoration = 'line-through';
                cbReserve.disabled = true;
                const lbFP = document.getElementById('FP'); // label
                const divFP = document.getElementById('formCheck-4');//checkbox
                lbFP.style.textDecoration = 'line-through';
                divFP.disabled = true;
            }
            else if(user.Status==='Arrived'){
                console.log('called3')

                const lbReserved = document.getElementById('reserve');//label
                const cbReserve = document.getElementById('formCheck-1')
                lbReserved.style.textDecoration = 'line-through';
                cbReserve.disabled = true;
                const lbFP = document.getElementById('FP'); // label
                const divFP = document.getElementById('formCheck-4');//checkbox
                lbFP.style.textDecoration = 'line-through';
                divFP.disabled = true;
                const lbArrived = document.getElementById('arrive');
                const cbArrive = document.getElementById('formCheck-3');
                lbArrived.style.textDecoration = 'line-through';
                cbArrive.disabled = true;
            }
            else if(user.Status==='Successful'){
                console.log('called4')
                const lbReserved = document.getElementById('reserve');//label
                const cbReserve = document.getElementById('formCheck-1')
                lbReserved.style.textDecoration = 'line-through';
                cbReserve.disabled = true;
                const lbFP = document.getElementById('FP'); // label
                const divFP = document.getElementById('formCheck-4');//checkbox
                lbFP.style.textDecoration = 'line-through';
                divFP.disabled = true;
                const lbArrived = document.getElementById('arrive');
                const cbArrive = document.getElementById('formCheck-3');
                lbArrived.style.textDecoration = 'line-through';
                cbArrive.disabled = true;
                const lbSuccessful = document.getElementById('cbx-status-successful');
                const cbSuccess = document.getElementById('formCheck-2');
                lbSuccessful.style.textDecoration = 'line-through';
                cbSuccess.disabled = true;
            }
        

            document.getElementById('view-transaction-reference').innerHTML = refID; 

            document.getElementById('view-transaction-unit-name').innerHTML = user.UnitId.unitName; 

            document.getElementById('view-transaction-start-date').innerHTML = user.CheckIn; // palitan id

            document.getElementById('view-transaction-end-date').innerHTML = user.CheckOut; 

            document.getElementById('view-transaction-booking-date').textContent = user.Date; 

           // document.getElementById('view-transaction-status').textContent = user.Status; 

            document.getElementById('view-transaction-payment-mode-2').textContent = user.PaymentId.Mop; 

            document.getElementById('view-transaction-price-per-day').textContent = user.UnitId.unitPrice; // palitan id //span id kinuha ko  //view-transaction-price-per-day id ng p

            let DOS = user.BookDates.length;
            document.getElementById('view-transaction-price-per-day-1').textContent = DOS; 

            document.getElementById('view-transaction-price-per-pax').textContent = user.UnitId.pricePerPax; // palitan id /span id kinuha ko // view-transaction-price-per-day id ng p

            document.getElementById('view-transaction-additional-pax').textContent = user.AdditionalPax; 

            document.getElementById('view-transaction-reservation-2').textContent = user.UnitId.reservation;

            document.getElementById('view-transaction-additional-pax-1').textContent = '₱'+user.Total; 
       } 
    })
    .catch(error => {
        console.error('Error during display:', error);
        alert('Failed to display Super Admin info: ' + error.message);
    });

}

function editTransactionData(){
    console.log("called edit")
    
    if(statusvalue() === '' || statusvalue === null){
        throw new Error('Status is Null or Empty');
    }
    const SadminData = {
        reference : refID,
        Status: statusvalue()
        
    }
    openLoading();
    fetch(`https://betcha-booking-api-master.onrender.com/edit-status`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SadminData)
    })
    .then (respone => respone.json())
    .then(data =>{
        closeLoading();
        window.location.href=`Transactions-View.html?id=${refID}`;
        console.log(data);
    })
    .catch(error => {
        console.log(error)
        alert('Failed to Update the info' + error.message)
        closeLoading();
    });
}

document.getElementById('save-edit').addEventListener('click',editTransactionData);

function statusvalue() {
    var status;

    if (checkbox1.checked) {
        status = 'Reserved';
        return status;
    } else if (checkbox2.checked) {
        status = 'Fully-Paid';
        return status;
    } else if (checkbox3.checked) {
        status = 'Arrived';
        return status;
    } else if (checkbox4.checked) {
        status = 'Successful';
        return status;
    }
}

function back(){
    window.location.href=`Transactions-Edit.html?id=${refID}`;
}

document.getElementById('cnl-btn').addEventListener('click', back);