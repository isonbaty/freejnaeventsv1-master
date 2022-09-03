import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, reset } from '../features/events/eventSlice';

import { MdAdminPanelSettings } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
function Home() {
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

  return (
    <>
      <section className='heading'>
        <h1 style={{ color: 'green' }}>EVENTS</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to='/events' className='btn  btn-block'>
        <FaTicketAlt /> View All {events.length} Events
      </Link>
      <Link to='/new-event' className='btn btn-reverse btn-block'>
        <FaTicketAlt /> Check My Events
      </Link>

      <hr />
      <section className='heading'>
        <h5 style={{ color: 'green' }}>Admin</h5>
        <Link to='/new-event' className='btn btn-reverse btn-block'>
          <RiAdminFill /> Add New Event
        </Link>
      </section>
    </>
  );
}

export default Home;
