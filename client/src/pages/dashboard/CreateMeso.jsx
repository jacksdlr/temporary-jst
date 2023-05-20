import CreateSessions from './../../components/CreateSessions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect } from '../../components';
import {
  handleMesoChange,
  addSession,
  clearInputs,
} from '../../features/mesocycle/mesoSlice';
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
    sessions,
    sessionsCount,
    isEditing,
  } = useSelector((store) => store.meso);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!microcycles) {
      toast.error('Please specify mesocycle length');
      return;
    }

    if (sessions.length === 0) {
      toast.error('At least one session must exist');
      return;
    }

    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].exercises.length === 0) {
        toast.error(
          `Session "${sessions[i].sessionName}" does not have any exercises`
        );
        return;
      }
      for (let j = 0; j < sessions[i].exercises.length; j++) {
        const { muscleGroup, exerciseName, repRange } =
          sessions[i].exercises[j];
        if (!muscleGroup || !exerciseName || !repRange) {
          toast.error(
            `Session "${sessions[i].sessionName}" has incomplete details`
          );
          return;
        }
      }
    }

    toast.success('submitted');
  };

  const handleMesoInput = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    dispatch(handleMesoChange({ input, value }));
  };

  return (
    <>
      <MesoWrapper>
        <h3>Create Mesocycle</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='mesoName'
            labelText='Mesocycle Name *'
            value={mesoName}
            handleChange={handleMesoInput}
          />
          <FormRowSelect
            name='microcycles'
            labelText='Microcycles *'
            value={microcycles}
            list={['Select mesocycle length', 1, 2, 3, 4, 5, 6, 7, 8]}
            handleChange={handleMesoInput}
          />
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
          <button
            className='btn btn-block clear-btn'
            /* ask for confirmation here */
            onClick={() => dispatch(clearInputs())}
          >
            Reset Mesocycle
          </button>
          {/* 55 IN README */}
          <button
            className='btn btn-block submit-btn'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Create Mesocycle
          </button>
        </div>
      </MesoWrapper>
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
    </>
  );
};

export default MesoDetails;
