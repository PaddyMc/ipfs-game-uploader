import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './FunderTable.css';
import Web3 from 'web3';

class FunderTable extends Component {
    render() {
        const {
          header,
          tableHeader,
          funders
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
              funders.map((funder, index) => {
                let output = 
                  <tr key={index}>
                    <td>{funder[0]}</td>
                    <td> { (funder[1]) ?
                          (Web3.utils.fromWei(funder[1] , "ether")) : null
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

export default FunderTable;