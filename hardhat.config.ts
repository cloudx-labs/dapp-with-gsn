import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import { config as envConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

envConfig({ path: '.env.local' });

const testchainUrl = process.env.TESTCHAIN_URL as string;
const testchainPrivateKey = process.env.TESTCHAIN_PRIVATE_KEY as string;
const testchainChainId = process.env.TESTCHAIN_CHAIN_ID as string;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    testchain: {
      url: testchainUrl,
      chainId: +testchainChainId,
      accounts: [testchainPrivateKey],
    },
  },
  paths: {
    sources: './src/contracts',
    cache: './cache',
    tests: './test',
    artifacts: './src/abis',
  },
};

export default config;
