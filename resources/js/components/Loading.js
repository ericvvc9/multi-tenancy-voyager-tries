import React from 'react';
import logo from '../assets/img/logo.png'

export default class Loading extends React.Component{
  render() {
    return (
      <div className="loading-back">
        <img
          style={{
            width:120
          }}
          className="animate__animated animate__infinite infinite animate__pulse" src={logo} />
      </div>
    )
  }
}