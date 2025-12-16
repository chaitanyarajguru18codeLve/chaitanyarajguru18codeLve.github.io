document.addEventListener("DOMContentLoaded", () => {

    const seats = document.querySelectorAll(".seat:not(.occupied)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const seatList = document.getElementById("seatList");
    const movieSelect = document.getElementById("movie");

    let ticketPrice = +movieSelect.value;

    // Restore saved seats
    const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    seats.forEach(seat => {
        if (savedSeats.includes(seat.dataset.seat)) {
            seat.classList.add("selected");
        }

        seat.addEventListener("click", () => {
            seat.classList.toggle("selected");
            saveSeats();
            updateSummary();
        });
    });

    movieSelect.addEventListener("change", () => {
        ticketPrice = +movieSelect.value;
        updateSummary();
    });

    function updateSummary() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        count.innerText = selectedSeats.length;
        total.innerText = selectedSeats.length * ticketPrice;

        const seatNames = [...selectedSeats].map(seat => seat.dataset.seat);
        seatList.innerText = seatNames.length ? seatNames.join(", ") : "None";
    }

    function saveSeats() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        const seatIds = [...selectedSeats].map(seat => seat.dataset.seat);
        localStorage.setItem("selectedSeats", JSON.stringify(seatIds));
    }

    updateSummary();
});
