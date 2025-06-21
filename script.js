//Variables
const apiKey = "5be3f787c3d673a71e0e21000912162e";
console.log(apiKey);

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  console.log(city);
  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
  }
  getWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});

//Functions
function getWeather(city) {
  weatherResult.innerHTML = "<p>Loading...</p>";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      //variables
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const countryCode = data.sys.country.toLowerCase();
      const flagUrl = `https://flagcdn.com/48x36/${countryCode}.png`;

      const temperature = data.main.temp;
      //For Up ahead

      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country} <img src="${flagUrl}" alt="Flag"></h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
      weatherResult.innerHTML = weatherHTML;
      // Change the background to the Weather
      if (temperature >= 30) {
        weatherResult.style.backgroundColor = "#ffadad";
      } else if (temperature >= 20) {
        weatherResult.style.backgroundColor = "#ffd6a5";
      } else if (temperature >= 10) {
        weatherResult.style.backgroundColor = "#caffbf";
      } else {
        weatherResult.style.backgroundColor = "#9bf6ff";
      }
    })
    .catch((error) => {
      weatherResult.innerHTML = `<p>${error.message}</p>`;
    });
}
