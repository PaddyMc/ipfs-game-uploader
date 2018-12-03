import React from 'react';
import { Table } from 'react-bootstrap';
import './UploaderTable.css';

const UploaderTable = props => {
  const {
    ipfsHash,
    //ethAddress,
    transactionHash,
    blockNumber,
    //gasUsed
  } = props

  return (
    <div>
      <Table striped bordered className="tableSize">
        <thead >
          <tr>
            <th className="tableText halfSize">Tx Receipt</th>
            <th className="tableText halfSize">Values</th>
          </tr>
        </thead>
        <tbody className="tableText">
          <tr>
            <td>IPFS Hash</td>
            <td>{ipfsHash}</td>
          </tr>
          {/* <tr>
            <td>Ethereum Contract Address</td>
            <td>{ethAddress}</td>
          </tr> */}
          <tr>
            <td>Tx Hash</td>
            <td>{transactionHash}</td>
          </tr>
          <tr>
            <td>Block Number</td>
            <td>{blockNumber}</td>
          </tr>
          {/* <tr>
            <td>Gas Used</td>
            <td>{gasUsed}</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
    
}

export default UploaderTable;