import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWorkouts } from '../features/allWorkouts/allWorkoutsSlice';
import Workout from './Workout';
import Loading from './Loading';
import Wrapper from '../assets/css-wrappers/WorkoutContainer';

const WorkoutsContainer = () => {
  const dispatch = useDispatch();

  const { workouts, isLoading } = useSelector((store) => store.allWorkouts);

  useEffect(() => {
    dispatch(getAllWorkouts());
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
        <h2>Loading workouts...</h2>
      </Wrapper>
    );
  }

  if (workouts.length === 0) {
    return (
      <Wrapper>
        <h2>No workout logs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>Workouts Info</h5>
      <div className='workouts'>
        {workouts.map((workout) => {
          return <Workout key={workout._id} {...workout} />;
        })}
      </div>
    </Wrapper>
  );
};
export default WorkoutsContainer;
