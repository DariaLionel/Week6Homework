let apiKey = "3c3o3b2a38af40c0a5007113f8te1414";

function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  fetchWeather(city);
}

function fetchWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather).catch(showError);
}

function updateWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperatureUnitElement = document.querySelector(
    ".current-temperature-unit"
  );
  let detailsElement = document.querySelector(".current-details");

  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let weatherDescription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  detailsElement.innerHTML = `
    ${formatDate(new Date())}, ${weatherDescription} <br />
    Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>
  `;
}

function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[date.getDay()];
  return `${formattedDay} ${hours}:${minutes}`;
}

function showError(error) {
  alert(
    "Unable to retrieve weather data. Please check the city name and try again."
  );
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());
