import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineBarChart,
  AiOutlineProfile,
} from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';

const links = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    text: 'Workout',
    path: 'workout',
    icon: <CgGym />,
  },
  {
    id: 3,
    text: 'All Workouts',
    path: 'all-workouts',
    icon: <AiOutlineCalendar />,
  },
  {
    id: 4,
    text: 'Create Meso',
    path: 'new-meso',
    icon: <AiOutlineBarChart />,
  },
  {
    id: 5,
    text: 'Profile',
    path: 'profile',
    icon: <AiOutlineProfile />,
  },
];

export default links;
