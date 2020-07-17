// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={YOUR API KEY}
// degrees symbol =  \xB0



const getWeather = async function (userInput = 'houston') {
  try {
    const weather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&APPID=130c4575c46f70147def89670f33034f`, {mode: 'cors'});
    const response = await weather.json();
    const weatherData = {
      city: response.city.name,
      country: response.city.country,
      currentTemp: Math.round(response.list[0].main.temp),
      highTemp: Math.round(response.list[0].main.temp_max),
      lowTemp: Math.round(response.list[0].main.temp_min),
    }
    console.log(response);
    return weatherData;
  } catch(error) {
    console.log(error);
  }
};

async function renderWeather(callback, userInput) {
  const weatherContainer = document.getElementById('weather-container');
  const cityName = document.createElement('h2');
  const date = document.createElement('p');
  const currentTemp = document.createElement('p');
  const highLowTemp = document.createElement('p');
  const weatherData = await callback(userInput);
  const dailyTempOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

  cityName.textContent = `${weatherData.city}, ${weatherData.country}`;
  date.textContent = `${new Date().toLocaleDateString(undefined, dailyTempOptions)}`;
  currentTemp.textContent = `${weatherData.currentTemp}\xB0F`;
  highLowTemp.textContent = `High: ${weatherData.highTemp}\xB0F / Low: ${weatherData.lowTemp}\xB0F`;
  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(date);
  weatherContainer.appendChild(currentTemp);
  weatherContainer.appendChild(highLowTemp);
  console.log(weatherData);
}
renderWeather(getWeather);

(function getLocation() {
  const searchBtn = document.querySelector('i');
  searchBtn.addEventListener('click', () => {
    let weatherContainer = document.getElementById('weather-container');
    while(weatherContainer.firstChild) { 
      weatherContainer.removeChild(weatherContainer.firstChild) 
    }

    let userInput = document.querySelector('input');
    renderWeather(getWeather, userInput.value);
    userInput.value = '';
  });
})();
