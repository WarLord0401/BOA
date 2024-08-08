import { Outlet } from 'react-router-dom';
import AppTitle from './AppTitle';
import Navs from './Navigation';

const MainLayout = () => {
  return (
    <div>
      <AppTitle />
      <Navs />
      <Outlet />
    </div>
  );
};

export default MainLayout;
