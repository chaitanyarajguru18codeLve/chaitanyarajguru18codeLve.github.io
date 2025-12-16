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

    const seatPrices = {
        silver: 150,
        gold: 200,
        recliner: 300
    };

    let selectedSeats = [];
    let allBookings = JSON.parse(localStorage.getItem("allBookings")) || {};

    function getShowKey() {
        return movie.value + "_" + time.value;
    }

    function loadSeatsForShow() {
        const showKey = getShowKey();
        const bookedSeats = allBookings[showKey] || [];

        seats.forEach(seat => {
            seat.classList.remove("selected", "occupied");
            if (bookedSeats.includes(seat.dataset.seat)) {
                seat.classList.add("occupied");
            }
        });

        selectedSeats = [];
        updateSummary();
    }

    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            if (seat.classList.contains("occupied")) return;

            seat.classList.toggle("selected");

            selectedSeats = [...document.querySelectorAll(".theater .seat.selected")]
                .map(seat => seat.dataset.seat);

            updateSummary();
        });
    });

    movie.addEventListener("change", loadSeatsForShow);
    time.addEventListener("change", loadSeatsForShow);

    confirmBtn.addEventListener("click", () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        const showKey = getShowKey();

        if (!allBookings[showKey]) allBookings[showKey] = [];

        selectedSeats.forEach(seat => {
            if (!allBookings[showKey].includes(seat)) {
                allBookings[showKey].push(seat);
            }
        });

        localStorage.setItem("allBookings", JSON.stringify(allBookings));

        loadSeatsForShow();

        message.innerText =
            `Booking confirmed for ${movie.value} at ${time.value}`;
    });

    resetBtn.addEventListener("click", () => {
        if (!confirm("Admin: Clear ALL bookings for ALL shows?")) return;

        localStorage.removeItem("allBookings");
        allBookings = {};
        loadSeatsForShow();
        message.innerText = "All bookings cleared.";
    });

    function updateSummary() {
        let totalPrice = 0;

        selectedSeats.forEach(seatId => {
            const seat = document.querySelector(
                `.theater .seat[data-seat='${seatId}']`
            );
            totalPrice += seatPrices[seat.dataset.type];
        });

        count.innerText = selectedSeats.length;
        total.innerText = totalPrice;
        seatList.innerText =
            selectedSeats.length ? selectedSeats.join(", ") : "None";
    }

    loadSeatsForShow();
});
