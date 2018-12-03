import React from 'react';
import { Link } from 'react-router-dom';
import './UserGames.css';

const UserGames = props => {
  const {
    gameLocations
  } = props

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

export default UserGames;