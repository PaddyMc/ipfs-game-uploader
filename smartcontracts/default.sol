pragma solidity ^0.4.17;

contract Contract {
    string[] allHashes;

    function sendHash(string ipfsHash) public {
        allHashes.push(ipfsHash);
    }
    
    function getHashByNum(uint number) public returns (string hash){
        return allHashes[number];
    }

    /*function getAllHashes() public returns (string[] allHashes){
        return allHashes;
    }*/
}