import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/css-wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import {
  updateUserDetails,
  updateUserData,
} from '../../features/user/userSlice';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  const { name, email } = user;
  // const { height, weight, age, sex, activityLevel } = user.data;

  const [userDetails, setUserDetails] = useState({
    name: name,
    email: email,
    //maybe passwords as well
  });
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Name and email fields must be provided');
      return;
    }
    dispatch(updateUserDetails(userDetails));
  };
  const handleDetailsChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    setUserDetails({ ...userDetails, [input]: value });
  };

  const [userData, setUserData] = useState({
    height: user.data?.height || '',
    weight: user.data?.weight || '',
    age: user.data?.age || '',
    sex: user.data?.sex || '',
    activityLevel: user.data?.activityLevel || '',
  });
  const handleDataSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserData(userData));
  };
  const handleDataChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [input]: value });
  };

  const [isShown, setIsShown] = useState(false);
  const calculateCalories = () => {
    if (
      !userData.height ||
      !userData.weight ||
      !userData.age ||
      !userData.sex ||
      !userData.activityLevel
    ) {
      return 'Input all user data to estimate caloric needs...';
    }

    let calories =
      10 * userData.weight + 6.25 * userData.height - 5 * userData.age;

    switch (userData.sex) {
      case 'Male':
        calories = calories + 5;
        break;
      case 'Female':
        calories = calories - 161;
        break;
    }

    switch (userData.activityLevel) {
      case 'Sedentary':
        calories = calories * 1.2;
        break;
      case 'Lightly active':
        calories = calories * 1.375;
        break;
      case 'Moderately active':
        calories = calories * 1.55;
        break;
      case 'Active':
        calories = calories * 1.725;
        break;
      case 'Very active':
        calories = calories * 1.9;
        break;
    }

    return `Approximate calories needed to maintain weight: ${calories.toFixed(
      0
    )} kcals`;
  };

  return (
    <>
      <Wrapper>
        <form className='form' id='user-details' onSubmit={handleDetailsSubmit}>
          <h3>Profile</h3>
          <div className='form-center'>
            <FormRow
              type='text'
              name='name'
              labelText='Name'
              value={userDetails.name}
              handleChange={handleDetailsChange}
            />
            <FormRow
              type='email'
              name='email'
              labelText='Email'
              value={userDetails.email}
              handleChange={handleDetailsChange}
            />
            <button className='btn btn-block' disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Wrapper>
      <Wrapper>
        <form
          className='form border-bottom'
          id='user-data'
          onSubmit={handleDataSubmit}
        >
          <h3>User data</h3>
          <div className='form-center'>
            <FormRow
              type='number'
              name='height'
              labelText='Height (cm)'
              value={userData.height}
              step={0.1}
              handleChange={handleDataChange}
            />
            <FormRow
              type='number'
              name='weight'
              labelText='Weight (kg)'
              value={userData.weight}
              handleChange={handleDataChange}
            />
            <FormRow
              type='number'
              name='age'
              labelText='Age'
              value={userData.age}
              step={1}
              handleChange={handleDataChange}
            />
            <FormRowSelect
              name='sex'
              labelText='Sex'
              value={userData.sex}
              handleChange={handleDataChange}
              list={['Select your sex', 'Male', 'Female']}
            />
            <FormRowSelect
              name='activityLevel'
              labelText='Activity Level'
              value={userData.activityLevel}
              handleChange={handleDataChange}
              list={[
                'Select an activity level',
                'Sedentary',
                'Lightly active',
                'Moderately active',
                'Active',
                'Very active',
              ]}
            />
            <button className='btn btn-block' disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save Changes'}
            </button>
          </div>
        </form>
        <div className='calories-container'>
          <p>{calculateCalories()}</p>
          {/* <AiOutlineQuestionCircle
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          /> */}
        </div>
        {/*         <p className={isShown ? 'info show-calories' : 'info'}>
          This is calculated using bla bla formula and should be used as an
          estimate only. Body fat percentage can drastically alter the accuracy
          of this number.
        </p> */}
      </Wrapper>
    </>
  );
};
export default Profile;
