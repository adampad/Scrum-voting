import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LotteryModule = buildModule("LotteryModule", (module) => {
  // Deploy the Lottery contract
  const lottery = module.contract("Lottery", []);

  return { lottery };
});

export default LotteryModule;
