import React from 'react';
import { NavLink } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import '../index.css';
import { logout } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "../nav.css"

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
        <div class="container">
            <PrimeReactProvider>
                <nav class="navbar">
                    <h2 className='title'>Closer</h2>

                    {isAuthenticated ? (
                        <ul class="nav--list">
                            <li class="item"> <NavLink to="/home" className="nav-link">Home</NavLink></li>
                            <li class="item">  {isAuthenticated && (<NavLink to="/" className="nav-link" onClick={handleLogout}> Logout</NavLink>)}</li>
                        </ul>
                    ) : null}
                </nav>
            </PrimeReactProvider>

        </div>
    );
}

export default Header;
