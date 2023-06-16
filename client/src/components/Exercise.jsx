import { directory } from '../utils/directory';
import { AiOutlineMore, AiOutlineYoutube } from 'react-icons/ai';
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
                <input type='number' name='weight' step='0.01' min='0' />
                <input
                  type='number'
                  name='repetitions'
                  placeholder={targetReps}
                  step='1'
                  min='0'
                  max='100'
                />
                <input
                  type='number'
                  name='repsInReserve'
                  placeholder={targetRIR}
                  step='1'
                  min='0'
                  max='10'
                />
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};
export default Exercise;
