import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import {
  handleExerciseChange,
  deleteExercise,
} from '../features/mesocycle/mesoSlice';
import { AiOutlineCloseSquare } from 'react-icons/ai';
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
          : `form exercise-container ${exercise.muscleGroup}`
      }
    >
      <div className='label'>
        <h5>{exercise.muscleGroup || 'Exercise'}</h5>
        <AiOutlineCloseSquare
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
        />
        {exercise.exerciseName && (
          <>
            <FormRowSelect
              name='repRange'
              labelText=''
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
            />
            <FormRow
              type='text'
              name='notes'
              labelText=''
              value={exercise.notes}
              placeholder='Additional notes'
              handleChange={(e) => {
                handleChange(e, sessionIndex, exerciseIndex);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default CreateExercises;
