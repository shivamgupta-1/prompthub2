import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Login';
import './App.css';

/**
 * App Component
 *
 * Main application component that serves as the root wrapper.
 * Configures routing for all pages including Home (Login).
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
