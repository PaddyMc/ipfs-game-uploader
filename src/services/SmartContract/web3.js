//overrides metamask v0.2 for our 1.0 version. 

import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
//    } else {
//     // set the provider you want from Web3.providers
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//    }

export default web3;