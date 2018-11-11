import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserGames.css';

class UserGames extends Component {
    render() {
        return (
          <div>
                <div>
                    Games:
                </div>
                {
                  this.props.gameLocations.map((game, index) => {
                      let output = 
                          <div key={index}>
                              <Link className="gameloader-link" to={ { pathname: `/game/${game}`, state: game } }>
                                  {game}
                              </Link>
                          </div> 
                      return output
                  })
                }
          </div>
        );
    }
}

export default UserGames;