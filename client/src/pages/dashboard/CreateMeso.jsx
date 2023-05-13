import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect } from '../../components';
import {
  handleMesoChange,
  handleSessionChange,
  addSession,
  deleteSession,
  handleExerciseChange,
  addExercise,
  deleteExercise,
  clearInputs,
} from '../../features/mesocycle/mesoSlice';
import MesoWrapper from '../../assets/css-wrappers/DashboardFormPage';
import SessionsWrapper from '../../assets/css-wrappers/SessionForm';
import {
  AiOutlinePlusCircle,
  AiOutlineClose,
  AiOutlineCloseSquare,
} from 'react-icons/ai';
import { muscleGroups } from '../../utils/muscleGroups';
import { exercisesList } from '../../utils/exercises';

const MesoDetails = () => {
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

    if (!microcycles) {
      toast.error('Please specify mesocycle length');
      return;
    }

    for (let i = 0; i < sessions.length; i++) {
      for (let j = 0; j < sessions[i].exercises.length; j++) {
        const { muscleGroup, exerciseName, repRange } =
          sessions[i].exercises[j];
        if (!muscleGroup || !exerciseName || !repRange) {
          toast.error('Some sessions have incomplete details');
          return;
        }
      }
    }
  };

  const handleMesoInput = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    dispatch(handleMesoChange({ input, value }));
  };

  const handleChange = (e, exerciseIndex) => {
    const input = e.target.name;
    const value = e.target.value;
    const sessionIndex = sessions.findIndex(
      (session) =>
        session.sessionNumber ==
        e.target.parentElement.parentElement.parentElement.id
    );

    dispatch(
      handleExerciseChange({ input, value, sessionIndex, exerciseIndex })
    );
  };

  return (
    <>
      <MesoWrapper>
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
            labelText='Microcycles *'
            value={microcycles}
            list={['Select mesocycle length', 1, 2, 3, 4, 5, 6, 7, 8]}
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
            disabled={isLoading || sessionsNumber === 0}
          >
            Create Mesocycle
          </button>
        </div>
      </MesoWrapper>
      <SessionsWrapper>
        {sessions.map((session, index) => {
          return (
            <div className='session session-form' key={index}>
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
                        index,
                      })
                    )
                  }
                  autoFocus
                />
                <AiOutlineClose
                  size={25}
                  className='icon'
                  onClick={() =>
                    dispatch(
                      deleteSession({
                        index,
                      })
                    )
                  }
                />
              </div>
              {session.exercises.map((exercise, index) => {
                return (
                  <div
                    key={index}
                    id={session.sessionNumber}
                    className={
                      !exercise.muscleGroup
                        ? 'form'
                        : `form exercise-container ${exercise.muscleGroup}`
                    }
                  >
                    <div className='label'>
                      <h5>{exercise.muscleGroup || 'Muscle group'}</h5>
                      <AiOutlineCloseSquare
                        size={25}
                        className='icon'
                        onClick={() =>
                          dispatch(
                            deleteExercise({
                              sessionIndex: sessions.findIndex(
                                (item) =>
                                  item.sessionNumber == session.sessionNumber
                              ),
                              exerciseIndex: index,
                            })
                          )
                        }
                      />
                    </div>
                    <div
                      className={
                        !exercise.exerciseName
                          ? 'exercise-details'
                          : 'exercise-details form-center'
                      }
                    >
                      <FormRowSelect
                        name={
                          !exercise.muscleGroup ? 'muscleGroup' : 'exerciseName'
                        }
                        labelText=''
                        value={
                          !exercise.muscleGroup
                            ? exercise.muscleGroup
                            : exercise.exerciseName
                        }
                        list={
                          !exercise.muscleGroup
                            ? ['Select a muscle group', ...muscleGroups]
                            : [
                                'Select an exercise',
                                ...exercisesList
                                  .filter(
                                    (listItem) =>
                                      listItem.muscleGroup ===
                                      exercise.muscleGroup
                                  )
                                  .map((listItem) => listItem.name),
                              ]
                        }
                        handleChange={(e) => handleChange(e, index)}
                      />
                      {exercise.exerciseName && (
                        <FormRowSelect
                          name='repRange'
                          labelText=''
                          value={exercise.repRange}
                          list={[
                            'Select a rep range',
                            '5-10',
                            '10-20',
                            '20-30',
                          ]}
                          handleChange={(e) => handleChange(e, index)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              <button
                className='btn btn-block add-exercise'
                onClick={() =>
                  dispatch(
                    addExercise({
                      index: sessions.findIndex(
                        (item) => item.sessionNumber == session.sessionNumber
                      ),
                    })
                  )
                }
              >
                <AiOutlinePlusCircle size={25} />
              </button>
            </div>
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
