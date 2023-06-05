import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Workout from './Workout';
import Loading from './Loading';
import Wrapper from '../assets/css-wrappers/WorkoutsContainer';
import { getAllWorkouts } from '../features/allWorkouts/allWorkoutsSlice';
import PageButtonContainer from './PageButtonContainer';

const WorkoutsContainer = () => {
  const dispatch = useDispatch();

  const {
    workouts,
    isLoading,
    page,
    numberOfPages,
    totalWorkouts,
    searchMesoId,
    searchSessionName,
    searchMicrocycle,
    searchSession,
    searchStatus,
    searchMuscle,
    sort,
  } = useSelector((store) => store.allWorkouts);

  useEffect(() => {
    dispatch(getAllWorkouts());
  }, [
    page,
    searchMesoId,
    searchSessionName,
    searchMicrocycle,
    searchSession,
    searchStatus,
    searchMuscle,
    sort,
  ]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
        <h2>Loading workouts...</h2>
      </Wrapper>
    );
  }

  if (totalWorkouts === 0) {
    return (
      <Wrapper>
        <h2>No workout logs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalWorkouts} workout{totalWorkouts > 1 && 's'} found
      </h5>
      <div className='workouts'>
        {workouts.map((workout, index) => (
          <Workout key={index} {...workout} />
        ))}
      </div>
      {numberOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  );
};
export default WorkoutsContainer;
