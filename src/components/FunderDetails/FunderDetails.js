import React, { Component } from 'react';
import './FunderDetails.css';
import FunderTable from './FunderTable/FunderTable';
import GameTable from './GameTable/GameTable';

class FunderDetails extends Component {
  render() {
    const {
      numberOfFunders,
      totalAmountFunded,
      topFunder,
      allFunders,
      sortedGameFundedData,
    } = this.props
    
    return (
      <div className="">
        <FunderTable header="Totals" tableHeader="Total Funders" funders={[[numberOfFunders, totalAmountFunded]]} />
        <FunderTable header="Top Funder" tableHeader="Funder Address" funders={[topFunder]} />
        <FunderTable header="All Top Funders" tableHeader="Funder Addresses" funders={allFunders} />

        {/* <GameTable header="Totals" tableHeader="Total Games Funded" sortedGameFundedData={[[numberOfFunders, totalAmountFunded]]} /> */}
        {/* <GameTable header="Top Game" tableHeader="Game Location" sortedGameFundedData={[sortedGameFundedData[0]]} /> */}
        <GameTable header="All Top Games" tableHeader="Game Locations" sortedGameFundedData={sortedGameFundedData} />
      </div>
    );
  }
}

export default FunderDetails;