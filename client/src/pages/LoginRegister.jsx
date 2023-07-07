import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/LoginRegister';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isUser: true,
};

const LoginRegister = () => {
  const [loginValues, setLoginValues] = useState(initialState);
  const { name, email, password, isUser } = loginValues;

  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [user]);

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setLoginValues({ ...loginValues, [input]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if ((!isUser && !name) || !email || !password) {
      toast.warning('Please fill out all fields');
      return;
    }
    if (isUser) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleIsUser = () => {
    setLoginValues({ ...loginValues, isUser: !isUser });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{isUser ? 'Login' : 'Register'}</h3>
        {!isUser && (
          <FormRow
            type='text'
            name='name'
            labelText='Name'
            value={name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          labelText='Email'
          value={email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          labelText='Password'
          value={password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Loading...' : isUser ? 'Login' : 'Register'}
        </button>
        <button
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({
                email: 'testUser@email.com',
                password: 'testPassword123',
              })
            )
          }
        >
          Demo User
        </button>
        <p>
          {isUser ? 'Not a user yet?' : 'Already a user?'}
          <button type='button' className='user-btn' onClick={toggleIsUser}>
            {isUser ? 'Register!' : 'Login!'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default LoginRegister;
