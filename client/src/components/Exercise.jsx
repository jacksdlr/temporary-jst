import { directory } from '../utils/directory';
import { AiOutlineMore, AiOutlineYoutube, AiOutlineAim } from 'react-icons/ai';
import Wrapper from '../assets/css-wrappers/Exercise';

const Exercise = ({ name, sets, notes }) => {
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

  return (
    <Wrapper>
      <div className='container'>
        <div className='info'>
          <p className={exerciseInfo.muscle}>{exerciseInfo.muscle}</p>
          <div className='links'>
            <AiOutlineYoutube
              className='options'
              size={'1.75rem'}
              onClick={() => console.log('open video')}
            />
            <AiOutlineMore
              className='options'
              size={'1.75rem'}
              onClick={() => console.log('open menu')}
            />
          </div>
        </div>
        <h4>
          {name} <span className='equipment'>{exerciseInfo.equipment}</span>
        </h4>
        <div className='sets'>
          <div className='sets-header'>
            <p>Weight</p>
            <p>Reps</p>
            <p>RIR</p>
          </div>
          <div className='notes'></div>
          {sets.map((set, index) => {
            const {
              weight,
              repetitions,
              repsInReserve,
              targetReps,
              targetRIR,
            } = set;
            return (
              <div className='set'>
                <input
                  className='form-input'
                  type='number'
                  name='weight'
                  step='0.01'
                  min='0'
                />
                <select className='form-select' name='repetitions' required>
                  <option value='' disabled selected hidden>
                    {targetReps}
                  </option>
                  {repsOptions.map((reps) => (
                    <option
                      value={reps}
                      /* selected={reps == targetReps ? true : false} */
                    >
                      {reps}
                    </option>
                  ))}
                </select>
                <select className='form-select' name='repsInReserve' required>
                  <option value='' disabled selected hidden>
                    {targetRIR}
                  </option>
                  {repsInReserveOptions.map((reps) => (
                    <option
                      value={reps}
                      /* selected={reps == targetRIR ? true : false} */
                    >
                      {reps}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};
export default Exercise;
