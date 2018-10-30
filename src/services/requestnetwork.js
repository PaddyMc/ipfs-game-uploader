import web3 from './SmartContract/web3';
import RequestNetwork, { Types } from '@requestnetwork/request-network.js';

const requestNetwork = new RequestNetwork({
    provider: web3.currentProvider,
    ethNetworkId: 4,
});

export default requestNetwork;