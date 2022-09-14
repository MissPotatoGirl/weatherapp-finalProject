function displayTemperature(response){
    console.log(response.data);

    let cityName = response.data.name;
    let cityNameElement = document.querySelector(".cityName");
    cityNameElement.innerHTML = `${cityName}`;
    
    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector(".weatherDescription");
    descriptionElement.innerHTML = description;
    
    let focusTeperature = Math.round(response.data.main.temp);
    let focusTeperatureElement = document.querySelector(".focusTemp.temp");
    focusTeperatureElement.innerHTML = `${focusTeperature}º`;

    let feelsLike = Math.round(response.data.main.feels_like);
    let feelsLikeElement = document.querySelector(".feelsLike");
    feelsLikeElement.innerHTML = `${feelsLike}º`;

    if (
        response.data.weather[0].main === "Rain" ||
        response.data.weather[0].main === "Drizzle"
      ) {
        let rain = response.data.rain["1h"];
        rainElement = document.querySelector(".rain");
        rainElement.innerHTML = `☔️ ${rain} mm`;
      } else {
        let rain = "0";
        rainElement = document.querySelector(".rain");
        rainElement.innerHTML = `☔️ ${rain} mm`;
      }
    
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector(".wind");
    windElement.innerHTML = `🍃 ${wind} m/s`;
}

let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);


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

displayTimeStamp();