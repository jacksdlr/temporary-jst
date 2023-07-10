import { directory } from '../../utils/directory';
import {
  AiOutlineMore,
  AiOutlineYoutube,
  AiOutlineFile,
  AiOutlineRise,
  AiOutlineFall,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
} from 'react-icons/ai';
import { CgInsertBefore, CgInsertAfter } from 'react-icons/cg';
import { TbTargetArrow } from 'react-icons/tb';
import { MdDoNotDisturb } from 'react-icons/md';
import Wrapper from '../../assets/wrappers/Exercise';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleSetChange,
  addExerciseBefore,
  addExerciseAfter,
  addSet,
  removeSet,
  addExerciseNote,
  disableSetProgression,
  removeExercise,
} from '../../features/workout/workoutSlice';
import { useEffect, useState } from 'react';
import Options from '../Options';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const Exercise = ({
  name,
  sets,
  repRange,
  changeWeight,
  notes,
  exerciseIndex,
  exerciseId,
}) => {
  const dispatch = useDispatch();

  const [prevState, setPrevState] = useState(sets);

  const { workout, recoveryModal } = useSelector((store) => store.workout);

  const exerciseInfo = directory
    .map((item) => {
      if (item.exercises) {
        const exercise = item.exercises.find(
          (exercise) => exercise.name == name
        );
        if (exercise) {
          return { muscle: item.muscleGroup, ...exercise };
        }
      }
    })
    .filter((item) => item)[0];

  let repsOptions = [];
  for (let i = 0; i <= 100; i++) {
    repsOptions.push(i);
  }
  let repsInReserveOptions = [];
  for (let i = 0; i <= 10; i++) {
    repsInReserveOptions.push(i);
  }

  const handleChange = (e, exerciseIndex, setIndex) => {
    const input = e.target.name;
    const value = e.target.value;

    dispatch(handleSetChange({ input, value, exerciseIndex, setIndex }));
  };

  const showTargetInfo = (e) => {
    console.log('show info here');
  };

  return (
    <Wrapper>
      <div className='container'>
        <div className='info'>
          <p className={`muscle ${exerciseInfo.muscle}`}>
            {exerciseInfo.muscle}
          </p>
          <div className='links'>
            <Button
              /* aria-controls={anchorEl ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={anchorEl ? 'true' : undefined}
              onClick={handleClick}*/
              className='options'
              onClick={() => toast.warning('Feature in development...')}
            >
              <AiOutlineYoutube size={'1.75rem'} />
            </Button>
            <Options
              options={[
                {
                  text: 'Add exercise before',
                  icon: <CgInsertAfter />,
                  action: () =>
                    dispatch(
                      addExerciseBefore(/* open modal to create exercise and pass this function */)
                    ),
                },
                {
                  text: 'Add exercise after',
                  icon: <CgInsertBefore />,
                  action: () =>
                    dispatch(
                      addExerciseAfter(/* open modal to create exercise and pass this function */)
                    ),
                },
                {
                  text: 'Add set',
                  icon: <AiOutlinePlus />,
                  action: () =>
                    dispatch(
                      addSet({
                        newSet: {
                          weight: sets[sets.length - 1].weight,
                          targetReps: repRange.match(/^\d+/)[0],
                          targetRIR: sets[sets.length - 1].targetRIR,
                          newSet: true,
                        },
                        id: exerciseId,
                      })
                    ),
                },
                {
                  text: 'Remove set',
                  icon: <AiOutlineMinus />,
                  action: () => dispatch(removeSet({ exerciseIndex })),
                },
                {
                  text: 'Add note',
                  icon: <AiOutlineFile />,
                  action: () =>
                    dispatch(
                      addExerciseNote(/* open modal to create note and pass this function */)
                    ),
                },
                {
                  text: 'Disable set progression',
                  icon: <MdDoNotDisturb />,
                  action: () =>
                    dispatch(disableSetProgression({ exerciseIndex })),
                },
                {
                  text: 'Remove exercise',
                  icon: <AiOutlineDelete />,
                  action: () => dispatch(removeExercise({ exerciseIndex })),
                },
              ]}
              iconSize='1.75rem'
            />
            {/* <AiOutlineMore
              className='options'
              size={'1.75rem'}
              onClick={() => console.log('open menu')}
            /> */}
          </div>
        </div>
        <h4 className='exercise-title'>
          {name} <span className='equipment'>{exerciseInfo.equipment}</span>
        </h4>
        {notes.length != 0 && (
          <div className='notes'>
            {notes.map((note) => (
              <div className='note'>
                <AiOutlineFile />
                <p>{note}</p>
              </div>
            ))}
          </div>
        )}
        <div className='sets'>
          <div className='sets-header'>
            <p>Weight</p>
            <p>Reps</p>
            <p>RIR</p>
          </div>
          {sets.map((set, setIndex) => {
            let {
              weight,
              repetitions,
              repsInReserve,
              targetReps,
              targetRIR,
              newSet,
            } = set;

            let prevWeight = prevState[prevState.length - 1].weight;
            if (prevState[setIndex]) {
              prevWeight = prevState[setIndex].weight;
            }

            if (!set.newSet) {
              if (
                weight > prevWeight &&
                targetReps > 5 &&
                changeWeight != 'Increase'
              ) {
                targetReps--;
              } else if (
                weight == prevWeight &&
                targetReps > 5 &&
                changeWeight == 'Increase'
              ) {
                targetReps++;
              } else if (weight < prevWeight) {
                targetReps++;
                targetReps++;
              }
            }

            return (
              <div key={set._id} className='set'>
                <div className='input-container'>
                  <input
                    className='form-input'
                    type='number'
                    name='weight'
                    step='0.01'
                    min='0'
                    value={weight}
                    onChange={(e) => handleChange(e, exerciseIndex, setIndex)}
                  />
                  {/* add hover information to these */}
                  {changeWeight == 'Increase' && weight <= prevWeight && (
                    <AiOutlineRise className={'increase-weight'} />
                  )}
                  {changeWeight == 'Decrease' && weight >= prevWeight && (
                    <AiOutlineFall className={'decrease-weight'} />
                  )}
                </div>
                <div className='input-container'>
                  <select
                    className='form-select'
                    name='repetitions'
                    value={repetitions || ''}
                    onChange={(e) => handleChange(e, exerciseIndex, setIndex)}
                    required
                  >
                    <option value='' disabled hidden>
                      {targetReps}
                    </option>
                    {repsOptions.map((reps) => (
                      <option key={reps} value={reps}>
                        {reps}
                      </option>
                    ))}
                  </select>
                  {repetitions == undefined &&
                    workout.microcycle != 1 &&
                    !newSet && (
                      <TbTargetArrow
                        className={'target-reps'}
                        onMouseOver={showTargetInfo}
                      />
                    )}
                </div>
                <div className='input-container'>
                  <select
                    className='form-select'
                    name='repsInReserve'
                    value={repsInReserve || ''}
                    onChange={(e) => handleChange(e, exerciseIndex, setIndex)}
                    required
                  >
                    <option value='' disabled hidden>
                      {targetRIR}
                    </option>
                    {repsInReserveOptions.map((reps) => (
                      <option key={reps} value={reps}>
                        {reps}
                      </option>
                    ))}
                  </select>
                  {repsInReserve == undefined &&
                    (workout.microcycle == 1 || newSet) && (
                      <TbTargetArrow className={'target-rir'} />
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};
export default Exercise;
