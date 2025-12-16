document.addEventListener("DOMContentLoaded", () => {

    const seats = document.querySelectorAll(".theater .seat");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const seatList = document.getElementById("seatList");
    const movie = document.getElementById("movie");
    const time = document.getElementById("time");
    const confirmBtn = document.getElementById("confirmBtn");
    const resetBtn = document.getElementById("resetBtn");
    const message = document.getElementById("message");

    let ticketPrice = +movie.value;

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    // Initialize theater seats only
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

    movie.addEventListener("change", () => {
        ticketPrice = +movie.value;
        updateSummary();
    });

    confirmBtn.addEventListener("click", () => {

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        selectedSeats.forEach(id => {

            if (!bookedSeats.includes(id)) {
                bookedSeats.push(id);
            }

            const seat = document.querySelector(
                `.theater .seat[data-seat='${id}']`
            );

            seat.classList.remove("selected");
            seat.classList.add("occupied");
        });

        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
        localStorage.removeItem("selectedSeats");

        selectedSeats = [];
        updateSummary();

        message.innerText =
            `Booking confirmed for ${movie.options[movie.selectedIndex].text} at ${time.value}`;
    });

    resetBtn.addEventListener("click", () => {

        if (!confirm("Admin: Clear all bookings?")) return;

        localStorage.clear();

        seats.forEach(seat => {
            seat.classList.remove("selected", "occupied");
        });

        selectedSeats = [];
        bookedSeats = [];

        updateSummary();
        message.innerText = "All bookings reset.";
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
