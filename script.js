document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('city-form');
    const weatherCard = document.getElementById('weather-card');
    const iconElement = document.createElement('img');
  

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const cityInput = document.getElementById('city-input');
        const cityName = cityInput.value.trim();

        if (cityName) {
            const apiKey = '087e2b07bc332a82b0243b9f610e25e6'; 
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
       
        fetch(apiUrl)
        .then(response => {
             if (!response.ok) {
             throw new Error(`City not found. Please enter a valid city name. (Status: ${response.status})`);
               }
                   return response.json();
             })
          .then(data => {
            console.log(data);
            displayWeatherCard(data);
})
         .catch(error => {
         console.error('Error fetching data:', error);
          displayErrorMessage('An error occurred while fetching weather data.');
});
        }
    });
        function displayWeatherCard(data) {
        weatherCard.innerHTML = '';
        const cityNameElement = createWeatherElement('p', `City: ${data.name}`);
        const temperatureElement = createWeatherElement('p', `Temperature: ${data.main.temp} °C`);
        const feelsLikeElement = createWeatherElement('p', `Feels Like: ${data.main.feels_like} °C`);
        const windElement = createWeatherElement('p', `Wind: ${data.wind.speed} m/s`);
        const visibilityElement = createWeatherElement('p', `Visibility: ${data.visibility} m`);
        const airQualityElement = createWeatherElement('p', `Air Quality: ${getAirQuality(data.main.humidity)}`);
        const humidityElement = createWeatherElement('p', `Humidity: ${data.main.humidity}%`);
        const descriptionElement = createWeatherElement('p', `Description: ${data.weather[0].description}`);
    
        if (data.weather && data.weather.length > 0) {
            const iconElement = document.createElement('img');
            iconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            iconElement.alt = 'Weather Icon';
            weatherCard.appendChild(iconElement);
        }
        weatherCard.appendChild(cityNameElement);
        weatherCard.appendChild(temperatureElement);
        weatherCard.appendChild(feelsLikeElement);
        weatherCard.appendChild(windElement);
        weatherCard.appendChild(visibilityElement);
        weatherCard.appendChild(airQualityElement);
        weatherCard.appendChild(humidityElement);
        weatherCard.appendChild(descriptionElement);
    }
    function createWeatherElement(tagName, textContent) {
        const element = document.createElement(tagName);
        element.textContent = textContent;
        return element;
    }

    function getAirQuality(humidity) {
        if (humidity < 30) {
            return 'Good';
        } else if (humidity < 60) {
            return 'Moderate';
        } else {
            return 'Poor';
        }
    }
    function displayErrorMessage(message) {
        weatherCard.innerHTML = '';
        const errorElement = createWeatherElement('p', message);
        weatherCard.appendChild(errorElement);
        weatherCard.classList.remove('hidden');
    
}
});

