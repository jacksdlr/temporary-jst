import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/css-wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleChange,
  clearFilters,
} from '../features/allMesocycles/allMesocyclesSlice';

const MesocyclesSearchContainer = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    search,
    searchStatus,
    statusOptions,
    searchGoal,
    goalOptions,
    searchMicrocycles,
    sort,
    sortOptions,
  } = useSelector((store) => store.allMesocycles);

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search workouts</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            labelText='Mesocycle name'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          <FormRow
            type='number'
            labelText='No. of microcycles'
            name='searchMicrocycles'
            value={searchMicrocycles}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='Status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['All', ...statusOptions]}
          />
          {/* search by goal */}
          <FormRowSelect
            labelText='Goal'
            name='searchGoal'
            value={searchGoal}
            handleChange={handleSearch}
            list={['All', ...goalOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            labelText='Sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleClear}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default MesocyclesSearchContainer;
