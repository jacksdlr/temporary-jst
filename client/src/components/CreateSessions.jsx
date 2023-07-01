import CreateExercises from './CreateExercises';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleSessionChange,
  deleteSession,
  addExercise,
} from '../features/createMeso/createMesoSlice';
import {
  AiOutlinePlusCircle,
  AiOutlineClose,
  AiOutlineEdit,
} from 'react-icons/ai';

const CreateSessions = ({ session, sessionIndex }) => {
  const dispatch = useDispatch();

  return (
    <div className='session session-form'>
      <div className='session-label border-bottom'>
        <div className='session-name'>
          <label htmlFor='sessionName' style={{ 'margin-right': '0.5rem' }}>
            <AiOutlineEdit />
          </label>
          <input
            type='text'
            name='sessionName'
            value={session.sessionName}
            onChange={(e) =>
              dispatch(
                handleSessionChange({
                  input: e.target.name,
                  value: e.target.value,
                  sessionIndex,
                })
              )
            }
          />
        </div>
        <AiOutlineClose
          size={25}
          className='icon'
          onClick={() =>
            dispatch(
              deleteSession({
                sessionIndex,
              })
            )
          }
        />
      </div>
      <input
        type='textarea'
        name='sessionNotes'
        placeholder='Session notes'
        value={session.sessionNotes}
        onChange={(e) =>
          dispatch(
            handleSessionChange({
              input: e.target.name,
              value: e.target.value,
              sessionIndex,
            })
          )
        }
        className='form-input session-notes'
        style={{ 'margin-bottom': '1.38rem' }}
      />
      {session.exercises.map((exercise, exerciseIndex) => {
        return (
          <CreateExercises
            exercise={exercise}
            sessionIndex={sessionIndex}
            exerciseIndex={exerciseIndex}
            key={exerciseIndex}
          />
        );
      })}
      <button
        className='btn btn-block add-exercise'
        onClick={() =>
          dispatch(
            addExercise({
              sessionIndex,
            })
          )
        }
      >
        <AiOutlinePlusCircle size={25} />
      </button>
    </div>
  );
};

export default CreateSessions;
