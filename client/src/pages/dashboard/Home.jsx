import { useEffect, useMemo } from 'react';
import {
  StatsContainer,
  // ChartsContainer,
  Loading,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  // getNextWorkout,
  openRecoveryModal,
  setNextWorkout,
} from '../../features/workout/workoutSlice';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/HomePage';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { syncUserData } from '../../features/user/userSlice';

const Home = () => {
  const dispatch = useDispatch();

  const { isLoading, user, nextWorkout } = useSelector((store) => store.user);

  const { workout } = useSelector((store) => store.workout);

  // useEffect(() => {
  //   if (!workout) {
  //     dispatch(getNextWorkout());
  //   }
  // }, [user]);

  useEffect(() => {
    dispatch(syncUserData(user.updatedAt));
  }, []);

  // const nextWorkout = useMemo(() => {
  //   // this happens every time you go to the page? stop.
  //   /* return user?.mesocycles
  //     ?.find((meso) => meso.status == 'Active')
  //     ?.sessions?.find((session) => session.status == 'Planned')?.sessionName */
  //   return user?.nextWorkout?.sessionName;
  // }, [user]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      {!nextWorkout ? (
        <Link to={'/create-meso'} className='btn btn-hero'>
          <h3>Create a training plan...</h3>
          <AiOutlineArrowRight size={'3rem'} />
        </Link>
      ) : (
        <Link
          to={'/workout'}
          className='btn btn-hero'
          onClick={() => {
            // need to do this rather than return initial state (if a user makes changes on desktop it will update some state, but workout is still stored in local storage)
            dispatch(setNextWorkout({ workout: nextWorkout }));
          }}
        >
          <h3>Go to next workout: '{nextWorkout.sessionName}'</h3>
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
