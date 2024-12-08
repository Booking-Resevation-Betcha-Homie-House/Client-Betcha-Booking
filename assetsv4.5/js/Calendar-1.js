(function ($) {
    "use strict";

    $(document).ready(() => {
		const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
		const today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth();
		let selectedDates = { start: null, end: null };
	
		const urlParams = new URLSearchParams(window.location.search);
const unitId = urlParams.get('id');
const apiUrl = `https://betcha-booking-api-master.onrender.com/dates/${unitId}`;
let disabledDates = [];

// Function to fetch disabled dates
const fetchDisabledDates = () => {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            disabledDates = data.dates;
            console.log('Disabled dates:', disabledDates);
            renderCalendars(); // Call renderCalendars after fetching updated data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};

// Fetch disabled dates every 3 seconds
setInterval(fetchDisabledDates, 3000);

// Arrays and functions for rendering the calendar
const calendars = [
    { el: $("#calendar_first"), month: month, year: year },
    { el: $("#calendar_second"), month: (month + 1) % 12, year: month === 11 ? year + 1 : year }
];

const renderCalendar = (calendar) => {
    console.log('Rendering calendar:', calendar);
    const { el, month, year } = calendar;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const header = el.find(".calendar_header h2");
    header.text(`${monthNames[month]} ${year}`);

    const weekLine = el.find(".calendar_weekdays");
    weekLine.empty();
    daysArray.forEach(day => weekLine.append(`<div>${day.substring(0, 3)}</div>`));

    const datesBody = el.find(".calendar_content");
    datesBody.empty();

    for (let i = 0; i < firstDay; i++) datesBody.append('<div class="blank"></div>');
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);

        const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = adjustedDate.toISOString().split('T')[0];

        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today;
        const isDisabled = disabledDates.includes(formattedDate);

        console.log({ formattedDate, isDisabled });

        const classes = [
            isDisabled ? "disabled past-date" : "",
            isToday ? "today" : "",
            isPast ? "past-date" : ""
        ].join(" ").trim();

        datesBody.append(`<div class="${classes}" ${!isDisabled ? `data-date="${formattedDate}"` : ""}>${day}</div>`);
    }
};

	
		const renderCalendars = () => {
			console.log('Rendering calendars...');
			calendars.forEach(renderCalendar);
			updateSelection();
		};
	
		const updateSelection = () => {
			$(".calendar_content div").removeClass("selected");
			if (selectedDates.start && selectedDates.end) {
				const start = new Date(selectedDates.start);
				const end = new Date(selectedDates.end);
	
				$(".calendar_content div").each(function () {
					const date = new Date($(this).data("date"));
					if (date >= start && date <= end) $(this).addClass("selected");
				});
	
				$("#input-start-date").val(start.toISOString().split("T")[0]);
				$("#input-end-date").val(end.toISOString().split("T")[0]);
			} else if (selectedDates.start) {
				$(".calendar_content div").each(function () {
					const date = new Date($(this).data("date"));
					if (date.toDateString() === new Date(selectedDates.start).toDateString()) {
						$(this).addClass("selected");
					}
				});
			}
		};
	
		const handleClick = (e) => {
			const $target = $(e.target);
			const date = $target.data("date");
	
			if ($target.hasClass("disabled") || $target.hasClass("past-date") || !date) return;
	
			const clickedDate = new Date(date);
	
			if (selectedDates.start && !selectedDates.end && new Date(selectedDates.start).toDateString() === clickedDate.toDateString()) {
				selectedDates = { start: null, end: null };
				updateSelection();
				$("#input-start-date").val("");
				$("#input-end-date").val("");
				return;
			}
	
			if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
				selectedDates = { start: clickedDate, end: null };
			} else {
				selectedDates.end = clickedDate;
			}
	
			const start = new Date(selectedDates.start);
			const end = selectedDates.end ? new Date(selectedDates.end) : start;
	
			const rangeStart = start < end ? start : end;
			const rangeEnd = start < end ? end : start;
	
			for (let d = new Date(rangeStart); d <= rangeEnd; d.setDate(d.getDate() + 1)) {
				const formattedDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
					.toISOString()
					.split("T")[0];
	
				if (disabledDates.includes(formattedDate)) {
					alertCustom("Invalid dates!", "You selected a booked date. Resetting Selection...");
					selectedDates = { start: null, end: null };
					updateSelection();
	
					$("#input-start-date").val("");
					$("#input-end-date").val("");
					return;
				}
			}
	
			$("#input-start-date").val(start.toISOString().split("T")[0]);
			if (selectedDates.end) {
				$("#input-end-date").val(end.toISOString().split("T")[0]);
			}
	
			updateSelection();
		};
	
		$(".calendar_content").on("click", "div", function (e) {
			handleClick(e);
		});
	
		const switchCalendar = (direction) => {
			console.log(`Switching calendar: ${direction}`);
			calendars.forEach(calendar => {
				const newMonth = direction === "next" ? (calendar.month + 1) % 12 : (calendar.month === 0 ? 11 : calendar.month - 1);
				const newYear = direction === "next" && calendar.month === 11
					? calendar.year + 1
					: direction === "prev" && calendar.month === 0
					? calendar.year - 1
					: calendar.year;
				calendar.month = newMonth;
				calendar.year = newYear;
			});
			renderCalendars();
		};
	
		renderCalendars();
		$(".switch-month.switch-left").on("click", () => switchCalendar("prev"));
		$(".switch-month.switch-right").on("click", () => switchCalendar("next"));
	});
	
})(jQuery);
