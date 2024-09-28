import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  fontFamily: 'Roboto, sans-serif',
  mainColors: {
    blue: '#2400ff',
    grey: '#959595',
    dark: '#282828',
    light: '#e2e2e2',
  },
};

const GlobalStyles = createGlobalStyle`
    body{
        font-family: ${({ theme }) => theme.fontFamily};
        font-size: 18px;
        margin: 0;
        padding-top: 40px;
        padding-left: 15px;
        padding-right: 15px;
    }
`;

export const GlobalTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
