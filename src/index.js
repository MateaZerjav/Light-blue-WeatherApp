function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#Wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icons");

  temperatureElement.innerHTML = Math.round(temperature);

  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img
                        src="${response.data.condition.icon_url}"
                        class="weather-app-emoji"
                      />`;
}
function formatDate(date) {
  let min = date.getMinutes();
  let hours = date.getHours();

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = week[date.getDay()];

  if (min < 10) {
    min = `0${min}`;
  }

  return `${day}, ${hours}:${min}`;
}
function searchCity(city) {
  let apiKey = "636ft3f4ca7b895f0259dd71a1354d0o";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}
function searchHandle(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");

  searchCity(searchInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchHandle);
searchCity("Zagreb");
