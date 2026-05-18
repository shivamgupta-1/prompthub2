import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar';
import RequireRole from './components/RequireRole';
import Home from './pages/Home/Home';
import { Dashboard } from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin"
          element={
            <RequireRole allowedRole="Admin">
              <Admin />
            </RequireRole>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;