import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  render() { 
    return (
      <div className="shape">
        <h1 className="introText">{this.props.intro}</h1>
        <hr/>
        <h3 className="">{this.props.welcomeText}</h3>
        <hr />
      </div>
    );
  } 
}
export default Header;