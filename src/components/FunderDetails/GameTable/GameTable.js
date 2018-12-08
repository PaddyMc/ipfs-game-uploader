import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EthIcon from '../../EthIcon/EthIcon'
import './GameTable.css';
import Web3 from 'web3';

const GameTable = props => {
  const {
    header,
    tableHeader,
    sortedGameFundedData
  } = props
  
  return (
    <div>
      <h4>{header}</h4>
      <Table striped bordered>
        <thead >
          <tr>
            <th className="halfSize">{tableHeader}</th>
            <th className="halfSize">Amount Funded</th>
          </tr>
        </thead>
        <tbody className="">
        {
          sortedGameFundedData.map((gameData, index) => {
            if(index < 10) {
              let output = 
              <tr key={index}>
                <td>
                  <Link to={ { pathname: `/game/${gameData.gameHash}` } }>
                    {gameData.gameHash}
                  </Link>
                </td>
                <td> 
                  { 
                    (gameData.gameFundedData) ?
                        (
                          <EthIcon
                            amount={Web3.utils.fromWei(gameData.gameFundedData , "ether")}
                          />
                        ) : null
                  }
                </td>
              </tr> 
              return output
            }
            return null
          })
        }
        </tbody>
      </Table> 
      <hr /> 
    </div>
  );
}

export default GameTable;