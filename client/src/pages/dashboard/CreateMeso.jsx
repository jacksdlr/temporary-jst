import CreateSessions from './../../components/CreateSessions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect } from '../../components';
import {
  handleMesoChange,
  addSession,
  clearInputs,
  createMeso,
  editMeso,
} from '../../features/createMeso/createMesoSlice';
import MesoWrapper from '../../assets/css-wrappers/DashboardFormPage';
import SessionsWrapper from '../../assets/css-wrappers/SessionForm';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const MesoDetails = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    mesoName,
    microcycles,
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
    /* sessions.map((session) => {
      if (session.exercises.length === 0) {
        toast.error(
          `Session "${session.sessionName}" does not have any exercises`
        );
        return;
      }
      session.exercises.map((exercise) => {
        const { muscleGroup, exerciseName, repRange } = exercise;
        if (!muscleGroup || !exerciseName || !repRange) {
          toast.error(
            `Session "${session.sessionName}" has incomplete details`
          );
          return;
        }
      });
    }); */

    // toast.success('submitted');
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
      <MesoWrapper>
        <h3>{!isEditing ? 'Create Mesocycle' : 'Edit Mesocycle'}</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='mesoName'
            labelText='Mesocycle Name *'
            value={mesoName}
            handleChange={handleMesoInput}
          />
          {/* <FormRowSelect
            name='microcycles'
            labelText='Microcycles *'
            value={microcycles}
            list={['Select mesocycle length', 1, 2, 3, 4, 5, 6, 7, 8]}
            handleChange={handleMesoInput}
          /> */}
          <FormRowSelect
            name='goal'
            labelText='Goal'
            value={goal}
            list={['Select a goal', 'Bulk', 'Cut', 'Maintenance']}
            handleChange={handleMesoInput}
          />
          <FormRow
            type='date'
            name='startDate'
            labelText='Start Date'
            value={startDate}
            handleChange={handleMesoInput}
          />
          <FormRow
            type='number'
            name='startWeight'
            labelText='Start Weight (kg)'
            value={startWeight}
            handleChange={handleMesoInput}
          />
          {isEditing && (
            <FormRow
              type='number'
              name='endWeight'
              labelText='End Weight (kg)'
              value={endWeight}
              handleChange={handleMesoInput}
            />
          )}
          <FormRow
            type='textarea'
            name='mesoNotes'
            labelText='Additional Notes'
            placeholder='More mesocycle info...'
            value={mesoNotes}
            handleChange={handleMesoInput}
          />
          <FormRow
            type='checkbox'
            name='setActive'
            labelText='Set as active meso?'
            checked={setActive}
            handleChange={handleChecked}
          />
          {!isEditing ? (
            <button
              className='btn btn-block clear-btn'
              /* ask for confirmation here */
              onClick={() => dispatch(clearInputs())}
            >
              Reset Mesocycle
            </button>
          ) : (
            <button
              className='btn btn-block clear-btn'
              /* ask for confirmation here */
              onClick={() => dispatch(clearInputs())}
            >
              Cancel
            </button>
          )}
          {!isEditing ? (
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Create Mesocycle
            </button>
          ) : (
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Save Changes
            </button>
          )}
        </div>
      </MesoWrapper>
      {!isEditing && (
        <SessionsWrapper>
          {sessions.map((session, sessionIndex) => {
            return (
              <CreateSessions
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
        </SessionsWrapper>
      )}
    </>
  );
};

export default MesoDetails;
