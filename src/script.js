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
let apiKey = "8e2e3939a15348b12d5c315bd6ba15f3";

function input(event) {
  event.preventDefault();
  let city = document.getElementById("search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureAndCity);
}

let showInput = document.getElementById("search");
showInput.addEventListener("submit", input);

function showTemperatureAndCity(response) {
  let cityElement = document.querySelector("#searchedCity");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let weatherCondition = document.querySelector("#discription");
  weatherCondition.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = response.data.wind.speed;
  console.log(response.data.wind.speed);
}

function whereAmI(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8e2e3939a15348b12d5c315bd6ba15f3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
}
navigator.geolocation.getCurrentPosition(whereAmI);
