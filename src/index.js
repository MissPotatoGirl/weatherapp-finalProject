function displayPlaceholder() {
  let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getInfo);
  displayTimeStamp();
}

function displayTimeStamp() {
  let now = new Date();

  let getDay = now.getDay();
  let dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayName[getDay];

  let hour = now.getHours();
  let minutes = now.getMinutes();
  let time = `${hour}.${minutes}`;

  let timeStap = `${day} ${time}`;
  let timeStapElement = document.querySelector(".timestamp");
  timeStapElement.innerHTML = timeStap;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function searchCity(event) {
  event.preventDefault();
  getCityName();
}

function getCityName(position) {
  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector(".cityName");
  searchCity.innerHTML = searchInput.value;
  searchCity = searchInput.value;

  let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getInfo);
}

function displayCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getInfo);
}

function getForecast(coordinates) {
  let apiKey = `311f1f45fee82242ab4086372ab360f5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displaForcast);
}

function getInfo(response) {
  let cityNameElement = document.querySelector(".cityName");
  let descriptionElement = document.querySelector(".weatherDescription");
  let iconElement = document.querySelector("#icon");
  let focusTeperatureElement = document.querySelector(".focusTemp.temp");
  let feelsLikeElement = document.querySelector(".feelsLike");
  let windElement = document.querySelector(".wind");

  celsiusTemperature = response.data.main.temp;

  cityNameElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  focusTeperatureElement.innerHTML = `${Math.round(celsiusTemperature)}º`;
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}º`;
  windElement.innerHTML = `🍃 ${Math.round(response.data.wind.speed)} m/s`;

  if (
    response.data.weather[0].main === "Rain" ||
    response.data.weather[0].main === "Drizzle"
  ) {
    rainElement = document.querySelector(".rain");
    rainElement.innerHTML = `☔️ ${response.data.rain["1h"]} mm`;
  } else {
    rainElement = document.querySelector(".rain");
    rainElement.innerHTML = `☔️ 0 mm`;
  }

  getForecast(response.data.coord);
}

function displaForcast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="40px">
      <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">
      ${Math.round(forecastDay.temp.max)}º
      </span> 
      <span class="weather-forecast-temperature-min">
      ${Math.round(forecastDay.temp.min)}º
      </span>
      </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", searchCity);

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", displayCurrentLocation);

displayPlaceholder();
