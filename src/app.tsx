import { Route, Routes } from 'react-router';
import ReaderPage from '@/pages/reader-page';

function App() {
  return (
    <Routes>
      <Route path="*" element={<ReaderPage />} />
    </Routes>
  );
}

export default App;
