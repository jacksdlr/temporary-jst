import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openRecoveryModal,
  getNextWorkout,
  updateWorkout,
} from '../../features/workout/workoutSlice';
import Loading from '../../components/Loading';
import Wrapper from '../../assets/css-wrappers/WorkoutPage';
import { AiOutlineMore, AiOutlineFile, AiOutlineWarning } from 'react-icons/ai';
import Exercise from '../../components/Exercise';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';

const Workout = () => {
  const dispatch = useDispatch();

  const [isWarningShown, setIsWarningShown] = useState(false);

  const { isLoading, workout, mesoId, nextWorkoutId, recoveryModal } =
    useSelector((store) => store.workout);

  useEffect(() => {
    if (!workout) {
      dispatch(getNextWorkout());
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
          return toast.error('One or more exercise details are incomplete');
        }
      }
    }
    /* workout.exercises.map((exercise) => {
      exercise.sets.map((set) => {
        if (
          set.weight == undefined ||
          set.repetitions == undefined ||
          set.repsInReserve == undefined
        ) {
          return toast.error('One or more exercise details are incomplete');
        }
      });
    }); */

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

  return (
    <Wrapper>
      {/* add a user profile setting to enable/disable automatic set additions */}
      {workout.microcycle != 1 &&
        workout.status == 'Planned' &&
        workout._id == nextWorkoutId &&
        recoveryModal.isOpen && <Modal />}
      {workout._id != nextWorkoutId && (
        <div
          className='warning-container'
          onClick={() => {
            setIsWarningShown(!isWarningShown);
          }}
        >
          <div className='workout-warning'>
            <AiOutlineWarning size='2rem' />
            <p>This is not your next scheduled workout.</p>
            <AiOutlineWarning size='2rem' />
          </div>
          {isWarningShown && (
            <p className='warning-info'>
              Any changes to this workout will not be saved as issues may arise
              during creation of subsequent workouts. Complete prior planned
              workouts or mark them as incomplete to be able to complete this
              workout.
            </p>
          )}
        </div>
      )}
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
            {workout.notes.map((note, index) => (
              <div key={index} className='note'>
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
            key={exercise._id}
            name={exercise.exerciseName}
            repRange={exercise.repRange}
            sets={exercise.sets}
            changeWeight={exercise.changeWeight}
            notes={exercise.notes}
            exerciseIndex={index}
            // prevState={prevState.exercises[index]}
          />
        ))}
        <button
          className='btn submit-btn'
          onClick={handleSubmit}
          disabled={isLoading || workout._id != nextWorkoutId}
        >
          Complete Workout
        </button>
      </form>
    </Wrapper>
  );
};
export default Workout;
