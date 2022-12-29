//Array to days, dates, months and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let today = now.getDay();
let currentDate = now.getDate();
let currentMonth = now.getMonth();
let time = now.getHours();
let minutes = now.getMinutes();

//<span> display current day, current date and Month, hours and minutes
/*let showToday = document.querySelector("#currentDay");
showToday.innerHTML = days[today];*/

let showDateAndMonth = document.querySelector("#currentDate");
showDateAndMonth.innerHTML = `${currentDate} ${months[currentMonth]} `;

let showHoursandMinutes = document.querySelector("#currentTime");
showHoursandMinutes.innerHTML = `${days[today]} ${time}:${minutes}`;

//Gets temperature and City name

function input(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureAndCity);
}

let showInput = document.querySelector("#search-form");
showInput.addEventListener("submit", input);

function showTemperatureAndCity(response) {
  let city = response.data.name;
  let searchedCity = document.querySelector("#searchedCity");
  searchedCity.innerHTML = `${city}`;
  let tempCity = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = `${tempCity}°C `;
}

let city = document.querySelector("#searchedCity").textContent;
let apiKey = "8e2e3939a15348b12d5c315bd6ba15f3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${apiUrl}`).then(showTemperatureAndCity);

/*
function whereAmI(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8e2e3939a15348b12d5c315bd6ba15f3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
}
navigator.geolocation.getCurrentPosition(whereAmI);
*/

/* 
OPPGAVE

👨‍🏫 Your task
In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

🙀 Bonus point:
Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
 */
