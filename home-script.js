// Function to get query parameters
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1);
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
    });
    return params;
}

// Get location from query parameters
const params = getQueryParams();
let locationName = params.location || 'Unknown Location'; // Use let instead of const

// Capitalize the first letter and make the rest lowercase
locationName = locationName.charAt(0).toUpperCase() + locationName.slice(1).toLowerCase();

document.getElementById('locationName').textContent = locationName;


// Function to fetch weather data based on location
async function fetchWeatherData(location) {
    const apiKey = '4409412a88fe46c8b5585633241706';
    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
    const astronomyUrl = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${location}`;

    try {
        const [weatherResponse, astronomyResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(astronomyUrl)
        ]);

        if (!weatherResponse.ok || !astronomyResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const weatherData = await weatherResponse.json();
        const astronomyData = await astronomyResponse.json();

        // Return both location and weather data
        return { location, weatherData, astronomyData };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Function to update the HTML with weather data
function updateWeatherInfo({ weatherData, astronomyData }) {
    const data = weatherData; // For easier reference in the existing code

    document.getElementById('locationName').textContent = `${data.location.name}`;
    document.getElementById('locationCoord').textContent = `Lat: ${data.location.lat}, Lon: ${data.location.lon}`;
    document.getElementById('localtime').textContent = `${data.location.localtime}`;

    document.getElementById('temp_c').textContent = ` ${data.current.temp_c}°C`;
    document.getElementById('temp_f').textContent = `${data.current.temp_f}°F`;
    document.getElementById('temp-icon').src = `http:${data.current.condition.icon}`;
    document.getElementById('condition').textContent = `${data.current.condition.text}`;

    document.getElementById('wind_kph').textContent = `Wind : ${data.current.wind_kph} kph`;
    document.getElementById('wind_dir').textContent = `Wind Direction: ${data.current.wind_dir}`;
    document.getElementById('wind_degree').textContent = `Wind Degree: ${data.current.wind_degree}°`;

    document.getElementById('pressure_mb').textContent = `Pressure : ${data.current.pressure_mb} mb`;
    document.getElementById('precip_mm').textContent = `Precipitation : ${data.current.precip_mm} mm`;

    document.getElementById('vis_km').textContent = `Visibility : ${data.current.vis_km} km`;
    document.getElementById('gust_kph').textContent = `Gust : ${data.current.gust_kph} kph`;

    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('cloud').textContent = `Cloud Cover: ${data.current.cloud}%`;
    document.getElementById('uv').textContent = `UV Index: ${data.current.uv}`;

    document.getElementById('co').textContent = `CO: ${data.current.air_quality.co} µg/m³`;
    document.getElementById('no2').textContent = `NO2: ${data.current.air_quality.no2} µg/m³`;
    document.getElementById('o3').textContent = `O3: ${data.current.air_quality.o3} µg/m³`;
    document.getElementById('so2').textContent = `SO2: ${data.current.air_quality.so2} µg/m³`;

    // Adding moonrise, moonset, sunrise, sunset, and moon phase information
    document.getElementById('moonrise').textContent = `Moonrise: ${astronomyData.astronomy.astro.moonrise}`;
    document.getElementById('moonset').textContent = `Moonset: ${astronomyData.astronomy.astro.moonset}`;
    document.getElementById('sunrise').textContent = `Sunrise: ${astronomyData.astronomy.astro.sunrise}`;
    document.getElementById('sunset').textContent = `Sunset: ${astronomyData.astronomy.astro.sunset}`;
    document.getElementById('moon_phase').textContent = `Moon Phase: ${astronomyData.astronomy.astro.moon_phase}`;
}

// Function to get the location from the URL and fetch weather data
function getLocationAndFetchWeather() {
    const params = new URLSearchParams(window.location.search);
    const location = params.get('location') || 'London'; // Default to London if no location is provided
    fetchWeatherData(location).then(data => {
        if (data) {
            updateWeatherInfo(data);
        }
    });
}


// Call the function when the page loads
window.onload = getLocationAndFetchWeather;
// Function to get the location name from the URL
