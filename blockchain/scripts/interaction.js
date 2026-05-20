const hre = require("hardhat");

/**
 * Example Smart Contract Interaction Methods
 * 
 * Run using: 
 * npx hardhat run scripts/interaction.js --network ganache
 * 
 * NOTE: Set `CONTRACT_ADDRESS` to the actual deployed output 
 * from scripts/deploy.js first!
 */

const CONTRACT_ADDRESS = "0xYourDeployedGanacheContractAddressHere"; // Replace This!

async function main() {
  if(CONTRACT_ADDRESS === "0xYourDeployedGanacheContractAddressHere") {
      console.warn("⚠️  WARNING: Please deploy the contract first and set CONTRACT_ADDRESS in this file.");
      return;
  }

  const [manufacturer, distributor, retailer] = await hre.ethers.getSigners();
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  const contract = SupplyChain.attach(CONTRACT_ADDRESS);

  // Enum Mapping for reference
  const State = {
       Registered: 0,
       Shipped: 1,
       InTransit: 2,
       Received: 3,
       Sold: 4
  }

  // --- INTERACTION 1: Register Product ---
  console.log("\n--- Registering Product ---");
  const batchId = "BATCH-90210";
  const pName = "High-Quality Coffee Beans";
  
  // Send the transaction
  const tx1 = await contract.connect(manufacturer).registerProduct(pName, batchId);
  await tx1.wait(); // Wait for block confirmation
  console.log(`Product Registered by Manufacturer (${manufacturer.address}) in transaction: ${tx1.hash}`);

  // We know it's ID 1 if it's the first one, but normally we'd parse the 'ProductRegistered' event
  const productId = 1; 


  // --- INTERACTION 2: Track Product Lifecycle ---
  console.log("\n--- Checking Current State ---");
  let track = await contract.getProductTrack(productId);
  console.log(`Current Owner: ${track.currentOwner}`);
  console.log(`Current State (Enum Number): ${track.state}`);


  // --- INTERACTION 3: Transfer Ownership ---
  console.log("\n--- Transferring Ownership ---");
  // Manufacturer transfers to Distributor, setting state to "Shipped" (index 1)
  const tx2 = await contract.connect(manufacturer).transferOwnership(productId, distributor.address, State.Shipped);
  await tx2.wait();
  console.log(`Ownership transferred to Distributor (${distributor.address})! Transaction hash: ${tx2.hash}`);

  // Track again!
  track = await contract.getProductTrack(productId);
  console.log("\n--- Newly Updated State ---");
  console.log(`New Owner: ${track.currentOwner}`);
  console.log(`New State: ${track.state}`);

  
  console.log("\n✅ Interactions complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
