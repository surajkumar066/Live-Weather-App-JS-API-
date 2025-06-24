// Api from = openweathermap
const apikey = "ca0196bbae1483526e92b03198d53e0a";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiurl + city + `&appid=${apikey}&units=metric`);
    const data = await response.json();

    if (response.status == 404 || data.cod == "404") {
      // If city not found
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      // Update Weather Details
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 3.6) + " km/h";

      // Change Weather Icon based on condition
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Something went wrong. Please try again later.");
  }
}

searchbtn.addEventListener("click", () => {
  const city = searchbox.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  checkWeather(city);
});
