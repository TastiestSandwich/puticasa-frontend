import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logo from '../logo/logo';
import { globalStoreContext } from '../context/globalStore';

const Navbar = () => {

  const {state, dispatch} = useContext(globalStoreContext);

  return (
    <nav>
    {state.user && (
      <div className="navbar">
        <div className="nav-home">
          <div className="nav-logo">
            <Link to='/dashboard'>
              <Logo />
            </Link>
          </div>
          <div className="nav-title">
            <h1>Puticasa</h1>
          </div>
        </div>
        <div className="nav-content">
          <div>
            <Link to='/logout'>Logout</Link>
          </div>
        </div>
      </div>
     )}
    </nav>
  );
};

export default Navbar;