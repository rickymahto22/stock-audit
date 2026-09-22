import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>AuditApp</h3>
        <span className="user-badge">{user?.role}</span>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} end>
          Dashboard
        </NavLink>
        <NavLink to="/catalog" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          Item Catalog
        </NavLink>
        <NavLink to="/audit" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          New Audit
        </NavLink>
        <NavLink to="/actions" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          Corrective Actions
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="btn-secondary" style={{ width: '100%' }}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
