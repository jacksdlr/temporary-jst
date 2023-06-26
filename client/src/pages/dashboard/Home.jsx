import { useEffect } from 'react';
import {
  StatsContainer,
  // ChartsContainer,
  Loading,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNextWorkout,
  openRecoveryModal,
} from '../../features/workout/workoutSlice';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/css-wrappers/HomePage';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const { isLoading, workout } = useSelector((store) => store.workout);

  useEffect(() => {
    dispatch(getNextWorkout());
  }, [user]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      {!workout ? (
        <Link to={'/create-meso'} className='btn btn-hero'>
          <h3>Create a mesocycle</h3>
          <AiOutlineArrowRight size={'3rem'} />
        </Link>
      ) : (
        <Link
          to={'/workout'}
          className='btn btn-hero'
          onClick={() => {
            dispatch(openRecoveryModal());
          }}
        >
          <h3>Go to next workout: '{workout.sessionName}'</h3>
          <AiOutlineArrowRight size={'3rem'} />
        </Link>
      )}
      <StatsContainer />
    </Wrapper>
  );
};
export default Home;

// volume landmarks!!!! weekly volume in chart (will have to store dates for workouts)
// ^ this is a feature for far in the future
