import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainLayout from './Components/MainLayout';
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/starred" element={<Starred />} />
        </Route>

        <Route path="/show/:showId" element={<Show />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
