function populateYearOptions() {
    const yearSelect = document.getElementById('select-year');

    if (yearSelect.options.length > 0) return;

    const currentYear = new Date().getFullYear();
    const startYear = 2024;

    for (let i = startYear; i <= currentYear; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    yearSelect.value = currentYear; 
}

async function loadMonthlyTopUnits(month, year) {
    if (!month || !year) {
        console.error('Invalid month or year:', { month, year });
        updateChart(["No data"], [0], 0, true);
        return;
    }

    try {
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getMonth/${month}/${year}`);
        if (!response.ok) {
            throw new Error('Failed to fetch top units data');
        }

        const units = await response.json();
        const labels = units.rankedUnits ? units.rankedUnits.map(unit => unit.unitName) : [];
        const earningsData = units.rankedUnits ? units.rankedUnits.map(unit => unit.totalEarnings) : [];
        const totalMonthEarned = units.totalEarningsAllUnits || 0;

        if (labels.length === 0 || earningsData.length === 0) {
            updateChart(["No data"], [0], totalMonthEarned, true);
            return;
        }

        updateChart(labels, earningsData, totalMonthEarned, false);
    } catch (error) {
        console.error('Error:', error);
        updateChart(["No data"], [0], 0, true);
    }
}

function updateChart(labels, data, totalMonthEarned, isNoData) {
    if (window.myBarChart instanceof Chart) {
        window.myBarChart.destroy();
    }

    const formattedCurrency = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    }).format(totalMonthEarned);

    document.getElementById('total-earnings-all-unit').innerHTML = isNoData
        ? `<strong>No data available</strong>`
        : `<strong>Total: ${formattedCurrency}</strong>`;

    const ctx = document.getElementById('myBarChart').getContext('2d');
    window.myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: isNoData ? 'No data to display' : 'Total Earnings Per Unit',
                data: data,
                backgroundColor: isNoData ? '#d3d3d3' : '#b4cb68', 
                borderColor: isNoData ? '#d3d3d3' : '#b4cb68',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return '₱' + tooltipItem.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

document.getElementById('select-month').addEventListener('change', function() {
    const month = this.value;
    const year = document.getElementById('select-year').value;
    console.log('Selected month:', month);
    console.log('Selected year:', year);
    loadMonthlyTopUnits(month, year);
});

document.getElementById('select-year').addEventListener('change', function() {
    const year = this.value;
    const month = document.getElementById('select-month').value;
    console.log('Selected year:', year);
    console.log('Selected month:', month);
    loadMonthlyTopUnits(month, year);
});


populateYearOptions();

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

document.getElementById('select-month').value = currentMonth;
document.getElementById('select-year').value = currentYear;

loadMonthlyTopUnits(currentMonth, currentYear);
