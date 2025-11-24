function calculateTotalExpenses(expenses) {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i];
  }
  console.log("Total money spent: ₹" + total);
}

let monthlyExpenses = [2000, 1500, 3500, 4000];
calculateTotalExpenses(monthlyExpenses);
