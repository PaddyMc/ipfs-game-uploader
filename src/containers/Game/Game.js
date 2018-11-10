import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import GameLoader from '../../components/GameLoader/GameLoader';
import Helmet from 'react-helmet';

import './Game.css';

class Game extends Component {
    state = {
        intro: "Games",
        welcomeText: "Select a location and play a game",
    };

    render() {
        return (
            <div className="shape">
            <Helmet title={this.state.intro} />
                <ReturnButton>{this.props}</ReturnButton>
                <div className="">
                    <h1>{this.state.intro}</h1>
                </div>
               <hr/>
               <h3 className="">{this.state.welcomeText}</h3>
               {/* <GameLoader /> */}
            </div>
        );
    }
}

export default Game;