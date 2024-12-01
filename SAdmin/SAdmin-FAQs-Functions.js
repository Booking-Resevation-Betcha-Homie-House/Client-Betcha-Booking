function createFAQ() {

    const question = document.getElementById('input-faqs-question').value;
    const answer = document.getElementById('input-faqs-answer').value;

    openLoading();
    const url = "https://betcha-booking-api-master.onrender.com/faqs/create"; 
    const data = {
        Question: question,
        Answer: answer
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "FAQ created successfully") {
            closeLoading();
            console.log("FAQ created:", data.data);
            
            createdFAQTrail(localStorage.getItem('id'),localStorage.getItem('role'));
            setTimeout(() => {
                window.location.href='FAQs.html';
            }, 2000);
        } else {
            
            console.log("Error:", data.message);
        }
    })
    .catch(error => {
        closeLoading();
        console.error("Error:", error);
    });
}

function updateFAQ(faqId) {
    console.log('called update');
    const question = document.getElementById('input-faqs-question-1').value;
    const answer = document.getElementById('input-faqs-answer-1').value;

    openLoading();
    const url = `https://betcha-booking-api-master.onrender.com/faqs/update/${faqId}`; 
    const data = {
        Question: question,
        Answer: answer
    };
    console.log(question);
    console.log(answer);
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "FAQ created successfully") {
            closeLoading();
            console.log("FAQ Updated:", data.data);
            console.log(getItem('id'));
            editFAQTrail(localStorage.getItem('id'),localStorage.getItem('role'));
            //window.location.href='FAQs.html';
        } else {
            closeLoading()
            console.log("Error:", data.message);
            setTimeout(() => {
                window.location.href='FAQs.html';
            }, 2000); 
            
        }
    })
    .catch(error => {
        closeLoading()
        console.error("Error:", error);
    });
}

function deleteFAQ(faqId) {
    openLoading();
    const url = `https://betcha-booking-api-master.onrender.com/faqs/delete/${faqId}`;  // Your API endpoint with the FAQ ID to delete

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "FAQ deleted successfully") {
            closeLoading();
            console.log("FAQ deleted:", data.message);
            deletedFAQTrail(localStorage.getItem('id'),localStorage.getItem('role'));
            setTimeout(() => {
                window.location.reload();
            }, 2000); 
           
        } else {
            closeLoading();
            
            console.log("Error:", data.message);
            window.location.reload();
        }
    })
    .catch(error => {
        closeLoading();
        console.error("Error:", error);
    });
}
async function displayQA(){
    
    const role = localStorage.getItem('role');
    console.log(role,localStorage.getItem('id'));
    checkSuperAdmin(role);

    const response = await fetch('https://betcha-booking-api-master.onrender.com/faqs/getAll');
    if (!response.ok) {
        throw new Error('Failed to fetch admin data');
    }

        const fetchedQA = await response.json();

        const qacontainer = document.getElementById('container-faq');
        qacontainer.innerHTML='';

        if (fetchedQA.lenth == 0){
            qacontainer.innerHTML ="No FAQS"; 
        }
    
        fetchedQA.data.forEach(faq => {
        
        const trytry = fetchedQA;
        console.log(trytry)
        console.log(fetchedQA.data._id)
        



        const faqCardDiv = document.createElement('div');
        faqCardDiv.id = 'div-faq-card';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-3';

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        const row1 = document.createElement('div');
        row1.className = 'row';
        const col1 = document.createElement('div');
        col1.className = 'col';
        const questionP = document.createElement('p');
        questionP.style.color = '#212529';
        questionP.innerHTML = `<strong>${faq.Question}</strong>`; // question
        col1.appendChild(questionP);
        row1.appendChild(col1);

        const row2 = document.createElement('div');
        row2.className = 'row';
        const col2 = document.createElement('div');
        col2.className = 'col';
        col2.style.paddingRight = '24px';
        col2.style.paddingLeft = '24px';
        const answerP = document.createElement('p');
        answerP.textContent = `${faq.Answer}`; // answer
        col2.appendChild(answerP);
        row2.appendChild(col2);

        const row3 = document.createElement('div');
        row3.className = 'row';
        const col3 = document.createElement('div');
        col3.className = 'col';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'd-xxl-flex justify-content-xxl-end d-flex gap-1';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-icon-only';
        deleteButton.id = 'btn-faq-delete';
        deleteButton.type = 'button';
        deleteButton.setAttribute('data-bs-target', '#modal-remove');
        deleteButton.setAttribute('data-bs-toggle', 'modal');
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt';
        deleteButton.appendChild(deleteIcon); 

       const removebtn = document.getElementById('delete-btn');
       removebtn.onclick = function(){
        deleteFAQ(faq._id);
       }
       const editbtn = document.getElementById('edi-btn');
       editbtn.onclick = function(){
        updateFAQ(faq._id);
       }
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-icon-only';
        editButton.id = 'btn-faq-edit';
        editButton.type = 'button';
        editButton.setAttribute('data-bs-target', '#modal-faq');
        editButton.setAttribute('data-bs-toggle', 'modal');
        
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-pen';
        editButton.appendChild(editIcon);

        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(editButton);
        col3.appendChild(buttonContainer);
        row3.appendChild(col3);

        cardBodyDiv.appendChild(row1);
        cardBodyDiv.appendChild(row2);
        cardBodyDiv.appendChild(row3);

        cardDiv.appendChild(cardBodyDiv);

        faqCardDiv.appendChild(cardDiv);

        const faqContainer = document.getElementById('container-faq');
    if (faqContainer) {
       faqContainer.appendChild(faqCardDiv);
    } else {
        console.error('No element with ID "faq-container" found.');
    }
});
}

document.getElementById('crt-btn').addEventListener('click',createFAQ);
//document.getElementById('btn-faq-edit').addEventListener