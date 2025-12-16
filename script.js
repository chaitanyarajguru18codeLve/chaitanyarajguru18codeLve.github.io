document.addEventListener("DOMContentLoaded", () => {

    const seats = document.querySelectorAll(".seat:not(.occupied)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const seatList = document.getElementById("seatList");
    const movieSelect = document.getElementById("movie");
    const timeSelect = document.getElementById("time");

    let ticketPrice = +movieSelect.value;

    /* ---------------- RESTORE SAVED DATA ---------------- */

    const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const savedMovie = localStorage.getItem("selectedMovie");
    const savedTime = localStorage.getItem("selectedTime");

    if (savedMovie) {
        movieSelect.value = savedMovie;
        ticketPrice = +savedMovie;
    }

    if (savedTime) {
        timeSelect.value = savedTime;
    }

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

    /* ---------------- EVENT LISTENERS ---------------- */

    movieSelect.addEventListener("change", () => {
        ticketPrice = +movieSelect.value;
        localStorage.setItem("selectedMovie", movieSelect.value);
        updateSummary();
    });

    timeSelect.addEventListener("change", () => {
        localStorage.setItem("selectedTime", timeSelect.value);
    });

    /* ---------------- FUNCTIONS ---------------- */

    function saveSeats() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        const seatIds = [...selectedSeats].map(seat => seat.dataset.seat);
        localStorage.setItem("selectedSeats", JSON.stringify(seatIds));
    }

    function updateSummary() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        count.innerText = selectedSeats.length;
        total.innerText = selectedSeats.length * ticketPrice;

        const seatNames = [...selectedSeats].map(seat => seat.dataset.seat);
        seatList.innerText = seatNames.length ? seatNames.join(", ") : "None";
    }

    updateSummary();
});
