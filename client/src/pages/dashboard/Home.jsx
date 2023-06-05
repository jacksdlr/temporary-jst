import { useEffect } from 'react';
import {
  StatsContainer,
  // ChartsContainer,
  Loading,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWorkout } from '../../features/currentWorkout/currentWorkoutSlice';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/css-wrappers/HomePage';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const { isLoading, workout } = useSelector((store) => store.currentWorkout);

  useEffect(() => {
    dispatch(getCurrentWorkout());
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
        <Link to={'/workout'} className='btn btn-hero'>
          <h3>Go to current workout: '{workout.sessionName}'</h3>
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
