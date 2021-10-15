import React, { useState, useEffect, useContext, Fragment } from 'react';
import { globalStoreContext } from '../../components/context/globalStore';
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const { state, dispatch } = useContext(globalStoreContext);
  const history = useHistory();

  useEffect(() => {
    if (state.token === null) {
      // go back to login
      history.push('/');
    } else if (state.user === null || state.house === null) {
      // go back to welcome 
      history.push('/welcome')
    } else {
      // load dashboard
      setLoading(false)
    }
  })

  const residentTypeNames: String[] = ["GUEST", "TENANT", "ADMIN"]
  const residentType: String = state.resident !== null ? residentTypeNames[state.resident.type] : ""

  return (
    <div>
      {!loading && (
        <Fragment>
        <div className="dashboard-content">
          <h2>You are {state.user?.email}</h2>
          <h2>Living in {state.house?.name}</h2>
          <h2>As a {residentType}</h2>
        </div>
        </Fragment>
      )}
    </div>
  )
}

export default Dashboard