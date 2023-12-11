document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('city-form');
    const weatherCard = document.getElementById('weather-card');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const cityInput = document.getElementById('city-input');
        const cityName = cityInput.value.trim();

        if (cityName) {
            const apiKey = '087e2b07bc332a82b0243b9f610e25e6'; 
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displayWeatherCard(data);
                })
                .catch(error => {
                    console.error('Error in the weather API request:', error);
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

        // elemente pt HTML card
        weatherCard.appendChild(cityNameElement);
        weatherCard.appendChild(temperatureElement);
        weatherCard.appendChild(feelsLikeElement);
        weatherCard.appendChild(windElement);
        weatherCard.appendChild(visibilityElement);
        weatherCard.appendChild(airQualityElement);
        weatherCard.appendChild(humidityElement);
        weatherCard.appendChild(descriptionElement);

        // afisare
        weatherCard.classList.remove('hidden');
    }

    // functie pentru creare elem HTML
    function createWeatherElement(tagName, textContent) {
        const element = document.createElement(tagName);
        element.textContent = textContent;
        return element;
    }

    // calitatea aerului dupa umiditate)
    function getAirQuality(humidity) {
        if (humidity < 30) {
            return 'Good';
        } else if (humidity < 60) {
            return 'Moderate';
        } else {
            return 'Poor';
        }
    }
});
