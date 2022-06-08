let currentDate = new Date();

let date = document.querySelector("#current-date");

function showDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];

  let hours = currentDate.getHours();

  let minutes = currentDate.getMinutes();

  if (hours < 10) {
    date.textContent = `${day} 0${hours}:${minutes}`;
  } else if (minutes < 10) {
    date.textContent = `${day} ${hours}:0${minutes}`;
  } else {
    date.textContent = `${day} ${hours}:${minutes}`;
  }
}
showDate();

let form = document.querySelector("#search-form");

let currentCity = document.querySelector("#current-city");

let sourceApi = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let apiKey = "2a6e140dffa5532ccd19daa46590a3bb";
function showTemperature(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature}`;
  let weatherDescription = document.querySelector("#weather-description");
  let descriptionData = response.data.weather[0].description;
  console.log(descriptionData);
  weatherDescription.innerHTML = descriptionData;
}

function showWeather(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#city-input");
  currentCity.innerHTML = `${searchedCity.value}`;
  let url = `${sourceApi}q=${searchedCity.value}&appid=${apiKey}&&units=${units}`;
  axios.get(url).then(showTemperature);
  searchedCity.value = "";
}

form.addEventListener("submit", showWeather);

function handleClick() {
  function showCurrentLocationWeather(response) {
    console.log(response);
    let currentTemperature = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#current-temperature");
    temperature.innerHTML = `${currentTemperature}`;
    let weatherDescription = document.querySelector("#weather-description");
    let descriptionData = response.data.weather[0].description;
    console.log(descriptionData);
    weatherDescription.innerHTML = descriptionData;
    currentCity.innerHTML = `${response.data.name}`;
  }

  function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `${sourceApi}lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
    axios.get(url).then(showCurrentLocationWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

handleClick();
let buttonCurrent = document.querySelector("#search-current-location");
buttonCurrent.addEventListener("click", handleClick);
