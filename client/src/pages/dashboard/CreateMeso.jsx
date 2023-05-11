import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect } from '../../components';
import FormWrapper from '../../assets/css-wrappers/DashboardFormPage';
import SessionWrapper from '../../assets/css-wrappers/SessionForm';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  handleChange,
  clearInputs,
  addSession,
} from '../../features/mesocycle/mesoSlice';

const CreateMeso = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    startDate,
    startWeight,
    goalOptions,
    goal,
    microcycles,
    sessions,
    sessionsNumber,
    isEditing,
  } = useSelector((store) => store.meso);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate) {
      toast.error('Please input a start date');
      return;
    } else if (!microcycles) {
      toast.error('Please specify mesocycle length');
      return;
    } else if (!sessions) {
      toast.error('At least one session must exist per microcycle');
      return;
    }
  };

  const handleMesoInput = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ input, value }));
  };

  return (
    <>
      <FormWrapper>
        <form className='form'>
          <h3>Create Mesocycle</h3>
          <div className='form-center'>
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
            <FormRowSelect
              name='goal'
              labelText='Goal'
              value={goal}
              list={goalOptions}
              handleChange={handleMesoInput}
            />
            <FormRowSelect
              name='microcycles'
              labelText='Microcycles'
              value={microcycles}
              list={['Length of meso (usually weeks)', 1, 2, 3, 4, 5, 6, 7, 8]}
              handleChange={handleMesoInput}
            />
            <button
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearInputs())}
            >
              Clear Inputs
            </button>
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Create Mesocycle
            </button>
          </div>
        </form>
      </FormWrapper>
      <SessionWrapper>
        {sessions.map((session) => {
          return (
            <div className='session' key={session.sessionNumber}>
              <form className='form'>
                <h4>Session {session.sessionNumber}</h4>
              </form>
            </div>
          );
        })}
        <div
          className='session add-session'
          onClick={() => dispatch(addSession())}
        >
          <AiOutlinePlusCircle size={50} />
        </div>
      </SessionWrapper>
    </>
  );
};
export default CreateMeso;
