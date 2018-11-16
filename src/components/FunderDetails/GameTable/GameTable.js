import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GameTable.css';
import Web3 from 'web3';

class GameTable extends Component {
  render() {
    const {
      header,
      tableHeader,
      sortedGameFundedData
    } = this.props
    
    return (
      <div>
        <p>{header}</p>
        <Table className="tableSize">
        <thead >
          <tr>
            <th className="halfSize">{tableHeader}</th>
            <th className="halfSize">Amount Funded</th>
          </tr>
        </thead>
        <tbody className="">
        {
          sortedGameFundedData.map((gameData, index) => {
            let output = 
              <tr key={index}>
                <td>
                  <Link to={ { pathname: `/game/${gameData.gameHash}` } }>
                    {gameData.gameHash}
                  </Link>
                </td>
                <td> { (gameData.gameFundedData) ?
                      (Web3.utils.fromWei(gameData.gameFundedData , "ether")) : null
                } Eth </td>
              </tr> 
            return output
          })
        }
        </tbody>
        </Table> 
        <hr /> 
      </div>
    );
  }
}

export default GameTable;