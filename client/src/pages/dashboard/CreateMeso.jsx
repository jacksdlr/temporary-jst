import {
  CreateMesoSession,
  CreateMesoDetails,
} from '../../components/create-meso';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleMesoChange,
  addSession,
  createMeso,
  editMeso,
} from '../../features/create-meso/createMesoSlice';
import Wrapper from '../../assets/wrappers/SessionForm';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const MesoDetails = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    mesoName,
    goal,
    startDate,
    startWeight,
    endWeight,
    setActive,
    sessions,
    sessionsCount,
    isEditing,
    _id,
    mesoNotes,
  } = useSelector((store) => store.createMeso);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing == true) {
      dispatch(
        editMeso({
          _id,
          mesoName,
          setActive,
          mesoNotes,
          goal,
          startDate,
          startWeight,
          endWeight,
        })
      );
      return;
    }

    if (sessions.length === 0) {
      toast.error('At least one session must exist');
      return;
    }

    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].exercises.length === 0) {
        return toast.error(
          `Session "${sessions[i].sessionName}" does not have any exercises`
        );
      }
      for (let j = 0; j < sessions[i].exercises.length; j++) {
        const { muscleGroup, exerciseName, repRange } =
          sessions[i].exercises[j];
        if (!muscleGroup || !exerciseName || !repRange) {
          return toast.error(
            `Session "${sessions[i].sessionName}" has incomplete details`
          );
        }
      }
    }

    dispatch(
      createMeso({
        mesoName,
        goal,
        startDate,
        startWeight,
        setActive,
        sessions,
        sessionsCount,
        mesoNotes,
      })
    );
  };

  const handleChecked = () => {
    dispatch(handleMesoChange({ input: 'setActive', value: !setActive }));
  };

  const handleMesoInput = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    dispatch(handleMesoChange({ input, value }));
  };

  return (
    <>
      <CreateMesoDetails />
      {!isEditing && (
        <Wrapper>
          {sessions.map((session, sessionIndex) => {
            return (
              <CreateMesoSession
                session={session}
                sessionIndex={sessionIndex}
                key={sessionIndex}
              />
            );
          })}
          <div
            className='session add-session'
            onClick={() => dispatch(addSession())}
          >
            <AiOutlinePlusCircle size={50} />
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default MesoDetails;
