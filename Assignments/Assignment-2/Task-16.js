function placeOrder(callback) {
  setTimeout(() => {
    console.log("Order placed");
    callback();
  }, 1000); // 1 second delay
}

function cookFood(callback) {
  setTimeout(() => {
    console.log("Food cooking");
    callback();
  }, 2000); // 2 second delay
}

function deliverFood() {
  setTimeout(() => {
    console.log("Food delivered");
  }, 1500); // 1.5 second delay
}

// Execution in sequence
placeOrder(() => {
  cookFood(() => {
    deliverFood();
  });
});
