const seats = document.querySelectorAll('.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = 150;

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        seat.classList.toggle('selected');
        updateSummary();
    });
});

function updateSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}
