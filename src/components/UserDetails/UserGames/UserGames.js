import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserGames.css';

class UserGames extends Component {
  render() {
    const {
      gameLocations
    } = this.props
    return (
      <div>
        <div>
          Games:
        </div>
        {
          gameLocations.map((game, index) => {
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