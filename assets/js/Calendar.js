const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

let currentYear = 2024;
let currentMonth = 10; 


const renderCalendar = () => {
  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const datesElement = document.getElementById("dates");

  monthElement.textContent = monthNames[currentMonth];
  yearElement.textContent = currentYear;

  datesElement.innerHTML = ""; 

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = daysInMonth(currentYear, currentMonth);


  if (firstDay > 0) {
    for (let i = 0; i < firstDay; i++) {
      datesElement.innerHTML += `<div></div>`;
    }
  }

  for (let date = 1; date <= totalDays; date++) {
    const todayClass = date === 25 ? "today" : ""; 
    datesElement.innerHTML += `<div class="${todayClass}">${date}</div>`;
  }

  const dateElements = datesElement.querySelectorAll("div");
  dateElements.forEach((dateElement) => {
    dateElement.addEventListener("click", () => {
      if (!dateElement.textContent) return; 
     
      const previouslySelected = document.querySelector(".dates div.selected");
      if (previouslySelected) previouslySelected.classList.remove("selected");

     
      dateElement.classList.add("selected");
    });
  });
};


document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});


renderCalendar();


