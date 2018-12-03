import React from 'react';

import './Header.css';

const Header = props => {
  const {
    intro,
    welcomeText
  } = props

  return (
    <div>
      <h1>{intro}</h1>
      <hr/>
      <h3>{welcomeText}</h3>
      <hr />
    </div>
  );
}
export default Header;