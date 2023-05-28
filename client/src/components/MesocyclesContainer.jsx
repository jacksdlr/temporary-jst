import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Mesocycle from './Mesocycle';
import Loading from './Loading';
import Wrapper from '../assets/css-wrappers/MesocyclesContainer';
import { getAllMesocycles } from '../features/allMesocycles/allMesocyclesSlice';

const MesocyclesContainer = () => {
  const dispatch = useDispatch();

  const { mesocycles, isLoading } = useSelector((store) => store.allMesocycles);

  useEffect(() => {
    dispatch(getAllMesocycles());
  }, []);

  // const workouts = user.mesocycles.map((mesocycle) => mesocycle.sessions);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
        <h2>Loading mesocycles...</h2>
      </Wrapper>
    );
  }

  if (mesocycles.length === 0) {
    return (
      <Wrapper>
        <h2>No mesocycles to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>Mesocycles Info</h5>
      <div className='workouts'>
        {mesocycles.map((mesocycle, index) => {
          console.log(mesocycle);
          return <Mesocycle key={index} {...mesocycle} />;
        })}
      </div>
    </Wrapper>
  );
};
export default MesocyclesContainer;
