import React, { Component } from 'react';
import './FunderDetails.css';
import FunderTable from './FunderTable/FunderTable';
import gametracker from '../../services/SmartContract/gametracker';
import web3 from '../../services/SmartContract/web3';

class FunderDetails extends Component {
    state = {
        totalAmountFunded: "",
        topFunder: "",
        numberOfFunders: "",
        allFunders: [],
    };

    componentWillMount = () => {
        this.getAmountFunded()
    }

    getAmountFunded = async (event) => {
        const [accounts] = await web3.eth.getAccounts();
        let promises = []

        promises.push(gametracker.methods.getTotalAmountFunded().call({
            from: accounts
        }))
        promises.push(gametracker.methods.getTopFunder().call({
            from: accounts
        }))
        promises.push(gametracker.methods.getNumberOfFunders().call({
            from: accounts
        }))

        Promise.all(promises).then((data) => {
            this.setState({totalAmountFunded: data[0]})
            this.setState({topFunder: data[1]})
            this.setState({numberOfFunders: data[2]})
            this.getAllFunders()
        })
    }

    getAllFunders = async () => {
        const [accounts] = await web3.eth.getAccounts();
        let promises = []

        for(let i = 0; i < this.state.numberOfFunders; i++){
            promises.push(gametracker.methods.getFunderDataByNum(i).call({
                from: accounts
            }))
        }

        Promise.all(promises).then((data) => {
            this.setState({allFunders: data})
            console.log(data)
        })

    }

    render() {
        return (
            <div className="">
                <hr/>
                <p>Totals</p>
                <div className="funderDetailsHeader fullSize">
                  <div className="halfSize">
                    <h4>Number Of Funders</h4>
                    <div className="topFunderText">{this.state.numberOfFunders}</div>
                  </div>
                  <div  className="halfSize">
                    <h4>Total Amount Funded</h4>
                    <div>{web3.utils.fromWei(this.state.totalAmountFunded , "ether")} Eth</div>
                  </div>
                </div>
                <hr/>
                <div>
                    <p>Top Funder</p>
                    <FunderTable funders={[this.state.topFunder]} />
                </div>
                <hr/>
                <div>
                    <p>All Top Funders</p>
                    <FunderTable funders={this.state.allFunders} />
                </div>
                
            </div>
        );
    }
}

export default FunderDetails;