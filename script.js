document.addEventListener('DOMContentLoaded', () => {

    const seats = document.querySelectorAll('.seat:not(.occupied)');
    const count = document.getElementById('count');
    const total = document.getElementById('total');
    const seatList = document.getElementById('seatList');

    const ticketPrice = 150;

    // Restore seats when page loads
    populateUI();

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            updateSummary();
            saveSeats();
        });
    });

    function updateSummary() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        count.innerText = selectedSeats.length;
        total.innerText = selectedSeats.length * ticketPrice;

        const seatNames = [...selectedSeats].map(seat => seat.dataset.seat);
        seatList.innerText = seatNames.length ? seatNames.join(', ') : 'None';
    }

    function saveSeats() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const seatsArr = [...selectedSeats].map(seat => seat.dataset.seat);
        localStorage.setItem('selectedSeats', JSON.stringify(seatsArr));
    }

    function populateUI() {
        const savedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if (savedSeats && savedSeats.length > 0) {
            seats.forEach(seat => {
                if (savedSeats.includes(seat.dataset.seat)) {
                    seat.classList.add('selected');
                }
            });
            updateSummary();
        }
    }

});
