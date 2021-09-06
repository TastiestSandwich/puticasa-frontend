import React from 'react';
import './start.css';
import Logo from '../../components/logo/logo';
import { Button } from 'reactstrap';


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
          <Button
            size="lg"
            outline color="success"
            onClick={() => alert("OLEEEE")}>
          COME IN
          </Button>
        </div>
      </main>
      )
  }
}