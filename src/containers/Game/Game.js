import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import GameLoader from '../../components/GameLoader/GameLoader';
import GameRenderer from '../../components/GameRenderer/GameRenderer';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './Game.css';

class Game extends Component {
    state = {
        intro: "Games",
        welcomeText: "Select a location and play a game",
    };

    componentWillMount = function () {
        //this.getTotalHashes()
    }

    getGame = (event) => {
        event.preventDefault();
        let input = Number(event.currentTarget.children[0].value)
        if(input <= this.state.numberOfGames && input > 0){
            this.getGameByNumber(event.currentTarget.children[0].value-1)
        }
        else{
            console.log("Tut tut tut...")
        }
    }

    getLatestGame = () => {
        this.getGameByNumber(this.state.numberOfGames-1);
    }

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
               <Router>
                    <div>
                        <Route exact path="/game" component={GameLoader}/>
                        <Route exact path="/game/:ipfsHash" component={GameRenderer}/>
                    </div>
               </Router>
            </div>
        );
    }
}

export default Game;