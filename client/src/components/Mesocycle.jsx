import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/css-wrappers/Mesocycle';
import {
  AiOutlineCarryOut,
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
  AiOutlineFile,
  AiOutlineStop,
} from 'react-icons/ai';
import { setSearch } from '../features/allWorkouts/allWorkoutsSlice';
import { deleteMeso } from '../features/allMesocycles/allMesocyclesSlice';
import { setEditing } from '../features/createMeso/createMesoSlice';

const Mesocycle = ({
  _id,
  mesoName,
  status,
  microcycles,
  notes,
  sessions,
  goal,
  startDate,
  startWeight,
  endWeight,
}) => {
  const dispatch = useDispatch();

  let sessionNames = [];
  sessions.map((session) => {
    if (!sessionNames.find((name) => name == session.sessionName)) {
      sessionNames.push(session.sessionName);
    }
  });

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{mesoName}</div>
        <div className='info'>
          <h5>{`Microcycles: ${microcycles}`}</h5>
          <p>{`Total Sessions: ${sessions.length}`}</p>
        </div>
        <h5 className={`status ${status}`}>
          <span className='icon'>
            {status == 'Active' ? (
              <AiOutlineExclamationCircle />
            ) : status == 'Completed' ? (
              <AiOutlineCarryOut />
            ) : status == 'Incomplete' ? (
              <AiOutlineStop />
            ) : (
              <AiOutlineClockCircle />
            )}{' '}
          </span>
          <span className='text'>{status}</span>
        </h5>
      </header>
      <div className='content'>
        <div className='stats'>
          {goal && <p>{goal}</p>}
          {startWeight && <p>Start weight: {startWeight}kg</p>}
          {endWeight && <p>End weight: {endWeight}kg</p>}
        </div>
        <div className='sessions'>
          {sessionNames.map((sessionName, index) => (
            <Link
              key={index}
              to={`/all-workouts`}
              onClick={() => dispatch(setSearch({ mesoName, sessionName }))}
            >
              <p className='session'>{sessionName}</p>
            </Link>
          ))}
        </div>
        <div className='notes'>
          {notes.map((note, index) => (
            <div key={index} className='note'>
              <AiOutlineFile />
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <div className='actions'>
          <Link
            to={`/all-workouts`}
            className='btn edit-btn'
            onClick={() => dispatch(setSearch({ mesoName }))}
          >
            view
          </Link>
          <Link
            to={`/create-meso`}
            className='btn edit-btn'
            onClick={() =>
              dispatch(
                setEditing({
                  _id,
                  mesoName,
                  setActive: status == 'Active' ? true : false,
                  microcycles,
                  notes,
                  goal,
                  startDate:
                    startDate &&
                    `${startDate?.slice(0, 4)}-${startDate?.slice(
                      5,
                      7
                    )}-${startDate?.slice(8, 10)}`,
                  startWeight,
                  endWeight,
                })
              )
            }
          >
            edit
          </Link>
          <button
            className='btn delete-btn'
            onClick={() => {
              // ASK FOR CONFIRMATION
              dispatch(deleteMeso(_id));
            }}
          >
            delete
          </button>
        </div>
      </footer>
    </Wrapper>
  );
};
export default Mesocycle;
