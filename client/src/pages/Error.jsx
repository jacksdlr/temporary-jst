import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/css-wrappers/Error';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='Page not found' />
        <h3>Page Not Found</h3>
        <p>
          The page you are looking for can't be found, make sure you typed the
          correct address!
        </p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
