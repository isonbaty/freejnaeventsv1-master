const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Event = require('../models/eventModel');

// @desc    Get all events
// @route   GET /api/events
// @access  Private

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate();
  res.status(200).json(events);
});
// @desc    Get user events
// @route   GET /api/events
// @access  Private

const getUserEvents = asyncHandler(async (req, res) => {
  // get the user id from the token
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const userEvents = await Event.find({ user: req.user.id });
  res.status(200).json(userEvents);
});
// @desc    Get one user event
// @route   GET /api/events/:id
// @access  Private

const getUserEvent = asyncHandler(async (req, res) => {
  // get the user id from the token
  const user = await User.findById(req.user.id);
  const userEvent = await Event.findById(req.params.id);
  if (!userEvent) {
    res.status(404);
    throw new Error('Event not found');
  }
  if (userEvent.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  res.status(200).json(userEvent);
});

// @desc    DELETE one user event
// @route   DELETE /api/events/:id
// @access  Private

const deleteEvent = asyncHandler(async (req, res) => {
  // get the user id from the token
  const user = await User.findById(req.user.id);
  const userEvent = await Event.findById(req.params.id);
  if (!userEvent) {
    res.status(404);
    throw new Error('Event not found');
  }
  if (userEvent.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  await userEvent.remove();
  res.status(200).json({ success: true });
});
// @desc    Update one user event
// @route   PUT /api/events/:id
// @access  Private

const updateEvent = asyncHandler(async (req, res) => {
  // get the user id from the token
  const user = await User.findById(req.user.id);
  const userEvent = await Event.findById(req.params.id);
  if (!userEvent) {
    res.status(404);
    throw new Error('Event not found');
  }
  if (userEvent.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateEvent);
});

// @desc    Add attendee to event
// @route   PUT /api/events/:id
// @access  Private
const addAttendee = asyncHandler(async (req, res) => {
  // get the user id from the token
  const user = await User.findById(req.user.id);
  const userEvent = await Event.findById(req.params.id);
  if (!userEvent) {
    res.status(404);
    throw new Error('Event not found');
  }

  const addedAttendee = await Event.findByIdAndUpdate(req.params.id, {
    $push: { isGoing: req.user.email },
  });
  res.status(200).json(addedAttendee);
});
// @desc    CREATE events
// @route   POST /api/events
// @access  Private

const createEvent = asyncHandler(async (req, res) => {
  const { name, desc, venue, status, date } = req.body;
  if (!name || !desc || !venue || !date) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const event = await Event.create({
    name,
    desc,
    venue,
    status: 'upcoming',
    date,
    createdBy: user.id,
    user: req.user.id,
  });
  res.status(200).json(event);
});

module.exports = {
  getEvents,
  getUserEvents,
  createEvent,
  getUserEvent,
  deleteEvent,
  updateEvent,
  addAttendee,
};
