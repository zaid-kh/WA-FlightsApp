// flights.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user: ", user);

  // Display the username in the header
  const usernameElement = document.getElementById("username");
  usernameElement.textContent = user.username;

  // Logout functionality
  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function () {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Redirect the user back to the login page
    window.location.href = "index.html";
  });

  // Implement flight-related functionalities here (e.g., displaying flights, searching, etc.)
});
