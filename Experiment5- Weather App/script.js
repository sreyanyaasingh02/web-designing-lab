
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading weather...";
    
    try {
        // Find the city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!locationResponse.ok) {
            throw new Error("Unable to find the city.");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            message.textContent = "City not found. Please try another name.";
            return;
        }

        const location = locationData.results[0];

        // Get current weather using latitude and longitude
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        // Display weather information
        document.getElementById("cityName").textContent =
            location.name + (location.country ? ", " + location.country : "");

        document.getElementById("temperature").textContent =
            Math.round(current.temperature_2m) + "°C";

        document.getElementById("humidity").textContent =
            current.relative_humidity_2m + "%";

        document.getElementById("wind").textContent =
            current.wind_speed_10m + " km/h";

        document.getElementById("description").textContent =
            getWeatherDescription(current.weather_code);

        document.getElementById("weatherIcon").textContent =
            getWeatherIcon(current.weather_code, current.is_day);

        message.textContent = "";

    } catch (error) {
        message.textContent = "Something went wrong. Please try again.";
        console.error(error);
    }
}

// Convert weather codes into descriptions
function getWeatherDescription(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 85 && code <= 86) return "Snow showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown weather";
}

// Show an icon based on the weather
function getWeatherIcon(code, isDay) {
    if (code === 0) return isDay ? "☀️" : "🌙";
    if (code === 1 || code === 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code >= 95 && code <= 99) return "⛈️";
    return "🌡️";
}
