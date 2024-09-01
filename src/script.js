function changeCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-city-input");
  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = inputElement.value;
}

let formElement = document.querySelector("#search-city-form");
formElement.addEventListener("submit", changeCity);
