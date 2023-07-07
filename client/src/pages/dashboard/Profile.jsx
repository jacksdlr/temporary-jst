import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import {
  updateUserDetails,
  updateUserData,
} from '../../features/user/userSlice';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { UserDetails, UserData } from '../../components/profile';

const Profile = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <UserDetails />
      <UserData />
    </>
  );
};
export default Profile;
