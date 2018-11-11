import React, { Component } from 'react';
import Web3 from 'web3';
import './FunderTotals.css';

class FunderTotals extends Component {
  render() {
    return (
      <div>
        <p>Totals</p>
        <div className="funderDetailsHeader fullSize">
          <div className="halfSize">
            <h4>Number Of Funders</h4>
            <div className="topFunderText">{this.props.numberOfFunders}</div>
          </div>
          <div className="halfSize">
            <h4>Total Amount Funded</h4>
            <div>{Web3.utils.fromWei(this.props.totalAmountFunded , "ether")} Eth</div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

export default FunderTotals;