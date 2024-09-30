import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useDarkMode } from './Components/common/UseDarkMode';
import MainLayout from './Components/MainLayout';
import { DarkModeIcon, LightModeIcon } from './Components/ThemeIcons';
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';
import { GlobalTheme } from './Theme';

const queryClient = new QueryClient();
// Use the hook

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalTheme isDarkMode={isDarkMode}>
        <HashRouter>
          <div>
            <IconsContainer>
              <ThemeIconWrapper onClick={toggleTheme}>
                {isDarkMode ? (
                  <LightModeIcon toggleDarkMode={toggleTheme} />
                ) : (
                  <DarkModeIcon toggleLightMode={toggleTheme} />
                )}
              </ThemeIconWrapper>
            </IconsContainer>
          </div>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/starred" element={<Starred />} />
            </Route>

            <Route path="/show/:showId" element={<Show />} />

            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </HashRouter>
      </GlobalTheme>
    </QueryClientProvider>
  );
}

export default App;

const IconsContainer = styled.div`
  display: flex; /* Use flexbox for layout */
  justify-content: flex-end; /* Align items to the right */
  margin-bottom: 10px; /* Adjust as needed */
  margin-top: -4px;
`;

const ThemeIconWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`;
