import { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Wrapper from '../../assets/wrappers/WorkoutModal';
import { useDispatch, useSelector } from 'react-redux';
import { directory } from '../../utils/directory';
import { toast } from 'react-toastify';
import FormRow from '../FormRow';
import FormRowSelect from '../FormRowSelect';

const WorkoutModal = ({ modal, handleClose }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    maxWidth: 800,
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: 'var(--borderRadius)',
    boxShadow: 24,
    p: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const dispatch = useDispatch();

  const muscleGroups = directory.map((item) => item.muscleGroup);
  const getExercises = (muscleGroup) => {
    const exercises = directory.filter(
      (item) =>
        item.muscleGroup == muscleGroup || item.exerciseType == muscleGroup
    )[0].exercises;

    return exercises.map((exercise) => exercise.name);
  };

  const initialState = {
    muscleGroup: '',
    exerciseName: '',
    repRange: '',
    sets: 2,
    note: '',
  };

  const [content, setContent] = useState(initialState);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      modal.type == 'exercise' &&
      (!content.muscleGroup ||
        !content.exerciseName ||
        !content.repRange ||
        !content.sets)
    ) {
      return toast.error('Exercise details are incomplete...');
    }
    if (modal.type == 'note' && !content.note) {
      return toast.error('No note to add...');
    }
    if (modal.exerciseIndex != undefined) {
      modal.type == 'exercise'
        ? dispatch(
            modal.action({
              exerciseIndex: modal.exerciseIndex,
              exercise: content,
            })
          )
        : dispatch(
            modal.action({
              exerciseIndex: modal.exerciseIndex,
              note: content.note,
            })
          );
    } else if (modal.type == 'exercise') {
      dispatch(modal.action(content));
    } else if (modal.type == 'note') {
      dispatch(modal.action(content.note));
    } else {
      dispatch(modal.action());
    }
    setContent(initialState);
    handleClose();
  };

  const { workout } = useSelector((store) => store.workout);

  return (
    <Modal
      open={modal.open}
      onClose={() => {
        setContent(initialState);
        handleClose();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Wrapper /* sx={modalStyle} */>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {modal.id == 'skipWorkout' &&
            'Are you sure you want to skip this workout?'}
          {modal.id == 'markIncomplete' &&
            'Are you sure you want to mark this workout as incomplete?'}
          {modal.id == 'addExercise' && 'Add an exercise:'}
          {modal.id == 'addWorkoutNote' && 'Add a new workout note:'}
          {modal.id == 'addExerciseBefore' &&
            `Add an exercise before ${
              workout.exercises.find(
                (exercise, index) => index == modal.exerciseIndex
              ).exerciseName
            }:`}
          {modal.id == 'addExerciseAfter' &&
            `Add an exercise after ${
              workout.exercises.find(
                (exercise, index) => index == modal.exerciseIndex
              ).exerciseName
            }:`}
          {modal.id == 'removeSet' && 'Are you sure you want to remove a set?'}
          {modal.id == 'addExerciseNote' &&
            `Add a new note for ${
              workout.exercises.find(
                (exercise, index) => index == modal.exerciseIndex
              ).exerciseName
            }:`}
          {modal.id == 'removeExercise' &&
            'Are you sure you want to remove this exercise?'}
        </Typography>
        {/* <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        {modal.type == 'note' && (
          <TextField
            autoFocus
            id='note'
            name='note'
            value={content.note}
            onChange={(e) => handleChange(e)}
            label='Note'
            type='text'
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
        )}
        {modal.type == 'exercise' && (
          <div
            className={
              !content.muscleGroup
                ? 'form'
                : `form border-bottom exercise-container ${content.muscleGroup}`
            }
          >
            {content.muscleGroup && <h5>{content.muscleGroup}</h5>}
            <div className='exercise-details form-center'>
              <FormRowSelect
                name={!content.muscleGroup ? 'muscleGroup' : 'exerciseName'}
                labelText=''
                value={
                  !content.muscleGroup
                    ? content.muscleGroup
                    : content.exerciseName
                }
                list={
                  !content.muscleGroup
                    ? ['Select a muscle group / exercise type', ...muscleGroups]
                    : [
                        'Select an exercise',
                        ...getExercises(content.muscleGroup),
                        /* .filter(
                      (listItem) =>
                        listItem.muscleGroup === exercise.muscleGroup ||
                        listItem.exerciseType === exercise.muscleGroup
                    ) */
                      ]
                }
                handleChange={(e) => handleChange(e)}
                className='select-exercise'
              />
              {content.muscleGroup && (
                <>
                  <FormRowSelect
                    name='repRange'
                    labelText='Rep range: '
                    value={content.repRange}
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
                      '10-15',
                      '12-15',
                      '15-20',
                      '20-25',
                      '25-30',
                    ]}
                    handleChange={(e) => handleChange(e)}
                    className='select-reps'
                  />
                  <FormRow
                    type='number'
                    name='sets'
                    labelText='Sets:'
                    value={content.sets}
                    handleChange={(e) => handleChange(e)}
                    className='select-sets'
                    step='1'
                    min='1'
                  />
                  <FormRow
                    type='textarea'
                    name='note'
                    labelText=''
                    value={content.note}
                    placeholder='Additional notes'
                    handleChange={(e) => {
                      handleChange(e);
                    }}
                    className='exercise-notes'
                  />
                </>
              )}
            </div>
          </div>
        )}
        <div className='btn-container'>
          <button
            className='btn clear-btn'
            onClick={() => {
              setContent(initialState);
              handleClose();
            }}
          >
            Cancel
          </button>
          <button className='btn submit-btn' onClick={handleSubmit}>
            {modal.type != 'confirm' ? `Add ${modal.type}` : 'Confirm'}
          </button>
        </div>
      </Wrapper>
    </Modal>
  );
};
export default WorkoutModal;
