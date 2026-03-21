import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;