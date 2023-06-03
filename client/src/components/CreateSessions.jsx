import CreateExercises from './CreateExercises';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleSessionChange,
  deleteSession,
  addExercise,
} from '../features/createMeso/createMesoSlice';
import { AiOutlinePlusCircle, AiOutlineClose } from 'react-icons/ai';

const CreateSessions = ({ session, sessionIndex }) => {
  const dispatch = useDispatch();

  return (
    <div className='session session-form'>
      <div className='session-label'>
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
