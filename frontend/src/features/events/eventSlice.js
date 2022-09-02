import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from './eventService';

const initialState = {
  events: [],
  event: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getEvents = createAsyncThunk(
  'events/getall',
  async (_, thunkAPI) => {
    try {
      return await eventService.getEvents();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = eventSlice.actions;

export default eventSlice.reducer;
