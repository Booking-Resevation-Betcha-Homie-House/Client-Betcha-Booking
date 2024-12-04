//finished pero need pa i pacheck sa kanila
async function loadFAQsData(){

   const response = await fetch(`https://betcha-booking-api-master.onrender.com/faqs/getAll`);

    const faqs = await response.json();
    

    const containerFaq = document.getElementById('faq-accordion');
let idCounter = 0; // Counter for unique IDs

faqs.data.forEach(faq => {
    const uniqueId = `faq-item-${idCounter++}`; // Generate a unique ID for each item

    // Create the accordion item
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';

    // Create the accordion header
    const accordionHeader = document.createElement('h2');
    accordionHeader.className = 'accordion-header';
    accordionHeader.setAttribute('role', 'tab');

    // Create the accordion button
    const accordionButton = document.createElement('button');
    accordionButton.className = 'accordion-button';
    accordionButton.type = 'button';
    accordionButton.setAttribute('data-bs-toggle', 'collapse');
    accordionButton.setAttribute('data-bs-target', `#${uniqueId}`); // Dynamic ID
    accordionButton.setAttribute('aria-expanded', 'false'); // Start closed
    accordionButton.setAttribute('aria-controls', uniqueId); // Dynamic ID
    accordionButton.style.fontSize = '18px';

    // Create the question span
    const questionSpan = document.createElement('span');
    questionSpan.id = `faq-question-${idCounter}`; // Optional: unique ID for question
    questionSpan.className = 'manrope';
    questionSpan.innerHTML = `<strong>${faq.Question}</strong>`;

    // Append the question span to the button
    accordionButton.appendChild(questionSpan);

    // Append the button to the header
    accordionHeader.appendChild(accordionButton);

    // Create the accordion collapse container
    const accordionCollapse = document.createElement('div');
    accordionCollapse.className = 'accordion-collapse collapse'; // Start collapsed
    accordionCollapse.id = uniqueId; // Dynamic ID
    accordionCollapse.setAttribute('role', 'tabpanel');

    // Create the accordion body
    const accordionBody = document.createElement('div');
    accordionBody.className = 'accordion-body';

    // Create the answer paragraph
    const answerParagraph = document.createElement('p');
    answerParagraph.id = `faq-answer-${idCounter}`; // Optional: unique ID for answer
    answerParagraph.className = 'mb-0';
    answerParagraph.textContent = faq.Answer;

    // Append the answer paragraph to the accordion body
    accordionBody.appendChild(answerParagraph);

    // Append the accordion body to the collapse container
    accordionCollapse.appendChild(accordionBody);

    // Append the header and collapse container to the accordion item
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionCollapse);

    // Append the accordion item to the accordion container
    containerFaq.appendChild(accordionItem);
});


}