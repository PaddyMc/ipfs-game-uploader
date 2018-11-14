import React from 'react';

import SmartContract from '../../containers/Upload/Upload.container';
import Game from '../../containers/Game/Game.container';
import Home from '../../containers/Home/Home';
import Funder from '../../containers/Funder/Funder.container';
import Profile from '../../containers/Profile/Profile.container';

import GameRenderer from '../../components/GameRenderer/GameRenderer.container';

import { Route } from 'react-router-dom'

class Routes extends React.Component {  
  render() {    
    return (
      <div>
          <Route exact path="/" component={Home}/>
          <Route path="/game" component={Game}/>
          <Route exact path="/smartcontract" component={SmartContract}/>
          <Route exact path="/funder" component={Funder}/>
          <Route exact path="/profile" component={Profile}/>

          <Route exact path="/game/:ipfsHash" component={GameRenderer} />

          {/* <Route exact path="/profile/:ethAddress" component={Profile}/> */}
      </div>
    );
  }
}
export default Routes