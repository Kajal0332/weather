// 99655b581a89a153b7c89b853228e296
// this is api key
const temperatureField = document.querySelector(".weather_temp");
const locationField = document.querySelector(".weather_city");
const dataAndTimeField = document.querySelector(".weather_time");
const conditionField = document.querySelector(".weather_description");
const weatherIcon = document.querySelector(".weather_icon ");
const searchField = document.querySelector(".search_area");
const searchButton = document.querySelector(".search_button");
const form = document.querySelector("form");
const weatherDetails = document.querySelector(".weather_container");
const weatherHumidity = document.querySelector(".weather_humidity");
const weatherWind = document.querySelector(".weather_wind_speed");
const notFoundDetails = document.querySelector(".not-found");

// form.addEventListener("submit", searchForLocation);

let target = "Delhi";
const fetchResult = async (targetLocation) => {
  let url = ` https://api.openweathermap.org/data/2.5/weather?q=${targetLocation}&appid=99655b581a89a153b7c89b853228e296 `;

  const res = await fetch(url);

  const data = await res.json();

  console.log(data);

  if (data.cod === "404") {
    // City was not found, as indicated by a 404 status code
    notFoundDetails.classList.remove("hide");
    weatherDetails.classList.add("hide");
  } else {
    // City was found, so display the weather data
    notFoundDetails.classList.add("hide");
    weatherDetails.classList.remove("hide");

    // ... your code to update weather data (e.g., city name, temperature, etc.)
    // ...

    // This part of the code is extracting the location name and timezone information from the data
    //received from the weather API response.
    // Example: Delhi, India, UTC+5:30
    // Note: The timezone offset is calculated in milliseconds, so you need to convert it to seconds
    // before adding it to the UTC time.
    // Example: const timezone = 30 * 60 * 1000 = 18000000
    // Example: const localTime = new Date(utcTime.getTime() + timezone);

    let timezone = data.timezone;
    const utcTime = new Date();
    let localTime = new Date(
      utcTime.getTime() +
        timezone * 1000 +
        utcTime.getTimezoneOffset() * 60 * 1000
    );
    console.log(localTime);

    // city name will be show
    let locationName = data.name;
    console.log(locationName);

    // to show humidity of weather 
    let weatherhumidity = data.main.humidity;
    console.log(weatherhumidity);

    // to show wind speed of weather 
    let weatherWindSpeed = data.wind.speed;
    console.log(weatherWindSpeed);

    /* The code snippet you provided is extracting the weather icon information from the data object
 received from the weather API response. Here's a breakdown of what each line is doing: */
    let weatherIcon = data.weather[0].icon;
    let weatherIconImg = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; // Example: https://openweathermap.org/img/wn
    console.log(weatherIconImg);

    // to show the weather temperature.
    let kelvin = data.main.temp;
    let temp = Math.round(kelvin - 273.15); // Output: 29.8 °C
    console.log(temp);

    //   to show weather description.
    let condition = data.weather[0].description;
    console.log(condition);
    updatDetails(temp, locationName, localTime, condition, weatherIconImg, weatherhumidity, weatherWindSpeed);
  }
};

// The `updatDetails` function is updating the content of specific HTML elements with the
//provided data. Here's what each line of the function is doing:
function updatDetails(
  temp,
  locationName,
  localTime,
  condition,
  weatherIconImg, weatherhumidity, weatherWindSpeed
) {
  weatherIconImg.innerText = weatherIconImg;
  temperatureField.innerText = `${temp} °C`;
  locationField.innerText = locationName;
  weatherIcon.src = weatherIconImg;
  weatherHumidity.innerText = `Humidity ${weatherhumidity}%`;
  weatherWind.innerText = `Wind Speed ${weatherWindSpeed} m/s`;
  // Formatting the date to show only the day of the week
  let dayOfWeek = localTime.toLocaleDateString("en-US", { weekday: "long" });

  // Formatting the time to show hour, minute, and AM/PM
  let formattedTime = localTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Ensures it displays with AM/PM
  });
  // Update the HTML element with the formatted time and day
  dataAndTimeField.innerText = `${dayOfWeek}, ${formattedTime}`;
  //   dataAndTimeField.innerText = localTime;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();

  target = searchField.value;

  fetchResult(target);
  // Add this line to clear the search field after the search
  searchField.value = "";
}
form.addEventListener("submit", searchForLocation);

fetchResult(target);
