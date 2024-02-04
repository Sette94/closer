import React from 'react';
import { NavLink } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import '../index.css';

function Header() {
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

                </nav>
            </PrimeReactProvider>

        </div>
    );
}

export default Header;