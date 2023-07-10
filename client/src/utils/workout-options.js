import { useDispatch } from 'react-redux';
import { getWorkoutFromLocalStorage } from './localStorage';

const dispatch = useDispatch();

const workout = getWorkoutFromLocalStorage();

const options = [
  {
    id: 1,
    text: 'Skip workout',
    handleClick: dispatch(skipWorkout({ workout })),
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
    text: 'Mesocycles',
    path: 'mesocycles',
    icon: <AiOutlineFolderOpen />,
  },
  {
    id: 5,
    text: 'Create Meso',
    path: 'create-meso',
    icon: <AiOutlineBarChart />,
  },
  {
    id: 6,
    text: 'Profile',
    path: 'profile',
    icon: <AiOutlineProfile />,
  },
];

export default links;
