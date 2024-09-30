import { ThemeProvider, createGlobalStyle } from 'styled-components';

const lightTheme = {
  fontFamily: 'Roboto, sans-serif',
  mainColors: {
    per: '#294939',
    grey: '#6851d6',
    dark: '#bd4d4d',
    light: '#ffffff',
    shade: '#353535',
    background: '#ffffff',
  },
};

const darkTheme = {
  fontFamily: 'Roboto, sans-serif',
  mainColors: {
    per: '#adf4d3',
    grey: '#bd4d4d',
    dark: '#6851d6',
    light: '#353535',
    shade: '#ffffff',
    background: '#121212',
  },
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 18px;
    margin: 0;
    padding-top: 40px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: ${({ theme }) => theme.mainColors.background}; // Set background color based on theme
    color: ${({ theme }) => theme.mainColors.color}; // Set text color based on theme
  }
`;

export const GlobalTheme = ({ children, isDarkMode }) => {
  const theme = isDarkMode ? darkTheme : lightTheme; // Toggle between light and dark themes

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
