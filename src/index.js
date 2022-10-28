function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
let apiKey = "291775067f631eae270654eeeac354a1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Mammoth Lakes&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
