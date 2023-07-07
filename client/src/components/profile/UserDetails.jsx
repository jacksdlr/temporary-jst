import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserDetails } from '../../features/user/userSlice';
import FormRow from '../FormRow';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const UserDetails = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  // Load into state or else the navbar user name will change
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    //maybe passwords as well
  });

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [input]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.email) {
      toast.error('Name and email fields must be provided');
      return;
    }
    dispatch(updateUserDetails(userDetails));
  };

  return (
    <Wrapper>
      <form className='form' id='user-details' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            labelText='Name'
            value={userDetails.name}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            labelText='Email'
            value={userDetails.email}
            handleChange={handleChange}
          />
          <button className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default UserDetails;
