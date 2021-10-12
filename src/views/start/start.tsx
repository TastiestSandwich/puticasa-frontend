import React from 'react';
import './start.css';
import Logo from '../../components/logo/logo';
import Login from '../auth/login/login';
import Signup from '../auth/signup/signup';
// import { Button } from 'reactstrap';


interface StartState {

}

export default class Start extends React.Component<{}, StartState> {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {

    return(
      <main className="container">
        <div className="title-zone">
          <h1 className="main-title">WELCOME TO PUTICASA</h1>
          <div className="logo-zone">
            <Logo />
          </div>
        </div>
        <div className="body-zone">
          <div className="left-column">
            <Login />
          </div>
          <div className="right-column">
            <Signup />
          </div>
        </div>
      </main>
      )
  }
}