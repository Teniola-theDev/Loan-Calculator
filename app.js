// Grab Ui elements and set var
document.getElementById('loan-form').addEventListener('submit', function (e) {
  //show loader
  document.getElementById('loading').style.display = 'block';
  // hide results
  document.getElementById('results').style.display = 'none';

  // calculate results
  // calculateResults();
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});
// calculate the results function
function calculateResults() {
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
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers.');
  }
}
function showError(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 2500);
}
function clearError() {
  document.querySelector('.alert').remove();
}

// set event listeners
