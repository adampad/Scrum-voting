import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // accounts: {
      //   mnemonic: process.env.SEED_PHRASE,
      // },
      chainId: 1337,
    },
  },
  solidity: "0.8.24",
};

export default config;
