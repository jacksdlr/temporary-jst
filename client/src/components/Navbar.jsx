import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Wrapper from '../assets/css-wrappers/Navbar';
import Logo from './Logo';
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineUser,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import { logoutUser } from '../features/user/userSlice';
import { toggleSidebar } from '../features/navbar/navbarSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { isSidebarOpen } = useSelector((store) => store.navbar);

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={() => dispatch(toggleSidebar())}
        >
          {isSidebarOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>Dashboard</h3>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <AiOutlineUser /* User icon */ />
            {user?.name}
            {showLogout ? (
              <AiFillCaretUp />
            ) : (
              <AiFillCaretDown /* Dropdown icon */ />
            )}
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              className='dropdown-btn'
              onClick={() => dispatch(logoutUser('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
