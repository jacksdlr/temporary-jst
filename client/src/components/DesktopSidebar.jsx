import { useSelector } from 'react-redux';
import Wrapper from '../assets/css-wrappers/DesktopSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';

const DesktopSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.navbar);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default DesktopSidebar;
