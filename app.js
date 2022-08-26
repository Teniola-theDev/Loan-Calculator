// Grab Ui elements and set var
const title = document.title;

document.getElementById('loan-form').addEventListener('submit', calculateResults);
// calculate the results function
function calculateResults(e) {
  console.log('clicked');
  //console.log('clicked');
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // set formula
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.disabled = false;
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // monthlyPayment.value = monthly.toFixed(2);
    // totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    // totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // title = monthlyPayment.value;
    // console.log(title);
  } else {
    showError('Please check your numbers.');
  }
  e.preventDefault();
}
function showError(error) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 2500);
}
function clearError() {
  document.querySelector('.alert').remove();
}

// set event listeners
