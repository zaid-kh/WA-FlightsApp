const userForm = document.querySelector("#userForm");
let user = {
  username: "",
  email: "",
  password: "",
};
/** Displays a certain error message related to an input field */
function showError(field, message) {
  const errorElement = document.getElementById(field.id + "Error");
  errorElement.innerText = message;
  field.classList.add("error");
  errorElement.classList.add("error-message");
}

/** Reverse any effects done by the showError() function */
function removeError(field) {
  const errorElement = document.getElementById(field.id + "Error");
  errorElement.innerText = "";
  field.classList.remove("error");
  errorElement.classList.remove("error-message");
}

function checkEmail(email) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
}
function checkPassword(password) {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  return passwordRegex.test(password);
}
let isValid = true;

userForm.addEventListener("input", (e) => {
  isValid = true;

  // binding form inputs
  const username = userForm.elements.username;
  const email = userForm.elements.email;
  const password = userForm.elements.password;
  const isAdmin = userForm.elements.isAdmin;

  // validate username,, length > 3 characters
  if (username.value.length < 3) {
    showError(username, "name must be at least 3 characters long.");
    isValid = false;
  } else removeError(username);

  // validate email
  if (!checkEmail(email.value)) {
    showError(email, "Please enter a valid email.");
    isValid = false;
  } else removeError(email);

  // validate password
  if (!checkPassword(password.value)) {
    showError(
      password,
      "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character."
    );
    isValid = false;
  } else removeError(password);

  user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isValid) {
    console.log("logIn details valid");
    user.admin = isAdmin.checked;
    console.log("isAdmin: ", isAdmin.checked);
    console.log("user: ", user);
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(user));
    // Redirect to the flights page after successful login
    window.location.href = "flights.html";
  } else {
    // Show error message to the user
    alert("Invalid input. Please check your details.");
  }
});
