import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/css-wrappers/Mesocycle';
import {
  AiOutlineCarryOut,
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';

const Mesocycle = ({
  _id,
  mesoName,
  status,
  microcycles,
  notes,
  sessions,
  startDate,
  startWeight,
  endWeight,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      {
        <header>
          <div className='main-icon'>{mesoName}</div>
          <div className='info'>
            <h5>{`Microcycles: ${microcycles}`}</h5>
            <p>{`Sessions: ${sessions.length}`}</p>
          </div>
          <h5 className={`status ${status}`}>
            <span className='icon'>
              {status == 'Active' ? (
                <AiOutlineExclamationCircle />
              ) : status == 'Completed' ? (
                <AiOutlineCarryOut />
              ) : (
                <AiOutlineClockCircle />
              )}{' '}
            </span>
            <span className='text'>{status}</span>
          </h5>
        </header> /*
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
        <div className='actions'>
          <Link to={`/workout/${_id}`} className='btn edit-btn'>
            view / edit
          </Link>
          <button
            className='btn delete-btn'
            onClick={() => {
              // ASK FOR CONFIRMATION
              dispatch(deleteWorkout(_id));
            }}
          >
            delete
          </button>
        </div>
      </footer> */
      }
    </Wrapper>
  );
};
export default Mesocycle;
