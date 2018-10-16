import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import './Game.css';

class Game extends Component {
    state = {
        intro: "Games",
        welcomeText: "Passive Aggressive Fighting Game"
    };

    render() {
        return (
            <div className="shape">
            <ReturnButton>{this.props}</ReturnButton>
               <h1 className="introText">{this.state.intro}</h1>
               <h2 className="introText">{this.state.welcomeText}</h2>
               <iframe className="game" src="index1.html" name="Game name" scrolling="no" frameBorder="1" height="650px"></iframe>
            </div>
        );
    }
}

export default Game;