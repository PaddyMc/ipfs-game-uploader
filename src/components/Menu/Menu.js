import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SmartContract from '../../containers/SmartContract/SmartContract';
import Game from '../../containers/Game/Game';
import Home from '../../containers/Home/Home';
import Profile from '../../containers/Profile/Profile';

import { Route } from 'react-router-dom'

class Menu extends React.Component {
    render() {    
        return (
            <div>
                <div className="menubar">
                    <Link className="menubutton" to="/">Home</Link>
                    <Link className="menubutton" to="/game">Game</Link>
                    <Link className="menubutton" to="/smartcontract">Upload</Link>
                    <Link className="menubutton" to="/profile">Profile</Link>
                </div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/smartcontract" component={SmartContract}/>
                <Route exact path="/game" component={Game}/>
                <Route exact path="/profile" component={Profile}/>
                
                {/* <div className="">Footer</div> */}
            </div>
        );
    }
}
export default Menu