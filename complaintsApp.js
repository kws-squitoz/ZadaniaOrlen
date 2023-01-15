const navbarToggler = document.getElementById('navbarToggler');
const navbarNav = document.getElementById('navbarNav');

navbarToggler.addEventListener('click', function() {
  if (navbarNav.style.display === 'block') {
    navbarNav.style.display = 'none';
  } else {
    navbarNav.style.display = 'block';
  }
});
// COMPLAINTS
// Get a reference to the Firebase database
var database = firebase.database();

// Get a reference to the complaints table
var complaintsTable = document.getElementById("complaintsTable");

// A function to add a complaint to the Firebase database
function addComplaint() {
  // Get the value of the input field
  const complaintMessage = document.getElementById('complaintMessage').value;

  // Clear the input field
  document.getElementById('complaintMessage').value = '';

  // Get a reference to the Realtime Database
  const database = firebase.database();

  // Save the data to the Realtime Database
  const complaintRef = database.ref('complaints');
  complaintRef.push({
    message: complaintMessage,
    date: new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric' })
  });
}
// A function to retrieve and display the complaints from the Firebase database
function displayComplaints() {
  // Get a reference to the 'complaints' child node
  var complaintsRef = database.ref('complaints');

  // Add an event listener that fires when the value of the 'complaints' child node changes
  complaintsRef.on('value', function(snapshot) {
    // Clear the complaints table
    complaintsTable.innerHTML = "";

    // Get the complaints from the snapshot
    var complaints = snapshot.val();

    // Iterate over the complaints and add them to the table
    for (var complaintKey in complaints) {
      // Get the complaint data
      var complaint = complaints[complaintKey];
      var message = complaint.message;
      var date = complaint.date;

      // Create a new row for the complaint
      var newRow = document.createElement("tr");

      // Create a new cell for the date
      var dateCell = document.createElement("td");
      dateCell.textContent = date;
      newRow.appendChild(dateCell);

      // Create a new cell for the message
      var messageCell = document.createElement("td");
      messageCell.textContent = message;
      newRow.appendChild(messageCell);

      // Add the new row to the table
      complaintsTable.insertBefore(newRow, complaintsTable.firstChild);
    }
  });
}

window.onload = displayComplaints;

// Call the displayComplaints function when the page loads
  