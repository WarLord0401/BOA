import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styled from 'styled-components';

export const Hamburger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use the navigate hook

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Navigation functions
  const navigateToHome = () => {
    navigate('/');
    toggleMenu(); // Close the menu after navigating
  };

  const navigateBack = () => {
    navigate(-1);
    toggleMenu(); // Close the menu after navigating
  };

  return (
    <>
      {/* Hamburger Icon visible on mobile screens */}
      <HamburgerMenu onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerMenu>

      {/* Full-screen Overlay Menu for Mobile */}
      <MenuOverlay isOpen={isMenuOpen}>
        <MenuItems>
          <li onClick={navigateToHome}>Home Page</li>
          <li onClick={navigateBack}>Go Back</li>
        </MenuItems>
      </MenuOverlay>
    </>
  );
};

const HamburgerMenu = styled.div`
  display: none; /* Initially hidden */
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 999;
  margin-top: -62px;

  /* Hamburger bars */
  span {
    background: ${({ theme }) => theme.mainColors.shade};
    display: block;
    width: 100%;
    height: 4px;
    margin: 6px 0;
    transition: all 0.3s;
  }

  @media (max-width: 768px) {
    display: block; /* Show hamburger on mobile screens */
  }
`;

const MenuOverlay = styled.div`
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? '250px' : '0')}; /* Toggle open/close */
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => `${theme.mainColors.shade}98`};

  overflow-x: hidden;
  transition: width 0.3s ease-in-out; /* Slide transition */
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 769px) {
    display: none; /* Hide overlay on desktop screens */
  }
`;

const MenuItems = styled.ul`
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;

  li {
    color: ${({ theme }) => theme.mainColors.light};
    font-size: 25px;
    font-weight: 800;
    padding: 20px 0;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.mainColors.dark};
    }
  }

  @media (prefers-color-scheme: dark) {
    /* Darker background for dark mode */
    color: #fff; /* Ensure text is visible in dark mode */
  }
`;
