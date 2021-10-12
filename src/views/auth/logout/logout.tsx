import React, { useState, useEffect, useContext, Fragment } from 'react';
import { globalStoreContext } from '../../../components/context/globalStore';

const Logout = () => {
  const [loading, setLoading] = useState(true);

  const {state, dispatch} = useContext(globalStoreContext);

  useEffect(() => {
    if (state.token == null) {
      window.location.replace('http://localhost:3000/');
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = e => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/v1/users/auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'LOGOUT'})
        window.location.replace('http://localhost:3000/');
      });
  };

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Are you sure you want to logout?</h1>
          <input type='button' value='Logout' onClick={handleLogout} />
        </Fragment>
      )}
    </div>
  );
};

export default Logout;