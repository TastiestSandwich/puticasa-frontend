import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './navbar.css';
import Logo from '../logo/logo';
import { globalStoreContext } from '../context/globalStore';
import { useHistory } from "react-router-dom";

const Navbar = () => {

  const {state, dispatch} = useContext(globalStoreContext);
  const history = useHistory();

  const renderExitHouse = () => {
    if (state.house === null) {
      return (<></>)
    }

    return (
      <Button color="warning" onClick={handleExitHouse}>Exit House</Button>
    )
  }

  const handleExitHouse = () => {
    dispatch({type: "EXIT_HOUSE"})
    history.push("/welcome")
  }

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
          { renderExitHouse() }
          <div>
            <Link to='/logout'>
              <Button color="danger">Logout</Button>
            </Link>
          </div>
        </div>
      </div>
     )}
    </nav>
  );
};

export default Navbar;