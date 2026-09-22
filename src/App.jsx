import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ItemCatalog from './pages/ItemCatalog';
import NewAudit from './pages/NewAudit';
import CorrectiveActions from './pages/CorrectiveActions';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="catalog" element={<ItemCatalog />} />
          <Route path="audit" element={<NewAudit />} />
          <Route path="actions" element={<CorrectiveActions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
