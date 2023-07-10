import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateWorkout,
  skipWorkout,
  addExercise,
  addWorkoutNote,
} from '../../features/workout/workoutSlice';
import Loading from '../../components/Loading';
import Wrapper from '../../assets/wrappers/WorkoutPage';
import {
  AiOutlineMore,
  AiOutlineFile,
  AiOutlineWarning,
  AiOutlineFastForward,
  AiOutlinePlus,
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { RecoveryModal, Exercise } from '../../components/workout';
import { syncUserData } from '../../features/user/userSlice';
import Options from '../../components/Options';

const Workout = () => {
  const dispatch = useDispatch();

  const [isWarningShown, setIsWarningShown] = useState(false);

  const { user, nextWorkout } = useSelector((store) => store.user);

  const { isLoading, workout, recoveryModal } = useSelector(
    (store) => store.workout
  );
  useEffect(() => {
    dispatch(syncUserData(user.updatedAt));
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

  const { mesoId } = workout;

  const isCurrentWorkout = workout._id === nextWorkout._id;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCurrentWorkout || workout.status == 'Completed') {
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
    }

    dispatch(updateWorkout({ isCurrentWorkout, workout /* mesoId */ }));
  };

  return (
    <Wrapper>
      {/* add a user profile setting to enable/disable automatic set additions */}
      {workout.microcycle != 1 &&
        /* workout.status == 'Planned' && */
        isCurrentWorkout &&
        recoveryModal.isOpen && <RecoveryModal />}
      {!isCurrentWorkout && (
        <div
          className='warning-container'
          /* onClick={() => {
            setIsWarningShown(!isWarningShown);
          }} */
        >
          <div className='workout-warning'>
            <AiOutlineWarning size='2rem' />
            <p>
              {workout.status == 'Planned'
                ? 'This is not your next scheduled workout.'
                : 'This workout has already been completed.'}
            </p>
            <AiOutlineWarning size='2rem' />
          </div>
          {isWarningShown && (
            <p className='warning-info'>
              {workout.status == 'Planned'
                ? 'Any changes to this workout will not be saved as issues may arise during creation of subsequent workouts. Complete prior planned workouts or mark them as incomplete to be able to complete this workout.'
                : 'Any changes to a completed workout will not be saved as it may cause some processing errors and/or affect how some data is displayed.'}
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
          <Options
            options={[
              {
                text:
                  workout.status != 'Completed'
                    ? 'Skip workout'
                    : 'Mark as incomplete',
                icon: <AiOutlineFastForward />,
                action: () => dispatch(skipWorkout()),
              },
              {
                text: 'Add exercise',
                icon: <AiOutlinePlus />,
                action: () =>
                  dispatch(
                    addExercise(/* open modal to create exercise and pass this function */)
                  ),
              },
              {
                text: 'Add note',
                icon: <AiOutlineFile />,
                action: () =>
                  dispatch(
                    addWorkoutNote(/* open modal to create exercise and pass this function */)
                  ),
              },
            ]}
            isCurrentWorkout={workout._id === nextWorkout._id}
            iconSize='2rem'
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
            exerciseId={exercise._id}
            // prevState={prevState.exercises[index]}
          />
        ))}
        <button
          className='btn submit-btn'
          onClick={handleSubmit}
          disabled={isLoading /*  || workout._id != nextWorkout._id */}
        >
          {isCurrentWorkout ? 'Complete Workout' : 'Save Changes'}
        </button>
      </form>
    </Wrapper>
  );
};
export default Workout;
