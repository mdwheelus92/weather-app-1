function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  width="50"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-high">18° </span
                  ><span class="weather-forecast-temp-low">12°</span>
                </div>
              `;
    forecastHTML = forecastHTML + "</div>";
    forecastElement.innerHTML = forecastHTML;
  });
}
function getForecast(coordinates) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#day");
  let iconElement = document.querySelector("#icon");
  let currentConditions = response.data.weather[0].icon;

  farenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentConditions}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function submitHandle(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemp = ((farenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

function revert(event) {
  event.preventDefault();
  let FarenheitTemperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  FarenheitTemperatureElement.innerHTML = Math.round(farenheitTemperature);
}
search("Mammoth Lakes");

let farenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandle);

let celciusLink = document.querySelector("#cel");
celciusLink.addEventListener("click", showCelcius);

let farenheitLink = document.querySelector("#default");
farenheitLink.addEventListener("click", revert);
