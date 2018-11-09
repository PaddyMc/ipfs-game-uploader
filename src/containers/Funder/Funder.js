import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Helmet from 'react-helmet';
import './Funder.css';

import FunderDetails from '../../components/FunderDetails/FunderDetails';

class Funder extends Component {
    state = {
        intro: "Funders",
        welcomeText: "",
    };

    render() {
        return (
            <div className="">
                <Helmet title={this.state.intro} />
                <ReturnButton>{this.props}</ReturnButton>
                <h1 className="introText">
                    {this.state.intro}
                </h1>
                <FunderDetails />
            </div>
        );
    }
}

export default Funder;