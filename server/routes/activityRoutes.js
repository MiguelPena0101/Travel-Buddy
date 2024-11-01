const express = require('express');
const { createActivity, getActivities, getEventsForLocation } = require('../controllers/activityController');
const router = express.Router();

router.post('/', createActivity);  // Create a new activity
router.get('/', getActivities);  // Get all activities
router.get('/events', getEventsForLocation);  // Get local events for an activity location

module.exports = router;
