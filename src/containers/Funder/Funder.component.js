import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import FunderDetails from '../../components/FunderDetails/FunderDetails';
import Header from '../../components/Header/Header';
import Helmet from 'react-helmet';

import './Funder.css';

import PropTypes from 'prop-types'

class Funder extends Component {
  static propTypes = {
    intro: PropTypes.string,
    welcomeText: PropTypes.string,
    totalAmountFunded: PropTypes.string,
    topFunder: PropTypes.object,
    numberOfFunders: PropTypes.string,
    sortedGameFundedData: PropTypes.array,
    updateFunderData: PropTypes.func,
  }

  componentWillMount = () => {
    const { 
      updateFunderData,
      sortedGameFundedData,
      updateGameData
    } = this.props
    updateFunderData()
    if(sortedGameFundedData.length === 0){
      updateGameData()
    }
  }

  render() {
    const { 
      intro,
      welcomeText,
      numberOfFunders,
      totalAmountFunded,
      topFunder,
      allFunders,
      sortedGameFundedData
    } = this.props
    
    return (
      <div>
        <Helmet title={intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {intro}
          welcomeText = {welcomeText}
        />
        <FunderDetails 
          numberOfFunders={numberOfFunders}
          totalAmountFunded={totalAmountFunded}
          topFunder={topFunder}
          allFunders={allFunders}
          sortedGameFundedData={sortedGameFundedData}
        />
      </div>
    );
  }
}

export default Funder

