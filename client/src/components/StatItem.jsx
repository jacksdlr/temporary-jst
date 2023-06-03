import Wrapper from '../assets/css-wrappers/StatItem';

const StatItem = ({ count, title, icon, color, background }) => {
  return (
    <Wrapper color={color} background={background}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
