function displayPlaceholder(){

    let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(getInfo);
}

function displayTimeStamp(){
    let now = new Date();

    let getDay = now.getDay();
    let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = dayName[getDay];

    let hour = now.getHours();
    let minutes = now.getMinutes();
    let time = `${hour}.${minutes}`;

    let timeStap = `${day} ${time}`;
    let timeStapElement = document.querySelector(".timestamp");
    timeStapElement.innerHTML = timeStap;
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

function getInfo(response){
    //console.log(response.data);

    
    let cityNameElement = document.querySelector(".cityName");
    let descriptionElement = document.querySelector(".weatherDescription");
    let iconElement = document.querySelector("#icon");
    let focusTeperatureElement = document.querySelector(".focusTemp.temp");
    let feelsLikeElement = document.querySelector(".feelsLike");
    let windElement = document.querySelector(".wind");
    
    cityNameElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    focusTeperatureElement.innerHTML = `${Math.round(response.data.main.temp)}º`;
    iconElement.innerHTML = `http://openweathermap.org/img/wn/10d@2x.png`;
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
   
}




displayTimeStamp();
displayPlaceholder();

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", searchCity);

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", displayCurrentLocation);