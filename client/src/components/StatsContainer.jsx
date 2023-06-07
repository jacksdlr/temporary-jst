import StatItem from './StatItem';
import { AiOutlineCalendar, AiOutlineFolderOpen } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import Wrapper from '../assets/css-wrappers/StatsContainer';
import { useSelector } from 'react-redux';

const StatsContainer = () => {
  const {
    user: { stats },
  } = useSelector((store) => store.user);

  const statsDetails = [
    {
      title: 'another stat',
      count: /* stats.something || */ 0,
      icon: <CgGym />,
      color: '#7bca56',
      background: '#f1ffee',
      link: '/profile',
    },
    {
      title: 'completed workouts',
      count: stats?.completedWorkouts || 0,
      icon: <AiOutlineCalendar />,
      color: '#647acb',
      background: '#e0e8f9',
      link: '/all-workouts',
    },
    {
      title: 'total mesocycles',
      count: stats?.totalMesocycles || 0,
      icon: <AiOutlineFolderOpen />,
      color: '#e9b949',
      background: '#fcefc7',
      link: '/mesocycles',
    },
  ];

  return (
    <Wrapper>
      {statsDetails.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
