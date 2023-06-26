import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNextWorkout,
  updateWorkout,
} from '../../features/workout/workoutSlice';
import Loading from '../../components/Loading';
import Wrapper from '../../assets/css-wrappers/WorkoutPage';
import { AiOutlineMore, AiOutlineFile } from 'react-icons/ai';
import Exercise from '../../components/Exercise';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';

const Workout = () => {
  const dispatch = useDispatch();

  const { isLoading, workout, mesoId, recoveryModal } = useSelector(
    (store) => store.workout
  );

  useEffect(() => {
    if (!workout) {
      dispatch(getNextWorkout());
    } else if (workout.microcycle != 1 && workout.status == 'Planned') {
      console.log(
        `Please answer the following questions regarding this session from your microcyle: 
      How quickly did you recover? [for each muscle group] 
      ${workout.musclesTrained.map(
        (muscle) =>
          muscle + 'still sore, recovered just in time, recovered in advance'
      )}
      How much of a pump did you get? [for each muscle group]
      ${workout.musclesTrained.map(
        (muscle) => muscle + 'no pump, decent pump, incredible pump'
      )}
      `
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < workout.exercises.length; i++) {
      for (let j = 0; j < workout.exercises[i].sets.length; j++) {
        if (
          workout.exercises[i].sets[j].weight == undefined ||
          workout.exercises[i].sets[j].repetitions == undefined ||
          workout.exercises[i].sets[j].repsInReserve == undefined
        ) {
          toast.error('One or more exercise details are incomplete');
          return;
        }
      }
    }

    dispatch(updateWorkout({ workout, mesoId }));
  };

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

  // working on set progression. need to make an actual modal

  return (
    <Wrapper>
      {/* add a user profile setting to enable/disable automatic set additions */}
      {workout.microcycle != 1 &&
        workout.status == 'Planned' &&
        recoveryModal.isOpen && (
          <Modal musclesTrained={workout.musclesTrained} />
        )}
      {recoveryModal.isOpen && (
        <Modal musclesTrained={workout.musclesTrained} />
      )}
      {/* temporary */}
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
            <p key={index} className={`muscle ${muscle}`}>
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
      <form className='workout-form'>
        {workout.exercises.map((exercise, index) => (
          <Exercise
            name={exercise.exerciseName}
            sets={exercise.sets}
            changeWeight={exercise.changeWeight}
            notes={exercise.notes}
            exerciseIndex={index}
          />
        ))}
        <button
          className='btn submit-btn'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Complete Workout
        </button>
      </form>
    </Wrapper>
  );
};
export default Workout;
