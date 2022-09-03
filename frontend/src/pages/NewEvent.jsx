import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEvent, reset } from '../features/events/eventSlice';
import Spinner from '../components/Spinner';

function NewEvent() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.event
  );

  const [createdBy] = useState(user._id);
  const [userName] = useState(user.name);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [venue, setVenue] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/events');
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent({ createdBy, name, desc, date, status, venue }));
  };
  if (!user.isAdmin) {
    return <h1>Not Authorized</h1>;
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <p>Hello {userName}</p>
        <h1> Create New Event</h1>
        <p>Please fill out the form </p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor=''>Admin Name</label>
          <input type='text' value={userName} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Admin ID</label>
          <input type='text' value={createdBy} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              value={name}
              name='name'
              id='name'
              required
              onChange={(e) => setName(e.target.value)}
              placeholder='Event Title'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              value={venue}
              name='venue'
              id='venue'
              required
              onChange={(e) => setVenue(e.target.value)}
              placeholder='Event Venue'
            />
          </div>
          <div className='form-group'>
            <textarea
              id='desc'
              name='desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder='Event Description'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Event Date</label>
            <input
              type='date'
              id='date'
              name='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              name='status'
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='upcoming'>Upcoming</option>
              <option value='finished'>Finished</option>
              <option value='postponed'>Postponed</option>
            </select>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewEvent;
