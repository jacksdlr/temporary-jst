import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Mesocycle from './Mesocycle';
import Loading from './Loading';
import Wrapper from '../assets/css-wrappers/MesocyclesContainer';
import { getAllMesocycles } from '../features/allMesocycles/allMesocyclesSlice';
import PageButtonContainer from './MesocyclesPageButtons';

const MesocyclesContainer = () => {
  const dispatch = useDispatch();

  const {
    mesocycles,
    isLoading,
    page,
    numberOfPages,
    totalMesocycles,
    search,
    searchStatus,
    searchGoal,
    searchMicrocycles,
    sort,
  } = useSelector((store) => store.allMesocycles);

  useEffect(() => {
    dispatch(getAllMesocycles());
  }, [page, search, searchStatus, searchGoal, searchMicrocycles, sort]);

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
      <h5>
        {totalMesocycles} mesocycle{totalMesocycles > 1 && 's'} found
      </h5>
      <div className='mesocycles'>
        {mesocycles.map((mesocycle, index) => {
          return <Mesocycle key={index} {...mesocycle} />;
        })}
      </div>
      {numberOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  );
};
export default MesocyclesContainer;
