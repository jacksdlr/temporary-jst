import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Workout';
import {
  AiOutlineCalendar,
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { deleteWorkout } from '../features/allWorkouts/allWorkoutsSlice';
import { getWorkout } from '../features/workout/workoutSlice';
import ConfirmationModal from './ConfirmationModal';

const Workout = ({
  mesoName,
  mesoId,
  _id,
  microcycle,
  sessionName,
  sessionNumber,
  status,
  musclesTrained,
  exercises,
  comments,
  createdAt,
  updatedAt,
}) => {
  const dispatch = useDispatch();

  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{mesoName}</div>
        <div className='info'>
          <h5>{`Week ${microcycle}`}</h5>
          <p>{`Session ${sessionNumber}`}</p>
        </div>
        <h5 className={`status ${status}`}>
          <span className='icon'>
            {status == 'Completed' ? (
              <AiOutlineCalendar />
            ) : status == 'Incomplete' ? (
              <AiOutlineCloseCircle />
            ) : (
              <AiOutlineClockCircle />
            )}{' '}
          </span>
          <span className='text'>
            {updatedAt != createdAt
              ? `${updatedAt.slice(8, 10)}/${updatedAt.slice(
                  5,
                  7
                )}/${updatedAt.slice(2, 4)}`
              : status}{' '}
          </span>
        </h5>
      </header>
      <div className='content'>
        <div className='muscles'>
          {musclesTrained.map((muscle, index) => (
            <p key={index} className={muscle}>
              {muscle}
            </p>
          ))}
        </div>
        <div className='exercises'>
          {exercises.map((exercise, index) => (
            <p key={index}>{exercise.exerciseName}</p>
          ))}
        </div>
      </div>
      <footer>
        {isModalShown && (
          <ConfirmationModal
            action='delete'
            type='workout'
            handleCancel={() => setIsModalShown(false)}
            handleConfirm={() => {
              dispatch(deleteWorkout({ mesoId, workoutId: _id }));
            }}
          />
        )}
        <div className='actions'>
          <Link
            to={`/workout`}
            onClick={() => dispatch(getWorkout({ mesoId, workoutId: _id }))}
            className='btn edit-btn'
          >
            view{/*  / edit */}
          </Link>

          <button
            className='btn delete-btn'
            onClick={() => {
              setIsModalShown(true);
              // ASK FOR CONFIRMATION
              // dispatch(deleteWorkout({ mesoId, workoutId: _id }));
            }}
          >
            delete
          </button>
        </div>
      </footer>
    </Wrapper>
  );
};
export default Workout;
