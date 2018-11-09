import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './FunderTable.css';
import web3 from '../../../services/SmartContract/web3';

class FunderTable extends Component {
    render() {
        return (
            <div>
              <Table className="tableSize">
              <thead >
                <tr>
                  <th className="halfSize">Funder Address</th>
                  <th className="halfSize">Amount Funded</th>
                </tr>
              </thead>
              <tbody className="">
              {
                
                this.props.funders.map((funder, index) => {
                  let output = 
                    <tr key={index}>
                      <td>{funder[0]}</td>
                      {/* {web3.utils.fromWei(funder[1] , "ether")} */}
                      <td>{funder[1]} Eth</td>
                    </tr> 
                  return output
                })
              }
              </tbody>
              </Table>
            </div>
        );
    }
}

export default FunderTable;