document.addEventListener("DOMContentLoaded", function () {

    const seats = document.querySelectorAll(".theater .seat");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const seatList = document.getElementById("seatList");
    const movieSelect = document.getElementById("movie");
    const timeSelect = document.getElementById("time");
    const confirmBtn = document.getElementById("confirmBtn");
    const message = document.getElementById("message");

    let ticketPrice = +movieSelect.value;

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    const savedMovie = localStorage.getItem("selectedMovie");
    const savedTime = localStorage.getItem("selectedTime");

    if (savedMovie) movieSelect.value = savedMovie;
    if (savedTime) timeSelect.value = savedTime;

    ticketPrice = +movieSelect.value;

    // Initialize seats
    seats.forEach(seat => {

        if (bookedSeats.includes(seat.dataset.seat)) {
            seat.classList.add("occupied");
        }

        if (
            selectedSeats.includes(seat.dataset.seat) &&
            !seat.classList.contains("occupied")
        ) {
            seat.classList.add("selected");
        }

        seat.addEventListener("click", () => {
            if (seat.classList.contains("occupied")) return;

            seat.classList.toggle("selected");
            saveSelectedSeats();
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

    confirmBtn.addEventListener("click", () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        selectedSeats.forEach(seatId => {
            bookedSeats.push(seatId);

            const seat = document.querySelector(
                `.theater .seat[data-seat='${seatId}']`
            );

            seat.classList.remove("selected");
            seat.classList.add("occupied");
            seat.replaceWith(seat.cloneNode(true));
        });

        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
        localStorage.removeItem("selectedSeats");

        selectedSeats = [];
        updateSummary();

        message.innerText =
            `Booking confirmed for ${movieSelect.options[movieSelect.selectedIndex].text} at ${timeSelect.value}`;
    });

    function saveSelectedSeats() {
        selectedSeats = [...document.querySelectorAll(".theater .seat.selected")]
            .map(seat => seat.dataset.seat);

        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    }

    function updateSummary() {
        const selected = document.querySelectorAll(".theater .seat.selected");

        count.innerText = selected.length;
        total.innerText = selected.length * ticketPrice;

        const names = [...selected].map(seat => seat.dataset.seat);
        seatList.innerText = names.length ? names.join(", ") : "None";
    }

    updateSummary();
});
