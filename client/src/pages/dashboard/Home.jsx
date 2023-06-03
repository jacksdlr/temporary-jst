import { useEffect, useState } from 'react';
import {
  StatsContainer,
  // ChartsContainer,
  Loading,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWorkout } from '../../features/currentWorkout/currentWorkoutSlice';

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
    <>
      {!workout ? (
        <h3>you do not have an active mesocycle... create</h3> // these will be <Link>
      ) : (
        <h3>your next planned workout is: {workout.sessionName}... go</h3> // these will be <Link>
      )}
      <StatsContainer />
    </>
  );
};
export default Home;

// go to current workout
// workouts completed
// mesocycles created

// volume landmarks!!!! weekly volume in chart (will have to store dates for workouts)
// ^ this is a feature for far in the future
