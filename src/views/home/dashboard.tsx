import React, { useState, useEffect, useContext, Fragment } from 'react';
import { globalStoreContext } from '../../components/context/globalStore';
import './dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const { state, dispatch } = useContext(globalStoreContext);

  useEffect(() => {
    if (state.token === null) {
      window.location.replace('http://localhost:3000/');
    } else {
      fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          dispatch({ type: 'SET_USER', payload: data});
          setLoading(false);
        });
    }
  }, []);

  function isUserReady(): boolean {
    if(loading === true) { return false }
    if(state.user) { return true }
    return false;
  }

  return (
    <div>
      {isUserReady() && (
        <Fragment>
        <div className="dash-content">
          <h1>Dashboard</h1>
          <h2>Hello {state.user?.email}!</h2>
        </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;