function changeWeatherInfo(response) {
  let cityElement = document.querySelector("#weather-city");
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function findCity(city) {
  let apiKey = "b086a5a9f70a4d4df35ot83444fbbf55";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(changeWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  findCity(searchInput.value);
}

let formElement = document.querySelector("#search-city-form");
formElement.addEventListener("submit", handleSubmit);
