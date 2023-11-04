import { checkAuthentication, logoutUser } from "./utils.js";

checkAuthentication();
// Get user data from local storage
const user = JSON.parse(localStorage.getItem("user"));
console.log("user: ", user);

// Display username in the header
const usernameElement = document.getElementById("username");
usernameElement.textContent = user.username;

// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function () {
  logoutUser();
});

const flightsDatabase = {
  flights: [
    {
      from: "Tel aviv",
      to: "amsterdam",
      price: 40,
      dates: [
        { depart: new Date("24.11.2023") },
        { return: new Date("1.12.2023") },
      ],
    },
    {
      from: "Tel aviv",
      to: "london",
      price: 75,
      dates: [
        { depart: new Date("28.11.2023") },
        { return: new Date("12.12.2023") },
      ],
    },
    {
      from: "Athens",
      to: "Prague",
      price: 95,
      dates: [
        { depart: new Date("28.11.2023") },
        { return: new Date("12.12.2023") },
      ],
    },
    {
      from: "Berlin",
      to: "Prague",
      price: 22,
      dates: [
        { depart: new Date("28.11.2023") },
        { return: new Date("12.12.2023") },
      ],
    },
    {
      from: "London",
      to: "Berlin",
      price: 100,
      dates: [
        { depart: new Date("28.11.2023") },
        { return: new Date("12.12.2023") },
      ],
    },
  ],
  add() {
    //todo
  },
  /** Retrieves flights with the provided destination */
  searchByDestination(destination) {
    return this.flights.filter((f) =>
      f.to.toLowerCase().includes(destination.toLowerCase())
    );
  },
};

localStorage.setItem("flights", JSON.stringify(flightsDatabase.flights));
function sortFlightsByPriceAscending(flights) {
  return [...flights].sort((a, b) => a.price - b.price);
}

let sorted = sortFlightsByPriceAscending(flightsDatabase.flights);
console.log("sorted: ", sorted);

const flightsContainer = document.getElementById("flightsContainer");

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function createFlightCard(flight) {
  const card = document.createElement("div");
  card.classList.add("flight-card");

  const heading = document.createElement("h2");
  heading.textContent = "Flight Details";
  card.appendChild(heading);

  const createParagraph = (label, text) => {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<strong>${label}:</strong> ${text}`;
    return paragraph;
  };

  card.appendChild(createParagraph("From", flight.from));
  card.appendChild(createParagraph("To", flight.to));
  card.appendChild(createParagraph("Price", `$${flight.price}`));
  card.appendChild(
    createParagraph(
      "Departure",
      formatDate(flight.dates.find((date) => date.depart).depart)
    )
  );
  card.appendChild(
    createParagraph(
      "Return",
      formatDate(flight.dates.find((date) => date.return).return)
    )
  );

  return card;
}

function displayFlights(flightList) {
  flightsContainer.innerHTML = "";
  flightList.forEach((flight) => {
    const card = createFlightCard(flight);
    flightsContainer.appendChild(card);
  });
}
displayFlights(flightsDatabase.flights);

const sortButton = document.querySelector("#sortButton");
const clearSortButton = document.querySelector("#clearSortButton");
const searchForm = document.querySelector("#searchForm");

sortButton.addEventListener("click", (e) => {
  displayFlights(sortFlightsByPriceAscending(flightsDatabase.flights));
});
clearSortButton.addEventListener("click", (e) => {
  displayFlights(flightsDatabase.flights);
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = searchForm.elements.search.value;
  console.log("searchText: ", searchText);

  if (
    typeof searchText === "string" &&
    searchText !== null &&
    searchText.length !== 0
  )
    displayFlights(flightsDatabase.searchByDestination(searchText));
});

// flightsDatabase.searchByDestination("pra");
