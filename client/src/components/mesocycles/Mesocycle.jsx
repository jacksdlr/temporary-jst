import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Mesocycle';
import {
  AiOutlineCarryOut,
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
  AiOutlineFile,
  AiOutlineStop,
} from 'react-icons/ai';
import { setSearch } from '../../features/all-workouts/allWorkoutsSlice';
import { deleteMeso } from '../../features/mesocycles/mesocyclesSlice';
import { setEditing } from '../../features/create-meso/createMesoSlice';
import ConfirmationModal from '../ConfirmationModal';

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

  const [isModalShown, setIsModalShown] = useState(false);

  let uniqueSessions = [];
  sessions.map((session) => {
    if (
      !uniqueSessions.find(
        (uniqueSession) => uniqueSession.sessionName == session.sessionName
      )
    ) {
      uniqueSessions.push(session);
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
        {(goal || startWeight || endWeight) && (
          <div className='stats'>
            {goal && <p>{goal}</p>}
            {startWeight && <p>Start weight: {startWeight}kg</p>}
            {endWeight && <p>End weight: {endWeight}kg</p>}
          </div>
        )}
        <div className={`sessions ${notes.length > 0 && 'border-bottom'}`}>
          {uniqueSessions.map((session, index) => (
            <Link
              key={index}
              to={`/all-workouts`}
              onClick={() =>
                dispatch(
                  setSearch({
                    searchMesoId: _id,
                    searchSession: session.sessionNumber,
                  })
                )
              }
            >
              <p className='session'>{session.sessionName}</p>
            </Link>
          ))}
        </div>
        {notes.length > 0 && (
          <div className='notes'>
            {notes.map((note, index) => (
              <div key={index} className='note'>
                <AiOutlineFile />
                <p>{note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer>
        {isModalShown && (
          <ConfirmationModal
            action='delete'
            type='mesocycle'
            handleCancel={() => setIsModalShown(false)}
            handleConfirm={() => {
              dispatch(deleteMeso(_id));
            }}
          />
        )}
        <div className='actions'>
          <Link
            to={`/all-workouts`}
            className='btn edit-btn'
            onClick={() => dispatch(setSearch({ searchMesoId: _id }))}
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
                  mesoNotes: notes[0],
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
              setIsModalShown(true);
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
