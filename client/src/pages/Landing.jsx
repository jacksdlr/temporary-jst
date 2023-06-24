// Maybe change the color of this (undraw.co)
import main from '../assets/images/main.svg';
import Wrapper from '../assets/css-wrappers/Landing';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>{<Logo />}</nav>
      <div className='container page'>
        <div className='info'>
          <h1>Hypertrophy Workout Training App</h1>
          <p>
            Get <span>J</span>acked, <span>S</span>tacked, and <span>T</span>
            racked by creating your next custom training plan with
            auto-generating workouts that will keep track of your progress. All
            you have to do is log your numbers and <span>JUST</span> workout!
          </p>
          <Link to='/login' className='btn btn-hero'>
            Login / Register
          </Link>
        </div>
        {/* Temporary image */}
        <img
          src={main}
          alt='Landing page splash image'
          className='img main-img main1'
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
