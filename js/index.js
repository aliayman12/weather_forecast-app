var searchInput = document.getElementById("searchInput");

var searchBtn = document.getElementById("searchBtn");

let todayName = document.getElementById("todayName");
let todayDateNum = document.getElementById("todayDateNum");
let monthName = document.getElementById("monthName");
let cityName = document.getElementById("cityName");
let countryName = document.getElementById("countryName");
let todayTemp = document.getElementById("todayTemp");
let conditionImg = document.getElementById("conditionImg");
let todayCond = document.getElementById("todayCond");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");

let nextDay = document.getElementsByClassName("nextDay");
let nextDayCondImage = document.getElementsByClassName("nextDayCondImage");
let maxTemp = document.getElementsByClassName("maxTemp");
let minTemp = document.getElementsByClassName("minTemp");
let NextDayCond = document.getElementsByClassName("NextDayCond");

async function getWeatherData(cityName) {
  let weatherRes = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`
  );
  let data = await weatherRes.json();
  return data;
}

function displayTodayData(data) {
  let date = new Date();
  todayName.innerHTML = date.toLocaleDateString("en-us", { weekday: "long" });
  todayDateNum.innerHTML = date.getDate();
  monthName.innerHTML = date.toLocaleDateString("en-us", { month: "short" });
  cityName.innerHTML = data.location.name;
  countryName.innerHTML = `(${data.location.country})`;
  todayTemp.innerHTML = data.current.temp_c + "°C";
  conditionImg.setAttribute("src", data.current.condition.icon);
  todayCond.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  windDirection.innerHTML = data.current.wind_dir;
}

function displayNextDays(data) {
  for (let index = 0; index < data.forecast.forecastday.length; index++) {
    let date = new Date(data.forecast.forecastday[index + 1].date);

    nextDay[index].innerHTML = date.toLocaleDateString("en-us", {
      weekday: "long",
    });

    nextDayCondImage[index].setAttribute(
      "src",
      data.forecast.forecastday[index + 1].day.condition.icon
    );
    maxTemp[index].innerHTML =
      data.forecast.forecastday[index + 1].day.maxtemp_c + "°C";
    minTemp[index].innerHTML =
      data.forecast.forecastday[index + 1].day.mintemp_c + "°C";
    NextDayCond[index].innerHTML =
      data.forecast.forecastday[index + 1].day.condition.text;
  }
}

async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city);

  displayTodayData(weatherData);
  displayNextDays(weatherData);
}

startApp();

searchBtn.addEventListener("click", function () {
  startApp(searchInput.value);
});
