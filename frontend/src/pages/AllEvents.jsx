import { useDispatch, useSelector } from 'react-redux';
import { getEvents, reset } from '../features/events/eventSlice';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function AllEvents() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event); // Get events from Redux store

  useEffect(() => {
    dispatch(getEvents()); // Get events from backend
  }, []);
  return (
    <div>
      <BackButton url='/' />
      <h1>All Events</h1>
    </div>
  );
}

export default AllEvents;
