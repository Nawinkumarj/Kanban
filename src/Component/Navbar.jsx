import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaHome, FaTasks, FaChartPie, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">TweetDeck Dashboard</div>
      </div>

      {/* desktop links */}
      <div className="navbar-links desktop-only">
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <FaHome style={{ marginRight: 6 }} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/kanban"
          onClick={closeMenu}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <FaTasks style={{ marginRight: 6 }} />
          <span>Kanban Board</span>
        </NavLink>
        <NavLink
          to="/analytics"
          onClick={closeMenu}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <FaChartPie style={{ marginRight: 6 }} />
          <span>Analytics</span>
        </NavLink>
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* desktop logout */}
        <button className="logout-btn desktop-only" onClick={handleLogout}>
          Logout
        </button>

        {/* mobile hamburger */}
        <button
          className="hamburger-btn mobile-only"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* mobile dropdown menu */}
      {isOpen && (
        <div className="mobile-menu">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <FaHome style={{ marginRight: 6 }} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/kanban"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <FaTasks style={{ marginRight: 6 }} />
            <span>Kanban Board</span>
          </NavLink>
          <NavLink
            to="/analytics"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <FaChartPie style={{ marginRight: 6 }} />
            <span>Analytics</span>
          </NavLink>
          <button className="logout-btn mobile-logout" onClick={() => { closeMenu(); handleLogout(); }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
