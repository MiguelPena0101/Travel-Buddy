const Destination = require('../models/Destination');
const { getLocalEvents, searchPlace, getPlaceDetails, getWeather } = require('../services/apiService');

// Create Destination
exports.createDestination = async (req, res) => {
  try {
    const { name, description, address, coordinates } = req.body;
    const destination = new Destination({ name, description, address, coordinates });
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Destinations
exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Search for a Place
exports.searchDestination = async (req, res) => {
  const { query } = req.query;
  try {
    const places = await searchPlace(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination data', error });
  }
};

// Get Details for a Specific Place
exports.getDestinationDetails = async (req, res) => {
  const { placeId } = req.params;
  try {
    const placeDetails = await getPlaceDetails(placeId);
    res.json(placeDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination details', error });
  }
};

// Get Weather for a Destination
exports.getWeatherForDestination = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const weather = await getWeather(lat, lon);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
};

// Get Local Events for a Destination
exports.getEventsForLocation = async (req, res) => {
  const { location } = req.query;
  try {
    const events = await getLocalEvents(location);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching local events', error });
  }
};