let totalSeats = 120;
let bookedSeats = 78;

let availableSeats = totalSeats - bookedSeats;

let status = 
    availableSeats < 20 ? "Almost Full" :
    availableSeats <= 60 ? "Moderate Availability" :
    "Plenty of Seats Available";

console.log("Available Seats:", availableSeats);
console.log("Status:", status);
