import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LINKS = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'Starred',
    to: '/starred',
  },
];

const Navs = () => {
  return (
    <div>
      <NavList>
        <Box>
          {LINKS.map(item => (
            <li key={item.to}>
              <LinkStyled to={item.to}>{item.text}</LinkStyled>
            </li>
          ))}
        </Box>
      </NavList>
    </div>
  );
};

export default Navs;

const Box = styled.div`
  border: 2px black solid;
  display: flex;
  width: fit-content;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.mainColors.dark};
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 0 30px;
  padding: 0;
`;

const LinkStyled = styled(NavLink)`
  display: block;
  padding: 3px 15px;
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.mainColors.light};
  background-color: ${({ theme }) => theme.mainColors.dark};
  border-radius: 16px;
  &.active {
    color: ${({ theme }) => theme.mainColors.grey};
    box-shadow: inset 0px 0px 5px 0px ${({ theme }) => theme.mainColors.light};
    &:after {
      content: '';
      position: absolute;
      display: block;
      height: 2px;
      left: 0%;
      bottom: 0;
      background-color: ${({ theme }) => theme.mainColors.grey};
      animation: slide-in 3s ease-in forwards;
      @keyframes slide-in {
        from {
          left: 50%;
          width: 0;
        }
      }
    }
  }
`;
