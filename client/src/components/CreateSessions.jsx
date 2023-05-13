import { useState } from 'react';
import { FormRow, FormRowSelect } from './index';
import {
  AiOutlinePlusCircle,
  AiOutlineClose,
  AiOutlineEdit,
} from 'react-icons/ai';
import { muscleGroups } from '../utils/muscleGroups';
import Wrapper from '../assets/css-wrappers/SessionForm';
import { exercisesList } from '../utils/exercises';

const CreateSessions = () => {
  const [sessionsDetails, setSessionsDetails] = useState([
    {
      sessionName: 'Session 1',
      sessionNumber: 1,
      exercises: [{ muscleGroup: '', exerciseName: '', repRange: '' }],
    },
  ]);

  const handleSessionChange = (e, index) => {
    const input = e.target.name;
    const value = e.target.value;
    const sessions = [...sessionsDetails];

    sessions[index][input] = [value];

    setSessionsDetails(sessions);
  };

  const handleExerciseChange = (e, index) => {
    const input = e.target.name;
    const value = e.target.value;
    const sessionIndex = sessionsDetails.findIndex(
      (session) =>
        session.sessionNumber ==
        e.target.parentElement.parentElement.parentElement.id
    );
    const sessions = [...sessionsDetails];

    sessions[sessionIndex].exercises[index][input] = value;

    setSessionsDetails(sessions);
  };

  const addSession = () => {
    const number =
      sessionsDetails[sessionsDetails.length - 1].sessionNumber + 1;
    const sessionObject = {
      sessionName: `Session ${number}`,
      sessionNumber: number,
      exercises: [{ muscleGroup: '', exerciseName: '', repRange: '' }],
    };

    setSessionsDetails([...sessionsDetails, sessionObject]);
  };

  const addExercise = (sessionNumber) => {
    const exerciseObject = {
      muscleGroup: '',
      exerciseName: '',
      repRange: '',
    };
    const sessionIndex = sessionsDetails.findIndex(
      (session) => session.sessionNumber == sessionNumber
    );
    const sessions = [...sessionsDetails];
    sessions[sessionIndex].exercises.push(exerciseObject);

    setSessionsDetails([...sessionsDetails]);
  };

  const deleteExercise = (session, index) => {
    const sessionIndex = sessionsDetails.findIndex(
      (item) => item.sessionNumber == session
    );
    const sessions = [...sessionsDetails];
    if (sessions[sessionIndex].exercises.length == 1) {
      const exerciseObject = {
        muscleGroup: '',
        exerciseName: '',
        repRange: '',
      };
      sessions[sessionIndex].exercises[0] = exerciseObject;
    } else {
      sessions[sessionIndex].exercises.splice(index, 1);
    }

    setSessionsDetails([...sessionsDetails]);
  };

  return (
    <Wrapper>
      {sessionsDetails.map((session, index) => {
        return (
          <div className='session session-form' key={index}>
            <FormRow
              type='text'
              name='sessionName'
              value={session.sessionName}
              handleChange={(e) => handleSessionChange(e, index)}
            />
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
                    {exercise.muscleGroup && (
                      <AiOutlineClose
                        size={25}
                        id='delete'
                        onClick={() =>
                          deleteExercise(session.sessionNumber, index)
                        }
                      />
                    )}
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
                      handleChange={(e) => handleExerciseChange(e, index)}
                    />
                    {exercise.exerciseName && (
                      <FormRowSelect
                        name='repRange'
                        labelText=''
                        value={exercise.repRange}
                        list={['Select a rep range', '5-10', '10-20', '20-30']}
                        handleChange={(e) => handleExerciseChange(e, index)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <button
              className='btn btn-block add-exercise'
              onClick={() => addExercise(session.sessionNumber)}
            >
              <AiOutlinePlusCircle size={25} />
            </button>
          </div>
        );
      })}
      <button className='session add-session' onClick={addSession}>
        <AiOutlinePlusCircle size={50} />
      </button>
    </Wrapper>
  );
};
export default CreateSessions;
