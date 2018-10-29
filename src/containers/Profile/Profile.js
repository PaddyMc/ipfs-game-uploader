import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Helmet from 'react-helmet';
import './Profile.css';

import web3 from '../../services/SmartContract/web3';

class Profile extends Component {
    state = {
        intro: "Profile",
        welcomeText: "",
        account: null
    };

    componentWillMount = () => {
        this.getProfileData()
    }

    getProfileData = async () => {
        let accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]})
    }

    render() {
        return (
            <div className="">
                <Helmet title={this.state.intro} />
                <ReturnButton>{this.props}</ReturnButton>
                <h1 className="introText">
                    {this.state.intro}
                </h1>
                <hr/>
                <h3 className="introText">
                    {this.state.account}
                </h3>
            </div>
        );
    }
}

export default Profile;