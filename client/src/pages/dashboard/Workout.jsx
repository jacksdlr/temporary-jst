import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNextWorkout } from '../../features/workout/workoutSlice';
import Loading from '../../components/Loading';
import Wrapper from '../../assets/css-wrappers/WorkoutPage';
import { AiOutlineMore, AiOutlineFile } from 'react-icons/ai';
import Exercise from '../../components/Exercise';

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
        <div className='title'>
          <h4>
            Week <span className='number'>{workout.microcycle}</span> / Session{' '}
            <span className='number'>{workout.sessionNumber}</span>
            {workout.sessionName != `Session ${workout.sessionNumber}` && (
              <> / {workout.sessionName}</>
            )}
          </h4>
          <AiOutlineMore
            className='options'
            size={'2rem'}
            onClick={() => console.log('open menu')}
          />
        </div>
        <div
          className={`muscles ${workout.notes.length != 0 && 'border-bottom'}`}
        >
          {workout.musclesTrained.map((muscle, index) => (
            <p key={index} className={muscle}>
              {muscle}
            </p>
          ))}
        </div>
        {workout.notes.length != 0 && (
          <div className='notes'>
            {workout.notes.map((note) => (
              <div className='note'>
                <AiOutlineFile />
                <p>{note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* notes container */}
      <form className='workout-form'>
        {workout.exercises.map((exercise, index) => (
          <Exercise
            name={exercise.exerciseName}
            sets={exercise.sets}
            notes={exercise.notes}
            exerciseIndex={index}
          />
        ))}
        <div className='btn-container'>
          <button
            className='btn submit-btn'
            onClick={() => console.log('submit workout')}
          >
            Complete Workout
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Workout;
