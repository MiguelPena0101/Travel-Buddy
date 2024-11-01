const Activity = require('../models/Activity');
const { getEventsForLocation } = require('../services/apiService');

// Create Activity
exports.createActivity = async (req, res) => {
  try {
    const { name, description, destination } = req.body;
    const activity = new Activity({ name, description, destination });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Activities
exports.getActivities = async (req, res) => {
  try {
    // Conditionally apply populate only if not in test mode
    const query = Activity.find();
    if (process.env.NODE_ENV !== 'test') {
      query.populate('destination');
    }
    const activities = await query;
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Local Events for a Specific Location
exports.getEventsForLocation = async (req, res) => {
  const { location } = req.query;
  try {
    const events = await getEventsForLocation(location);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching local events:", error);
    res.status(500).json({ message: 'Error fetching local events', error });
  }
};
