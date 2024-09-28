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
  background-color: ${({ theme }) => theme.mainColors.grey};
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
  background-color: ${({ theme }) => theme.mainColors.grey};
  border-radius: 16px;
  &:hover {
    color: ${({ theme }) => theme.mainColors.light};
    background-color: ${({ theme }) => theme.mainColors.dark};
  }
  &.active {
    color: ${({ theme }) => theme.mainColors.light};
    box-shadow: inset 0px 0px 1px 0px;
    pointer-events: none; /* Disables all pointer events (click, hover, etc.) */
    background-color: ${({ theme }) => theme.mainColors.dark};

    &:after {
      content: '';
      position: absolute;
      display: block;
      height: 2px;
      left: 0%;
      bottom: 0;
      background-color: ${({ theme }) => theme.mainColors.dark};
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
