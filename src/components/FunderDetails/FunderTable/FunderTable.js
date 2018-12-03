import React from 'react';
import { Table } from 'react-bootstrap';
import './FunderTable.css';
import Web3 from 'web3';

const FunderTable = props => {
  const {
    header,
    tableHeader,
    funders
  } = props

  return (
    <div>
      <h4>{header}</h4>
      <Table striped bordered className="tableSize">
        <thead >
          <tr>
            <th className="halfSize">{tableHeader}</th>
            <th className="halfSize">Amount Funded</th>
          </tr>
        </thead>
        <tbody className="">
        {
          funders.map((funder, index) => {
            if(index < 10){
              let output = 
              <tr key={index}>
                <td>{funder[0]}</td>
                <td> { (funder[1]) ?
                      (Web3.utils.fromWei(funder[1] , "ether")) : null
                } Eth </td>
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

export default FunderTable;