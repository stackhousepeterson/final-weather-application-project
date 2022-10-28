function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = `<div class="row">
    <div class="col-2">
      <div clas="weather-forecast-date">Friday</div>
      <img
        src="http://openweathermap.org/img/wn/02d@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max"> 67° </span>
        <span class="weather-forecast-temperature-min"> 45° </span>
      </div>
    </div>
  </div>`;
}

function displayForecast(response) {
  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(
      response.data.temperature.current
    );

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time * 1000);

    console.log({ response: response.data });
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coordinates);
  }
  console.log({ response: response.data });
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);

  function search(city) {
    let apiKey = `3c274atab4f09c0de0091b3boc3d9fc0`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }

  displayForecast();
  search("New York");

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
}
