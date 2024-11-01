const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

// Get Local Events
exports.getLocalEvents = async (location, radius = '10km') => {
  try {
    const response = await axios.get(`https://www.eventbriteapi.com/v3/events/search/`, {
      headers: {
        Authorization: `Bearer ${EVENTBRITE_API_KEY}`,
      },
      params: {
        location_address: location,
        location_within: radius,
      },
    });
    return response.data.events;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
};

// Search for a Place
exports.searchPlace = async (query) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query,
        key: GOOGLE_PLACES_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching place data:", error);
    throw error;
  }
};

// Get Details for a Specific Place
exports.getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
      params: {
        place_id: placeId,
        key: GOOGLE_PLACES_API_KEY,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

// Get Weather Data
exports.getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
