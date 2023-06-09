import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNextWorkout } from '../../features/workout/workoutSlice';
import Loading from '../../components/Loading';
import Wrapper from '../../assets/css-wrappers/WorkoutPage';

const Workout = () => {
  const dispatch = useDispatch();

  const { isLoading, workout } = useSelector((store) => store.workout);

  useEffect(() => {
    if (!workout) {
      dispatch(getNextWorkout());
    }
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
        <h2>Loading workout...</h2>
      </Wrapper>
    );
  }

  if (!workout) {
    return (
      <Wrapper>
        <h2>No workout to display...</h2>
        <p>Activate a planned mesocycle or create a new one</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='container'>
        <h1>workout</h1>
        <h3>{workout && workout.sessionName}</h3>
      </div>
    </Wrapper>
  );
};
export default Workout;
