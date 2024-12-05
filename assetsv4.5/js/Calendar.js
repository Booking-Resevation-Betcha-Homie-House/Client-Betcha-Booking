const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Function to get the number of days in a month
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

let currentYear = 2024;
let currentMonth = 10; // November (0-based index)

// Function to render the calendar
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
    const todayClass = date === 25 ? "today" : ""; // Highlight the 25th
    datesElement.innerHTML += `<div class="${todayClass}">${date}</div>`;
  }

  // Add event listener for click effects
  const dateElements = datesElement.querySelectorAll("div");
  dateElements.forEach((dateElement) => {
    dateElement.addEventListener("click", () => {
      if (!dateElement.textContent) return; // Ignore empty cells

      // Remove "selected" class from previously clicked date
      const previouslySelected = document.querySelector(".dates div.selected");
      if (previouslySelected) previouslySelected.classList.remove("selected");

      // Add "selected" class to the clicked date
      dateElement.classList.add("selected");
    });
  });
};

// Navigation buttons
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

// Initial Render
renderCalendar();
