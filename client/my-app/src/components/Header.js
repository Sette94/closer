import React from 'react';
import { NavLink } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import '../index.css';
import { logout } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Header() {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Dispatch the logout action to clear user information
        dispatch(logout());
        navigate(`/`); // Redirect to login page or any other page after logout
    };

    return (
        <div>
            <h1 className="header">Header: MLB Closer</h1>
            <PrimeReactProvider>
                <nav className='nav'>
                    <NavLink
                        to="/home"
                        className="nav-link"
                    >
                        Home
                    </NavLink>
                    <br></br>
                    {isAuthenticated && (
                        <NavLink
                            to="/"
                            className="nav-link"
                            onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                    )}
                </nav>
            </PrimeReactProvider>
        </div>
    );
}

export default Header;
