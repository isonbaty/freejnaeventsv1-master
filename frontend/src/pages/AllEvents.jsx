import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, reset } from '../features/events/eventSlice';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import EventItem from '../components/EventItem';

function AllEvents() {
  const dispatch = useDispatch();
  const { events, isLoading, isError, isSuccess } = useSelector(
    (state) => state.event
  ); // Get events from Redux store

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]); // Run when events change

  useEffect(() => {
    dispatch(getAllEvents()); // Get events from backend
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url='/' />
      <h1>All Events</h1>
      <div className='ticket-headings'>
        <div>date</div>
        <div>Title</div>
        <div>status</div>
      </div>
      <div className='tickets'>
        {events.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>
    </>
  );
}

export default AllEvents;
