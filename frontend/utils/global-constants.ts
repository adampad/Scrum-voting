import { ProposedCard } from "./global-types";
import Lottery from "./Lottery.json";

export const contractAbi = Lottery.abi;
export const ownerContractAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const REGEX_ADDRESS = /^(0x)?[0-9a-fA-F]{40}$/;

export const TOTAL_VOTES = 5;

export const PROPOSED_CARDS_OPTIONS: ProposedCard[] = [
  { cardName: "Elon", imagePath: "assets/Elon.jpg" },
  { cardName: "Mark", imagePath: "assets/Mark.jpg" },
  { cardName: "Sam", imagePath: "assets/Sam.jpg" },
];
