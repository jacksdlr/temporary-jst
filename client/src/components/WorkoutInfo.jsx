import Wrapper from '../assets/wrappers/WorkoutInfo';

const WorkoutInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon} </span>
      <span className='text'>{text} </span>
    </Wrapper>
  );
};
export default WorkoutInfo;
