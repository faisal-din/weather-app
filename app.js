const apiKey = '51df19a00fmsh524d9de0219ac7dp12fba3jsn8cad447812bc';
const baseURL = 'https://weatherapi-com.p.rapidapi.com/current.json';

let weatherData = document.querySelector('.weather-data');
let errorMsg = document.querySelector('.err-msg');
let searchInput = document.querySelector('#search-input');
let searchBtn = document.querySelector('#search-btn');
let weatherIcon = document.querySelector('.weather-icon');
let temp = document.querySelector('.temp');
let weatherCond = document.querySelector('.weather-cond');
let cityName = document.querySelector('.location');
let humidity = document.querySelector('.humidity');
let windSpeed = document.querySelector('.wind-speed');

const getWeather = async (city) => {
  let url = `${baseURL}?q=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    if (data.error) {
      weatherData.classList.add('hidden');
      errorMsg.classList.remove('hidden');
    } else {
      showWeather(data);
      weatherData.classList.remove('hidden');
      errorMsg.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error Caught. ' + error);
  }
};

function showWeather(data) {
  temp.innerText = Math.ceil(data.current.temp_c) + '°C';
  weatherCond.innerText = data.current.condition.text;
  humidity.innerText = data.current.humidity + '%';
  windSpeed.innerText = Math.ceil(data.current.wind_kph) + 'Km/hr';

  cityName.innerHTML = `
        <div>
          <img src="images/location.png" />
         ${data.location.name}, ${data.location.country}
        </div>`;
  weatherIcon.innerHTML = `
  <div>
  <img src= "https://${data.current.condition.icon}"  />
  </div>
  `;
}

searchBtn.addEventListener('click', () => {
  let city = searchInput.value;
  if (city.trim() != '') {
    getWeather(city);
  } else {
    alert('Please enter a valid location.');
  }
});

searchInput.addEventListener('keypress', (e) => {
  e.preventDefault;
  let city = searchInput.value;
  if (city.trim() != 0 && e.keyCode === 13) {
    getWeather(city);
  }
});
