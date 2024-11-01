const express = require('express');
const { createDestination, getDestinations, searchDestination, getDestinationDetails, getWeatherForDestination, getEventsForLocation } = require('../controllers/destinationController');
const router = express.Router();

router.post('/', createDestination);  // Create a new destination
router.get('/', getDestinations);  // Get all destinations
router.get('/search', searchDestination);  // Search for a destination
router.get('/:placeId/details', getDestinationDetails);  // Get details for a specific destination
router.get('/weather', getWeatherForDestination);  // Get weather data for a destination
router.get('/events', getEventsForLocation);  // Get local events for a destination

module.exports = router;
