import axios from 'axios';
const API_URL = '/api/events/';

// create an event

const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, eventData, config);
  return response.data;
};

// get all events

const getAllEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const eventService = {
  createEvent,
  getAllEvents,
};

export default eventService;
