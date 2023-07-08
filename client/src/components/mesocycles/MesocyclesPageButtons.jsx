import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import Wrapper from '../../assets/wrappers/PageButtonContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../features/mesocycles/mesocyclesSlice';

const PageButtonContainer = () => {
  const { numberOfPages, page } = useSelector((store) => store.mesocycles);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numberOfPages) {
      newPage == 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < numberOfPages) {
      newPage == numberOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <AiOutlineDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={pageNumber === page ? 'page-btn active' : 'page-btn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        next
        <AiOutlineDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageButtonContainer;
