import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/css-wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleChange,
  clearFilters,
} from '../features/allWorkouts/allWorkoutsSlice';

const WorkoutsSearchContainer = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    searchMicrocycle,
    searchSession,
    searchStatus,
    statusOptions,
    searchMuscle,
    muscleOptions,
    sort,
    sortOptions,
  } = useSelector((store) => store.allWorkouts);

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
            type='number'
            labelText='Microcycle'
            name='microcycle'
            value={searchMicrocycle}
            handleChange={handleSearch}
          />
          <FormRow
            type='number'
            labelText='Session'
            name='session'
            value={searchSession}
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
          {/* search by muscle */}
          <FormRowSelect
            labelText='Muscle Group'
            name='searchMuscle'
            value={searchMuscle}
            handleChange={handleSearch}
            list={['All', ...muscleOptions]}
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
export default WorkoutsSearchContainer;
