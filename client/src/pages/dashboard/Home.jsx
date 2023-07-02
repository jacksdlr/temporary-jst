import { useEffect, useMemo } from 'react';
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
import { syncUserData } from '../../features/user/userSlice';

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const { isLoading, workout } = useSelector((store) => store.workout);

  // useEffect(() => {
  //   if (!workout) {
  //     dispatch(getNextWorkout());
  //   }
  // }, [user]);

  useEffect(() => {
    console.log('checking version...');
    dispatch(syncUserData(user.version));
  }, []);

  const nextWorkout = useMemo(() => {
    // this happens every time you go to the page? stop.
    return user?.mesocycles
      ?.find((meso) => meso.status == 'Active')
      ?.sessions?.find((session) => session.status == 'Planned')?.sessionName;
  }, [user]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      {!nextWorkout ? (
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
            dispatch(getNextWorkout());
          }}
        >
          <h3>Go to next workout: '{nextWorkout}'</h3>
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
