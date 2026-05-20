require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Default local node from hardhat
    hardhat: {},
    
    // Ganache Local Blockchain
    ganache: {
      url: "http://127.0.0.1:8545", // Ensure your Ganache RPC server is listening here
      chainId: 1337 // Default port & ID for Ganache Desktop/CLI
    }
  }
};
