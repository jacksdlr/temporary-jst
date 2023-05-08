import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, DesktopSidebar, MobileSidebar } from '../../components';
import Wrapper from '../../assets/css-wrappers/SharedLayout';

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.navbar);
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* <DesktopSidebar /> */}
        <MobileSidebar />
        <div>
          <Navbar />
          <div className='main-container'>
            <DesktopSidebar />

            <div
              className={
                isSidebarOpen ? 'dashboard-page open-sidebar' : 'dashboard-page'
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
