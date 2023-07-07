import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleDataChange,
  updateUserData,
} from '../../features/user/userSlice';
import FormRow from '../FormRow';
import FormRowSelect from '../FormRowSelect';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const UserData = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  const {
    data: { height, weight, age, sex, activityLevel },
  } = user;

  /* const [userData, setUserData] = useState({
    height: user.data?.height || '',
    weight: user.data?.weight || '',
    age: user.data?.age || '',
    sex: user.data?.sex || '',
    activityLevel: user.data?.activityLevel || '',
  }); */

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    dispatch(handleDataChange({ input, value }));
    // setUserData({ ...userData, [input]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserData(user.data));
  };

  const caloriesInfo = useMemo(() => {
    if (!height || !weight || !age || !sex || !activityLevel) {
      return 'Input all user data to estimate caloric needs...';
    }

    let calories = 10 * weight + 6.25 * height - 5 * age;

    switch (sex) {
      case 'Male':
        calories = calories + 5;
        break;
      case 'Female':
        calories = calories - 161;
        break;
    }

    switch (activityLevel) {
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
  }, [height, weight, age, sex, activityLevel]);

  return (
    <Wrapper>
      <form
        className='form border-bottom'
        id='user-data'
        onSubmit={handleSubmit}
      >
        <h3>User data</h3>
        <div className='form-center'>
          <FormRow
            type='number'
            name='height'
            labelText='Height (cm)'
            value={height}
            step={0.1}
            handleChange={handleChange}
          />
          <FormRow
            type='number'
            name='weight'
            labelText='Weight (kg)'
            value={weight}
            handleChange={handleChange}
          />
          <FormRow
            type='number'
            name='age'
            labelText='Age'
            value={age}
            step={1}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='sex'
            labelText='Sex'
            value={sex}
            handleChange={handleChange}
            list={['Select your sex', 'Male', 'Female']}
          />
          <FormRowSelect
            name='activityLevel'
            labelText='Activity Level'
            value={activityLevel}
            handleChange={handleChange}
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
        <p>{caloriesInfo}</p>
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
  );
};
export default UserData;
