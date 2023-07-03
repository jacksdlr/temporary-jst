import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/css-wrappers/DesktopSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';

const DesktopSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.navbar);
  return (
    <Wrapper>
      <div
        className={
          // Sidebar open by default on desktop, so when isSidebarOpen is true it is actually false
          isSidebarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'
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
