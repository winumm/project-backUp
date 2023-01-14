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
showDateAndMonth.innerHTML = ` ${days[today]} ${currentDate} ${months[currentMonth]} `;

let showHoursandMinutes = document.querySelector("#currentTime");
showHoursandMinutes.innerHTML = ` ${time}:${minutes}`;

//Forecast for next week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecastWholeWeek");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weekday">${formatDay(forecastday.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastday.weather[0].icon
          }@2x.png"
          alt=""
          class=""
          id=""
          width="40"
        />
      <div class="tempLowHighForecast">
          <span class="maxStyle">${Math.round(forecastday.temp.max)}°</span>
          <span class="minStyle"> ${Math.round(forecastday.temp.min)}°</span>
      </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Gets temperature and City name
let apiKey = "8e2e3939a15348b12d5c315bd6ba15f3";

function input(event) {
  event.preventDefault();
  let city = document.getElementById("search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureAndCity);
}

function getForecast(coordinates) {
  let appId = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appId}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperatureAndCity(response) {
  let cityElement = document.querySelector("#searchedCity");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let weatherCondition = document.querySelector("#discription");
  weatherCondition.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function whereAmI(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8e2e3939a15348b12d5c315bd6ba15f3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${url}`).then(showTemperatureAndCity);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemprature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemprature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let showInput = document.getElementById("search");
showInput.addEventListener("submit", input);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let myLocation = document.getElementById("locationButtonId");
myLocation.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(whereAmI)
);
