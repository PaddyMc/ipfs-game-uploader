import Web3 from 'web3';

let web3 = null

if (window.ethereum) {
    try {
        window.ethereum.enable();
        web3 = new Web3(window.ethereum);
    } catch (error) {
        
    }
}
else if (window.web3) {
    if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}
else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default web3;