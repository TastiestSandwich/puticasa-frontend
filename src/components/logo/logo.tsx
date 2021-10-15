import React from 'react';
import './logo.css';
import putilogo from '../../images/puticasa.png'


export default class Logo extends React.Component {

  render() {

    return (
      <img src={putilogo} alt="puticasa logo" title="olee la puticasa"/>
    )
  }
}