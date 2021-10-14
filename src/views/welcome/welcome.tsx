import React, { useState, useEffect, useContext, Fragment } from 'react';
import { globalStoreContext } from '../../components/context/globalStore';
import { Resident } from './houseCard/houseTypes';
import HouseCard from './houseCard/houseCard';
import './welcome.css';

const Welcome = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [residents, setResidents] = useState([] as Resident[]);

  const { state, dispatch } = useContext(globalStoreContext);

  useEffect(() => {
    if (state.token === null) {
      // go back to login
      window.location.replace('http://localhost:3000/');
    } else if (state.user === null) {
      // fetch user
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
          setLoadingUser(false);
        });
    } else if (state.activeHouse === null) {
      // fetch houses
      const url = 'http://127.0.0.1:8000/api/residents/'
      console.log('Making call at ' + url)
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setResidents(data as Resident[])
          setLoadingHouses(false);
        })
      
    } else {
      // redirect to home
    }

    setLoadingUser(false);
  }, []);

  function isUserReady(): boolean {
    if(loadingUser === true) { return false }
    if(state.user) { return true }
    return false;
  }

  function areResidentsReady(): boolean {
    if(loadingHouses === true) { return false }
    if(residents) { return true }
    return false;
  }

  function renderHouses(residents: Resident[]) {
    if(!areResidentsReady) {
      return (<div></div>)
    
    } else {
      return (
      <>
      <div className="housecard-tenant">
        <h3>You live here</h3>
        <div className="housecard-tenant-list">
        { residents.map((resident) => (
           <HouseCard resident={resident} key={resident.id} />
         ))}
        </div>
      </div>
      <div className="housecard-guest">
        <h3>You have visited</h3>
        <div className="housecard-guest-list">
        { residents.map((resident) => (
           <HouseCard resident={resident} key={resident.id} />
         ))}
        </div>
      </div>
      </>
      )
    }
  }

  return (
    <div>
      {isUserReady() && (
        <Fragment>
        <div className="welcome-content">
          <h2>Welcome {state.user?.email}!</h2>
        </div>
        </Fragment>
      )}
      <div className="welcome-housecards">
        { renderHouses(residents) }
      </div>
    </div>
  );
};

export default Welcome;