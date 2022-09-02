import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

import { MdAdminPanelSettings } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
function Home() {
  return (
    <>
      <section className='heading'>
        <h1 style={{ color: 'green' }}>EVENTS</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to='/events' className='btn  btn-block'>
        <FaTicketAlt /> View All Events
      </Link>
      <Link to='/new-event' className='btn btn-reverse btn-block'>
        <FaTicketAlt /> Check New Events
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
