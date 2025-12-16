document.addEventListener("DOMContentLoaded", function () {

    const seats = document.querySelectorAll(".seat:not(.occupied)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const seatList = document.getElementById("seatList");
    const movieSelect = document.getElementById("movie");
    const timeSelect = document.getElementById("time");

    let ticketPrice;

    /* ---------- RESTORE DATA ---------- */

    const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const savedMovie = localStorage.getItem("selectedMovie");
    const savedTime = localStorage.getItem("selectedTime");

    if (savedMovie) {
        movieSelect.value = savedMovie;
    }

    if (savedTime) {
        timeSelect.value = savedTime;
    }

    ticketPrice = +movieSelect.value;

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
        localStorage.setItem("selectedMovie", movieSelect.value);
        updateSummary();
    });

    timeSelect.addEventListener("change", () => {
        localStorage.setItem("selectedTime", timeSelect.value);
    });

    function saveSeats() {
        const selected = document.querySelectorAll(".seat.selected");
        const ids = [...selected].map(seat => seat.dataset.seat);
        localStorage.setItem("selectedSeats", JSON.stringify(ids));
    }

    function updateSummary() {
        const selected = document.querySelectorAll(".seat.selected");
        count.innerText = selected.length;
        total.innerText = selected.length * ticketPrice;

        const names = [...selected].map(seat => seat.dataset.seat);
        seatList.innerText = names.length ? names.join(", ") : "None";
    }

    updateSummary();
});
