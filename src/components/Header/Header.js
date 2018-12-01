import React from 'react';

import './Header.css';

const Header = props => {
  const {
    intro,
    welcomeText
  } = props

  return (
    <div className="shape">
      <h1 className="introText">{intro}</h1>
      <hr/>
      <h3 className="">{welcomeText}</h3>
      <hr />
    </div>
  );
}
export default Header;