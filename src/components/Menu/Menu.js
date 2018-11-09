import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SmartContract from '../../containers/SmartContract/SmartContract';
import Game from '../../containers/Game/Game';
import Home from '../../containers/Home/Home';
import Profile from '../../containers/Profile/Profile';
import Funder from '../../containers/Funder/Funder';

import GameLoader from '../../components/GameLoader/GameLoader';
import GameRenderer from '../../components/GameRenderer/GameRenderer';

import { Route } from 'react-router-dom'

class Menu extends React.Component {  
    render() {    
        return (
            <div>
                <div className="menubar">
                    <Link className="menubutton" to="/">Home</Link>
                    <Link className="menubutton" to="/game">Game</Link>
                    <Link className="menubutton" to="/smartcontract">Upload</Link>
                    <Link className="menubutton" to="/funder">Funders</Link>
                    <Link className="menubutton" to="/profile">Profile</Link>
                </div>
                <Route exact path="/" component={Home}/>
                <Route path="/game" component={Game}/>
                <Route exact path="/smartcontract" component={SmartContract}/>
                <Route exact path="/funder" component={Funder}/>
                <Route exact path="/profile" component={Profile}/>

                <Route exact path="/game" component={GameLoader} />
                <Route exact path="/game/:ipfsHash" component={GameRenderer} />
                
                {/* <div className="">Footer</div> */}
            </div>
        );
    }
}
export default Menu