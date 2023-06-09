import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/MobileSidebar';
import Logo from './Logo';
import { toggleSidebar } from '../features/navbar/navbarSlice';
import { AiOutlineClose } from 'react-icons/ai';
import NavLinks from './NavLinks';

const MobileSidebar = () => {
  const dispatch = useDispatch();

  const { isSidebarOpen } = useSelector((store) => store.navbar);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <NavLinks toggleSidebar={() => dispatch(toggleSidebar())} />
        </div>
      </div>
    </Wrapper>
  );
};
export default MobileSidebar;
