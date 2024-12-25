// Add this script tag in your HTML or link an external JS file.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("weather-form");
    const weatherCard = document.getElementById("weather-card");
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");

    const apiKey = "7e4a21d5a5da4dd2b72112331242512";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const city = document.getElementById("city").value.trim();
        const country = document.getElementById("country").value.trim();

        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        const query = country ? `${city},${country}` : city;

        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch weather data. Please check the city and country.");
            }

            const data = await response.json();
            updateWeatherCard(data);
        } catch (error) {
            alert(error.message);
        }
    });

    function updateWeatherCard(data) {
        const { location, current } = data;

        // Update location and weather details
        locationElement.textContent = `${location.name}, ${location.country}`;
        temperatureElement.textContent = `${current.temp_c}°C`;
        descriptionElement.textContent = current.condition.text;
        humidityElement.textContent = current.humidity;
        windSpeedElement.textContent = current.wind_kph;

        // Show the weather card
        weatherCard.classList.remove("hidden");
    }
});
