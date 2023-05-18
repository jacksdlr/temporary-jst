import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/css-wrappers/Workout';

const Workout = ({
  _id,
  microcycle,
  sessionNumber,
  dayCompleted,
  status,
  musclesTrained,
  exercises,
  comments,
  updatedAt,
}) => {
  console.log(dayCompleted?.slice(0, 10));
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>Meso</div>
        <div className='info'>
          <h5>{`Week ${microcycle}`}</h5>
          <p>{`Session ${sessionNumber}`}</p>
        </div>
        <h5 className={`status ${status}`}>
          {dayCompleted?.slice(0, 10) || status}
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
        <div className='actions'>
          <Link to={`/workout/${_id}`} className='btn edit-btn'>
            view / edit
          </Link>
          <button
            className='btn delete-btn'
            onClick={() => {
              console.log('hide workout');
            }}
          >
            hide
          </button>
        </div>
      </footer>
    </Wrapper>
  );
};
export default Workout;
