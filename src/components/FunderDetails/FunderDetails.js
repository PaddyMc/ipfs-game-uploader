import React, { Component } from 'react';
import './FunderDetails.css';
import FunderTable from './FunderTable/FunderTable';
import FunderTotals from './FunderTotals/FunderTotals';

class FunderDetails extends Component {
  render() {
    return (
      <div className="">
        <FunderTotals
          numberOfFunders={this.props.numberOfFunders}
          totalAmountFunded={this.props.totalAmountFunded}
        />
        <FunderTable header="Top Funder" funders={[this.props.topFunder]} />
        <FunderTable header="All Top Funders" funders={this.props.allFunders} />
      </div>
    );
  }
}

export default FunderDetails;