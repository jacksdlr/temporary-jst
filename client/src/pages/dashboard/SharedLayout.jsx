import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, DesktopSidebar, MobileSidebar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.navbar);
  return (
    <Wrapper>
      <main className='dashboard'>
        <Navbar />
        <div className='main-container'>
          <MobileSidebar />
          <DesktopSidebar />
          <div
            className={
              // Sidebar open by default on desktop, so when isSidebarOpen is true it is actually false
              isSidebarOpen ? 'dashboard-page' : 'dashboard-page open-sidebar'
            }
          >
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
