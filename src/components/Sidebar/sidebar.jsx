import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Navigation</h3>
            </div>
            <nav className="sidebar-nav">
                <Link 
                    to="/superadmin" 
                    className={`sidebar-link ${location.pathname === '/superadmin' ? 'active' : ''}`}
                >
                    Super Admin
                </Link>
                <Link 
                    to="/admin" 
                    className={`sidebar-link ${location.pathname === '/admin' ? 'active' : ''}`}
                >
                    Admin
                </Link>
                <Link 
                    to="/user" 
                    className={`sidebar-link ${location.pathname === '/user' ? 'active' : ''}`}
                >
                    User
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;