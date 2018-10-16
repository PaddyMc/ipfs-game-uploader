import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SmartContract from '../../containers/SmartContract/SmartContract';
import Game from '../../containers/Game/Game';

import { BrowserRouter as Router, Route } from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {    
        return (
            <div>
                <div className="menubar">
                    <Link className="menubutton" to="/">Home</Link>
                    <Link className="menubutton" to="/game">Game</Link>
                    <Link className="menubutton" to="/smartcontract">Upload</Link>
                </div>
                
                <Route exact path="/smartcontract" component={SmartContract}/>
                <Route exact path="/game" component={Game}/>
                
                <div className="">Footer</div>
            </div>
        );
    }
}
export default Menu