const hre = require("hardhat");

async function main() {
  console.log("Preparing to deploy to Ganache/local blockchain...");

  // Compile the smart contracts (if not done yet)
  await hre.run("compile");

  // Load the ContractFactory
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");

  console.log("Deploying SupplyChain contract...");
  
  // Deploy the contract wrapper instance
  const supplyChain = await SupplyChain.deploy();
  
  // Await blocks until successfully confirmed on chain
  await supplyChain.waitForDeployment();

  const address = await supplyChain.getAddress();

  console.log("-----------------------------------------");
  console.log(`✅ SupplyChain deployed successfully to: ${address}`);
  console.log("-----------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
