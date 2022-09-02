const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  getUserEvents,
  getUserEvent,
  deleteEvent,
  updateEvent,
  addAttendee,
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getEvents)
  .post(protect, createEvent)
  .get(protect, getUserEvents);

router
  .route('/:id')
  .get(protect, getUserEvent)
  .delete(protect, deleteEvent)
  // .put(protect, updateEvent)
  .put(protect, addAttendee);

module.exports = router;
