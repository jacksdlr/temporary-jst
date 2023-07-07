import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatItem';

const StatItem = ({ count, title, icon, color, background, link }) => {
  return (
    <Wrapper color={color} background={background}>
      <Link to={link}>
        <header>
          <span className='count'>{count}</span>
          <span className='icon'>{icon}</span>
        </header>
        <h5 className='title'>{title}</h5>
      </Link>
    </Wrapper>
  );
};
export default StatItem;
