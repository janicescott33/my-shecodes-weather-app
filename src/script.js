function changeWeatherInfo(response) {
  let cityElement = document.querySelector("#weather-city");
  let dayTimeElement = document.querySelector("#day-time");
  let dayTime = new Date(response.data.time * 1000);
  let conditionElement = document.querySelector("#weather-condition");
  let condition = response.data.condition.description;
  let humidityElement = document.querySelector("#weather-humidity");
  let humidity = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#weather-wind");
  let wind = `${response.data.wind.speed}km/h`;
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let iconElement = document.querySelector("#weather-icon");
  let icon = `<img src="${response.data.condition.icon_url}"/>`;

  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  dayTimeElement.innerHTML = formatDayTime(dayTime);
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = icon;

  getForecast(response.data.city);
}

function formatDayTime(dayTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday,",
    "Saturday",
  ];
  let day = days[dayTime.getDay()];
  let hours = dayTime.getHours();
  let minutes = dayTime.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}, `;
}

function changeCity(city) {
  let apiKey = "b086a5a9f70a4d4df35ot83444fbbf55";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(changeWeatherInfo);
}

function formatDay(timestamp) {
  let dayOnly = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[dayOnly.getDay()];
}

function getForecast(city) {
  let apiKey = "b086a5a9f70a4d4df35ot83444fbbf55";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-daily">
    <div class="weather-forecast-day">${formatDay(day.time)}</div>
    <div >
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
    </div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
    <strong>${Math.round(day.temperature.maximum)}º</strong>
    </div>
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}º</div>
    </div>
    </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function handleSearch(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-city-input");
  changeCity(inputElement.value);
}

let formElement = document.querySelector("#search-city-form");
formElement.addEventListener("submit", handleSearch);

changeCity("London");
