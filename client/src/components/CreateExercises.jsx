import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from './FormRowSelect';
import {
  handleExerciseChange,
  deleteExercise,
} from '../features/mesocycle/mesoSlice';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { muscleGroups } from '../utils/muscleGroups';
import { exercisesList } from '../utils/exercises';

const CreateExercises = ({ exercise, sessionIndex, exerciseIndex }) => {
  const dispatch = useDispatch();

  const handleChange = (e, sessionIndex, exerciseIndex) => {
    const input = e.target.name;
    const value = e.target.value;

    dispatch(
      handleExerciseChange({ input, value, sessionIndex, exerciseIndex })
    );
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
        <h5>{exercise.muscleGroup || 'Muscle group'}</h5>
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
              ? ['Select a muscle group', ...muscleGroups]
              : [
                  'Select an exercise',
                  ...exercisesList
                    .filter(
                      (listItem) =>
                        listItem.muscleGroup === exercise.muscleGroup
                    )
                    .map((listItem) => listItem.name),
                ]
          }
          handleChange={(e) => handleChange(e, sessionIndex, exerciseIndex)}
        />
        {exercise.exerciseName && (
          <FormRowSelect
            name='repRange'
            labelText=''
            value={exercise.repRange}
            list={['Select a rep range', '5-10', '10-20', '20-30']}
            handleChange={(e) => handleChange(e, sessionIndex, exerciseIndex)}
          />
        )}
      </div>
    </div>
  );
};
export default CreateExercises;
