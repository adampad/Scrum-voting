import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

let web3: Web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and MetaMask is running.
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider("http://localhost:8545");
  web3 = new Web3(provider);
}

export default web3;
