// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={YOUR API KEY}
// degrees symbol =  \xB0

const weatherContainer = document.getElementById('weather-container');
const cityName = document.createElement('h2');

async function getWeather() {
  try {
    const weather = await fetch('http://api.openweathermap.org/data/2.5/forecast?zip=77656&units=imperial&APPID=130c4575c46f70147def89670f33034f', {mode: 'cors'});
    const response = await weather.json();
    cityName.textContent = `${response.city.name}, ${response.city.country}`;
    weatherContainer.appendChild(cityName);
    console.log(response);
  } catch(error) {
    console.log(error);
  }
}

getWeather();

