import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AppTitle from './AppTitle';
import Navs from './Navigation';

const MainLayout = () => {
  return (
    <MainWrapper>
      <AppTitle />
      <Navs />
      <Outlet />
    </MainWrapper>
  );
};

export default MainLayout;

const MainWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainColors.background};
  color: ${({ theme }) => theme.mainColors.per};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
