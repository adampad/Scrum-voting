import Web3 from "web3";
import web3 from "./web3";

export const fetchWalletAddressFromMetaMask = async (): Promise<string[]> => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Accounts now exposed
      const accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      console.error("User denied account access");
      throw new Error("User denied account access");
    }
  } else {
    console.error("MetaMask is not installed");
    throw new Error("MetaMask is not installed");
  }
};
