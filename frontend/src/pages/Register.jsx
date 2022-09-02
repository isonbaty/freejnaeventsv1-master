import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    payroll: '',
  });
  const [division, setDivision] = useState('');
  const { name, email, password, password2, payroll } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isSuccess, message, navigate, isError, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange = (e) => {
    setDivision(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        payroll,
        division,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) return <Spinner />;

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account </p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              name='name'
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              name='email'
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='payroll'
              className='form-control'
              id='payroll'
              value={payroll}
              name='payroll'
              onChange={onChange}
              placeholder='Enter your payroll'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='division'>Choose your division</label>
            <select
              id='division'
              value={division}
              onChange={handleChange}
              required
            >
              <option value='Water & Civil'>Water & Civil</option>
              <option value='Generation'>Generation</option>
              <option value='Transmission Power'>Transmission Power</option>
              <option value='Billing Services'>Billing Services</option>
              <option value='Business Support & Human Resources'>
                Business Support & Human Resources
              </option>
              <option value='Innovation & The Future'>
                Innovation & The Future
              </option>
              <option value='Power & Water Planning'>
                Power & Water Planning
              </option>
              <option value='Distribution Power'>Distribution Power</option>
              <option value='Internal Audit'>Internal Audit</option>
              <option value='Legal Affairs'>Legal Affairs</option>
              <option value='Finance'>Finance</option>
              <option value='Business Development & Excellence'>
                Business Development & Excellence
              </option>
              <option value='Strategy & Corporate Communications'>
                Strategy & Corporate Communications
              </option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              name='password'
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              value={password2}
              name='password2'
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
