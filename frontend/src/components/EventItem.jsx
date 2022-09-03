import { Link } from 'react-router-dom';

function EventItem({ event }) {
  return (
    <div className='ticket'>
      <div>{new Date(event.createdAt).toLocaleString('en-US')}</div>
      <div>{event.name}</div>
      <div className={`status status-${event.status}`}>{event.status}</div>
      <Link to={`/events/${event._id}`} className='btn btn-reverse btn-sm'>
        View Event
      </Link>
    </div>
  );
}

export default EventItem;
