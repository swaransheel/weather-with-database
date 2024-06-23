const locationname = localStorage.getItem("loc-val");

async function fetchWeatherData(_locationname) {
    const apiKey = '4409412a88fe46c8b5585633241706';
    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${_locationname}&aqi=yes`;
    const astronomyUrl = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${_locationname}`;

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
        return { location: _locationname, weatherData, astronomyData };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update the HTML with weather data
function updateWeatherInfo({ weatherData, astronomyData }) {
    const data = weatherData; // For easier reference in the existing code

    // Update iframe src with latitude and longitude
    const iframe = document.getElementById('mapIframe');
    iframe.src = `https://api.maptiler.com/maps/topo-v2/?key=Ywca22RT0dkdrQS4GLhx#12/${data.location.lat}/${data.location.lon}`;
}

function getLocationAndFetchWeather() {
    const params = new URLSearchParams(window.location.search);
    const location = params.get('location') || locationname || 'London'; // Default to London if no location is provided
    fetchWeatherData(location).then(data => {
        if (data) {
            updateWeatherInfo(data);
        }
    });
}

window.onload = getLocationAndFetchWeather;
