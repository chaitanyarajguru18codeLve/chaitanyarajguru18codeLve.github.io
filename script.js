document.addEventListener("DOMContentLoaded", function () {

    const seats = document.querySelectorAll(".theater .row .seat");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const seatList = document.getElementById("seatList");
    const movieSelect = document.getElementById("movie");
    const timeSelect = document.getElementById("time");
    const confirmBtn = document.getElementById("confirmBtn");
    const message = document.getElementById("message");

    let ticketPrice = +movieSelect.value;

    // Load saved data
    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const savedMovie = localStorage.getItem("selectedMovie");
    const savedTime = localStorage.getItem("selectedTime");

    if (savedMovie) movieSelect.value = savedMovie;
    if (savedTime) timeSelect.value = savedTime;

    ticketPrice = +movieSelect.value;

    // Initialize seats
    seats.forEach(seat => {
        // Restore booked seats
        if (bookedSeats.includes(seat.dataset.seat)) {
            seat.classList.add("occupied");
        }

        // Restore selected seats
        if (selectedSeats.includes(seat.dataset.seat) && !seat.classList.contains("occupied")) {
            seat.classList.add("selected");
        }

        // Click event
        seat.addEventListener("click", () => {
            if (seat.classList.contains("occupied")) return;
            seat.classList.toggle("selected");
            saveSelectedSeats();
            updateSummary();
        });
    });

    // Movie & time events
    movieSelect.addEventListener("change", () => {
        ticketPrice = +movieSelect.value;
        localStorage.setItem("selectedMovie", movieSelect.value);
        updateSummary();
    });

    timeSelect.addEventListener("change", () => {
        localStorage.setItem("selectedTime", timeSelect.value);
    });

    // Confirm booking
    confirmBtn.addEventListener("click", () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        selectedSeats.forEach(seatId => {
            bookedSeats.push(seatId);

            const bookedSeat = document.querySelector(`[data-seat='${seatId}']`);
            bookedSeat.classList.remove("selected");
            bookedSeat.classList.add("occupied");

            // Remove click listener from newly booked seat
            bookedSeat.replaceWith(bookedSeat.cloneNode(true));
        });

        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
        localStorage.removeItem("selectedSeats");

        selectedSeats = [];
        updateSummary();

        message.innerText =
            `Booking confirmed for ${movieSelect.options[movieSelect.selectedIndex].text} at ${timeSelect.value}`;
    });

    // Functions
    function saveSelectedSeats() {
        selectedSeats = [...document.querySelectorAll(".seat.selected")]
            .map(seat => seat.dataset.seat);
        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    }

    function updateSummary() {
        count.innerText = selectedSeats.length;
        total.innerText = selectedSeats.length * ticketPrice;
        seatList.innerText = selectedSeats.length ? selectedSeats.join(", ") : "None";
    }

    updateSummary();
});
