import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './UploaderTable.css';

class UploaderTable extends Component {
    render() {
        return (
          <div>
            <Table striped bordered className="tableSize">
              <thead >
                <tr>
                  <th className="tableText halfSize">Tx Receipt Category</th>
                  <th className="tableText halfSize">Values</th>
                </tr>
              </thead>
              <tbody className="tableText">
                <tr>
                  <td>IPFS Hash # stored on Eth Contract</td>
                  <td>{this.props.ipfsHash}</td>
                </tr>
                <tr>
                  <td>Ethereum Contract Address</td>
                  <td>{this.props.ethAddress}</td>
                </tr>
                <tr>
                  <td>Tx Hash # </td>
                  <td>{this.props.transactionHash}</td>
                </tr>
                <tr>
                  <td>Block Number # </td>
                  <td>{this.props.blockNumber}</td>
                </tr>
                <tr>
                  <td>Gas Used</td>
                  <td>{this.props.gasUsed}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        );
    }
}

export default UploaderTable;