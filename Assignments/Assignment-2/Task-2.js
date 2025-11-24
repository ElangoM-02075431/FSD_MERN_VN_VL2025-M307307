const marks = (mark, age) => {
  if (typeof mark !== "number" || isNaN(mark)) {
    console.log("Please enter a valid number for marks (0-100).");
    return;
  }
  if (mark < 0 || mark > 100) {
    console.log("Please enter your marks from 0 - 100 only");
    return;
  }

  switch (true) {
    case mark >= 85:
      console.log("You Got A Grade");
      break;
    case mark >= 75:
      console.log("You Got B Grade");
      break;
    case mark >= 65:
      console.log("You Got C Grade");
      break;
    case mark >= 35:
      console.log("You Got F Grade");
      break;
    default:
      console.log("Sorry You Got D Grade and You Are Fail");
      break;
  }
  if (age >= 18) {
    console.log(`Your are a adult and your age is ${age}`);
  } else {
    console.log(`Your are a minor and your age is ${age}`);
  }
};
marks(65, 18); // Example usage
