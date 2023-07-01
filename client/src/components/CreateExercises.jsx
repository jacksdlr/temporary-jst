import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import {
  handleExerciseChange,
  deleteExercise,
} from '../features/createMeso/createMesoSlice';
import {
  AiOutlineCloseSquare,
  AiOutlineDelete,
  AiOutlineRollback,
} from 'react-icons/ai';
import { directory } from '../utils/directory';

const muscleGroups = directory.map((item) => item.muscleGroup);

const CreateExercises = ({ exercise, sessionIndex, exerciseIndex }) => {
  const dispatch = useDispatch();

  const handleChange = (e, sessionIndex, exerciseIndex) => {
    const input = e.target.name;
    const value = e.target.value;

    dispatch(
      handleExerciseChange({ input, value, sessionIndex, exerciseIndex })
    );
  };

  const getExercises = (muscleGroup) => {
    const exercises = directory.filter(
      (item) =>
        item.muscleGroup == muscleGroup || item.exerciseType == muscleGroup
    )[0].exercises;

    return exercises.map((exercise) => exercise.name);
  };

  return (
    <div
      className={
        !exercise.muscleGroup
          ? 'form'
          : `form border-bottom exercise-container ${exercise.muscleGroup}`
      }
    >
      <div className='label border-bottom'>
        <h5>{exercise.muscleGroup || 'Exercise'}</h5>
        {exercise.muscleGroup ? (
          <AiOutlineRollback
            size={25}
            className='icon'
            onClick={() =>
              dispatch(
                deleteExercise({
                  sessionIndex,
                  exerciseIndex,
                })
              )
            }
          />
        ) : (
          <AiOutlineDelete
            size={25}
            className='icon'
            onClick={() =>
              dispatch(
                deleteExercise({
                  sessionIndex,
                  exerciseIndex,
                })
              )
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
          name={!exercise.muscleGroup ? 'muscleGroup' : 'exerciseName'}
          labelText=''
          value={
            !exercise.muscleGroup ? exercise.muscleGroup : exercise.exerciseName
          }
          list={
            !exercise.muscleGroup
              ? ['Select a muscle group / exercise type', ...muscleGroups]
              : [
                  'Select an exercise',
                  ...getExercises(exercise.muscleGroup),
                  /* .filter(
                      (listItem) =>
                        listItem.muscleGroup === exercise.muscleGroup ||
                        listItem.exerciseType === exercise.muscleGroup
                    ) */
                ]
          }
          handleChange={(e) => handleChange(e, sessionIndex, exerciseIndex)}
          className='select-exercise'
        />
        {exercise.exerciseName && (
          <>
            <FormRowSelect
              name='repRange'
              labelText='Rep range: '
              value={exercise.repRange}
              list={[
                'Select a rep range',
                '- Standard rep ranges -',
                '5-10',
                '10-20',
                '20-30',
                '- More specific rep ranges -',
                '6-8',
                '8-10',
                '10-12',
                '12-15',
                '15-20',
                '20-25',
                '25-30',
              ]}
              handleChange={(e) => handleChange(e, sessionIndex, exerciseIndex)}
              className='select-reps'
            />
            <FormRow
              type='number'
              name='sets'
              labelText='Sets (first week): '
              // placeholder='Select sets for first week'
              value={exercise.sets}
              handleChange={(e) => handleChange(e, sessionIndex, exerciseIndex)}
              className='select-sets'
              step='1'
              min='1'
            />
            <FormRow
              type='textarea'
              name='exerciseNotes'
              labelText=''
              value={exercise.exerciseNotes}
              placeholder='Additional notes'
              handleChange={(e) => {
                handleChange(e, sessionIndex, exerciseIndex);
              }}
              className='exercise-notes'
            />
          </>
        )}
      </div>
    </div>
  );
};
export default CreateExercises;
