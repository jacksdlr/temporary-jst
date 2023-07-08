import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineUser,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import { clearStore, logoutUser } from '../features/user/userSlice';
import { toggleSidebar } from '../features/navbar/navbarSlice';
import { Link } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { isSidebarOpen } = useSelector((store) => store.navbar);

  const isMobile = () => window.innerWidth < 992;

  return (
    <>
      <Wrapper>
        <div className='nav-center'>
          <button
            className='toggle-btn'
            onClick={() => dispatch(toggleSidebar())}
          >
            {isSidebarOpen && isMobile() ? (
              <AiOutlineMenuFold />
            ) : !isSidebarOpen && isMobile() ? (
              <AiOutlineMenuUnfold />
            ) : isSidebarOpen ? (
              <AiOutlineMenuUnfold />
            ) : (
              <AiOutlineMenuFold />
            )}
          </button>
          <div>
            <Link
              to='/'
              onClick={() => {
                isSidebarOpen && dispatch(toggleSidebar());
              }}
            >
              <Logo />
            </Link>
            <h3 className='logo-text'>Dashboard</h3>
          </div>
          <div className='btn-container'>
            <button className='btn' onClick={() => setShowLogout(!showLogout)}>
              <AiOutlineUser /* User icon */ />
              {user?.name.split(' ')[0]}
              {showLogout ? (
                <AiFillCaretUp />
              ) : (
                <AiFillCaretDown /* Dropdown icon */ />
              )}
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
              <button
                className='dropdown-btn'
                onClick={() =>
                  dispatch(clearStore('Logout successful! Come back soon!'))
                }
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
      {/* <MobileSidebar /> */}
    </>
  );
};
export default Navbar;
