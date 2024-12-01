//Need tanggalin yuung buttons sa may completed table 

//unfinished
const urlParams = new URLSearchParams(window.location.search);
const refID = urlParams.get('id');
console.log('Unit ID from URL: ', refID);

function loadTransactionViewData(){

    fetch(`https://betcha-booking-api-master.onrender.com/booking/${refID}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data) {
            console.log(data);
            const user = data; 

            console.log(user.Status);
            if(user.Status === 'Successful' || user.Status ==="Did not arrive" || user.Status === 'Unpaid' || user.Status === 'Cancelled'){
                console.log("remove");
                const cancelbtn = document.getElementById('cancel-booking');
                const editbtn = document.getElementById('edit-button');
                cancelbtn.remove();
                editbtn.remove();
            }

            document.getElementById('view-transaction-reference').innerHTML = refID; 

            document.getElementById('view-transaction-unit-name').innerHTML = user.UnitId.unitName; 

            const userCI = user.CheckIn;
            const formatuserCI = userCI.split('T')[0];
            document.getElementById('view-transaction-start-date').innerHTML = formatuserCI; // palitan id

            const userCO = user.CheckOut;
            const formatuserCO = userCO.split('T')[0];
            document.getElementById('view-transaction-end-date').innerHTML = formatuserCO; 

            const bookDate = user.Date;
            const formatBookdate = bookDate.split('T')[0];
            document.getElementById('view-transaction-booking-date').textContent = formatBookdate; 

            document.getElementById('view-transaction-status').textContent = user.Status; 

            document.getElementById('view-transaction-payment-mode-2').textContent = user.PaymentId.Mop; 

            document.getElementById('view-transaction-price-per-day').textContent = user.UnitId.unitPrice; // palitan id //span id kinuha ko  //view-transaction-price-per-day id ng p

            let DOS = user.BookDates.length;
            document.getElementById('view-transaction-price-per-day-1').textContent = user.NumOfDays; ; 

            document.getElementById('view-transaction-price-per-pax').textContent = user.UnitId.pricePerPax; // palitan id /span id kinuha ko // view-transaction-price-per-day id ng p

            document.getElementById('view-transaction-additional-pax').textContent = user.AdditionalPax; 

            document.getElementById('view-transaction-reservation-2').textContent = user.UnitId.reservation;

            document.getElementById('view-transaction-additional-pax-1').textContent = '₱'+user.Total; 
       } /*else {
            alert('Super Admin not found or missing data.');
        }*/
    })
    .catch(error => {
        console.error('Error during display:', error);
        alert('Failed to display Super Admin info: ' + error.message);
    });

}

document.getElementById('edit-button').onclick = () => {
    window.location.href = `Transactions-Edit.html?id=${refID}`;
}
//di pa na seset kung san button or html to

var cb1 = document.getElementById('formCheck-11');
var cb2 = document.getElementById('formCheck-22');
var cb3 = document.getElementById('formCheck-33');

function statusvalue() {
    var status;

    if (cb1.checked) {
        status = 'Did not arrive';
        return status;
    } else if (cb2.checked) {
        status = 'Unpaid';
        return status;
    } else if (cb3.checked) {
        status = 'Cancelled';
        return status;
    }
}

function cancelBooking(){

    console.log("called cancel")
    if(statusvalue() === '' || statusvalue() === null){
        throw new Error('Status is Null or Empty');
    }
    const SadminData = {
        reference : refID,
        Status: statusvalue()
        
    }
    fetch(`https://betcha-booking-api-master.onrender.com/edit-status`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SadminData)
    })
    .then (respone => respone.json())
    .then(data =>{

        const modal= document.getElementById('modal-transaction-cancel-booking')
        window.location.reload();
        console.log(data);
    })
    .catch(error => {
        console.log(error)
        alert('Failed to Update the info' + error.message)
    });
}

document.getElementById('btn-transaction-view-cancel').addEventListener('click',cancelBooking);
document.getElementById('logout-btn').onclick = () => {
    localStorage.clear();
    window.location.href ='../LogIn.html';
}


