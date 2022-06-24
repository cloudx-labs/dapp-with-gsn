import { ethers } from 'hardhat';
import { config as envConfig } from 'dotenv';

envConfig({ path: '.env.local' });

const forwarder = process.env.FORWARDER_ADDRESS as string;

async function main() {
  const Counter = await ethers.getContractFactory('Counter');
  const initValue = 0;
  const counterContract = await Counter.deploy(initValue, forwarder);
  await counterContract.deployed();
  console.log('Counter deployed to:', counterContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
