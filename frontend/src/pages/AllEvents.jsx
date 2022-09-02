import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function AllEvents() {
  return (
    <div>
      <BackButton url='/' />
      <h1>All Events</h1>
    </div>
  );
}

export default AllEvents;
