import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext.jsx';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, role, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo"><Link to="/">QR Image App</Link></div>

        <button className="hamburger" onClick={() => setOpen(o => !o)}>
          <span/><span/><span/>
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/scan">Scan QR</Link>
{role !== 'guest' && <Link className="nav-link" to="/create-album">Novi album</Link>}
          {role === 'admin' && <Link className="nav-link" to="/admin">Admin</Link>}
          {!user && <Link className="nav-link" to="/login">Login</Link>}
          {!user && <Link className="nav-link" to="/register">Register</Link>}
          {user && (
            <>
              <span className="nav-user">{user.email}</span>
              <button className="nav-logout" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
