let navBtn = document.querySelector("#openBtn");
let closeBtn = document.querySelector("#closeBtn");

navBtn.addEventListener("click", showNavBarItem);
closeBtn.addEventListener("click", hideNavBarItem);

function showNavBarItem() {
  document.querySelector(".nav-bar-items").classList.add("d-flex");
  document.querySelector("#closeBtn").classList.replace("d-none", "d-block");
  document.querySelector("#openBtn").classList.add("d-none");
}

function hideNavBarItem() {
  document.querySelector("#navBarItem").classList.remove("d-flex");
  document.querySelector("#closeBtn").classList.replace("d-block", "d-none");
  document.querySelector("#openBtn").classList.remove("d-none");
}
//
//
//
//
//
// ================================================================================================================ //
//
//
//
//
//
let weatherData;
let searchData;
let weatherInfo = new XMLHttpRequest();
let searchInfo = new XMLHttpRequest();

let todayTemp = document.querySelector("#dayTemp");
let todayName = document.querySelector("#dayName");
let cityName = document.querySelector("#cityName");
let todayDate = document.querySelector("#dayDate");
let dayConditionIcon = document.querySelector("#dayConditionIcon");
let dayCondition = document.querySelector("#dayCondition");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let windDirection = document.querySelector("#windDirection");

let forecast1 = document.querySelector("#forecast1");
let forecast1DateView = document.querySelector("#forecast1Date");
let forecast1Max = document.querySelector("#forecast1Max");
let forecast1Min = document.querySelector("#forecast1Min");
let forecast1Condition = document.querySelector("#forecast1Condition");
let forecast1ConditionIcon = document.querySelector("#forecast1ConditionIcon");

let forecast2 = document.querySelector("#forecast2");
let forecast2DateView = document.querySelector("#forecast2Date");
let forecast2Max = document.querySelector("#forecast2Max");
let forecast2Min = document.querySelector("#forecast2Min");
let forecast2Condition = document.querySelector("#forecast2Condition");
let forecast2ConditionIcon = document.querySelector("#forecast2ConditionIcon");

let searchInput = document.querySelector("#searchInput");
let searcBtn = document.querySelector("#searchBtn");

const WeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//
//
//
//
//
// ================================================================================================================ //
//
//
//
//
//
function getweatherData(city) {
  weatherInfo.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=2b0fb5bf20cd47c887b215713240501&q=${city}&days=3`
  );

  weatherInfo.send();

  weatherInfo.addEventListener("readystatechange", function () {
    if (weatherInfo.readyState == 4 && weatherInfo.status == 200) {
      weatherData = JSON.parse(weatherInfo.response);

      todayTemp.innerHTML = weatherData.current.temp_c + "°C";
      let currentDate = new Date(weatherData.location.localtime);
      todayDate.innerHTML = weatherData.location.localtime;
      todayName.innerHTML = WeekDays[currentDate.getDay()];
      cityName.innerHTML = weatherData.location.name;
      dayCondition.innerHTML = weatherData.current.condition.text;
      humidity.innerHTML = weatherData.current.humidity;
      windSpeed.innerHTML = weatherData.current.wind_kph;
      windDirection.innerHTML = weatherData.current.wind_dir;
      dayConditionIcon.setAttribute("src", weatherData.current.condition.icon);

      let forecast1Date = new Date(weatherData.forecast.forecastday[1].date);
      forecast1.innerHTML = WeekDays[forecast1Date.getDay()];
      forecast1DateView.innerHTML = weatherData.forecast.forecastday[1].date;
      forecast1Max.innerHTML =
        weatherData.forecast.forecastday[1].day.maxtemp_c + "°C";
      forecast1Min.innerHTML =
        weatherData.forecast.forecastday[1].day.mintemp_c + "°C";
      forecast1Condition.innerHTML =
        weatherData.forecast.forecastday[1].day.condition.text;
      forecast1ConditionIcon.setAttribute(
        "src",
        weatherData.forecast.forecastday[1].day.condition.icon
      );

      let forecast2Date = new Date(weatherData.forecast.forecastday[2].date);
      forecast2.innerHTML = WeekDays[forecast2Date.getDay()];
      forecast2DateView.innerHTML = weatherData.forecast.forecastday[2].date;
      forecast2Max.innerHTML =
        weatherData.forecast.forecastday[2].day.maxtemp_c + "°C";
      forecast2Min.innerHTML =
        weatherData.forecast.forecastday[2].day.mintemp_c + "°C";
      forecast2Condition.innerHTML =
        weatherData.forecast.forecastday[2].day.condition.text;
      forecast2ConditionIcon.setAttribute(
        "src",
        weatherData.forecast.forecastday[2].day.condition.icon
      );
    }
  });
}

getweatherData("Alex");

//
//
//
//
//
// ================================================================================================================ //
//
//
//
//
//
function searchFun(city) {
  searchInfo.open(
    "GET",
    `https://api.weatherapi.com/v1/search.json?key=2b0fb5bf20cd47c887b215713240501&q=${city}`
  );

  searchInfo.send();

  searchInfo.addEventListener("readystatechange", function () {
    if (searchInfo.readyState == 4 && searchInfo.status == 200) {
      searchData = JSON.parse(searchInfo.response);
      console.log(searchData);
    }
  });

  let currentCity = city;

  getweatherData(currentCity);
}

searcBtn.addEventListener("click", function () {
  let searchValue = searchInput.value;
  searchFun(searchValue);
  searchInput.value = "";
});
