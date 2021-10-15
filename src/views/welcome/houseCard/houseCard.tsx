import React, { useEffect, useState, useContext } from "react";
import { Resident, House, HouseResidentPayload } from '../../../components/context/storeTypes';
import { globalStoreContext } from '../../../components/context/globalStore';
import { useHistory } from "react-router-dom";
import './houseCard.css';

interface HouseProps {
  resident: Resident
}

const HouseCard = (props: HouseProps) => {

  const resident = props.resident
  const [loading, setLoading] = useState(true)
  const [house, setHouse] = useState(null as House | null)

  const { state, dispatch } = useContext(globalStoreContext);
  const history = useHistory();

  useEffect(() => {
    if (state.token !== null && house === null) {
      // fetch house
      fetch('http://127.0.0.1:8000/api/houses/' + resident.house + "/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setHouse(data as House)
          setLoading(false);
        });
      }
    }
  )

  const handleClick = () => {
    if (loading || house === null) { return }
    
    const payload = {
      house: house,
      resident: resident
    } as HouseResidentPayload

    dispatch({type: 'SET_HOUSE_RESIDENT', payload: payload})
    history.push('/dashboard');
  }

  if(!loading && house !== null) {
    return (
      <div className="house-card" onClick={handleClick}>
        <div className="house-name"> { house.name } </div>
        <div className="house-description"> { house.description } </div>
      </div>
    )
  
  } else {
    return <div className="house-loading"></div>
  }


}

export default HouseCard