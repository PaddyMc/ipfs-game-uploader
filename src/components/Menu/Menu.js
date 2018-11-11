import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Routes from '../Routes/Routes'

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
                <Routes />
            </div>
        );
    }
}
export default Menu