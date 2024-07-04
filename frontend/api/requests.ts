import { Alert } from "react-native";
import { contractAbi, ownerContractAddress } from "../utils/global-constants";
import Web3 from "web3";
import { useToast } from "native-base";
import { GLOBAL_LABELS } from "../utils/global-labels";

const web3 = new Web3(window.ethereum);
const lotteryContract = new web3.eth.Contract(
  contractAbi,
  ownerContractAddress
);

export const changeOwner = async (
  newOwnerAddress: string,
  currentOwnerAddress: string
) => {
  const toast = useToast();
  try {
    await lotteryContract.methods.changeOwner(newOwnerAddress).send({
      from: currentOwnerAddress,
      gas: "40000", // Set slightly higher than estimated
    });

    toast.show({
      title: GLOBAL_LABELS.Error.ErrorRequest,
      placement: "top",
      description: GLOBAL_LABELS.Error.OwnerChanged,
      duration: 12000,
    });
    console.log("After the toast");
  } catch (error: any) {
    Alert.alert("Error changing owner");
    console.error("Error changing owner", error);
    throw error;
  }
};

export const voteProposal = async (
  currentOwnerAddress: string,
  proposalId: string
) => {
  try {
    const gasEstimate = await lotteryContract.methods
      .voteProposal(proposalId)
      .estimateGas({
        from: currentOwnerAddress,
        value: web3.utils.toWei("0.01", "ether"),
      });

    console.log("gasEstimate = ", gasEstimate);

    const result = await lotteryContract.methods.voteProposal(proposalId).send({
      from: currentOwnerAddress,
      gas: gasEstimate.toString(),
      value: web3.utils.toWei("0.01", "ether"),
    });

    console.log("result = ", result);
  } catch (error: any) {
    Alert.alert("Error changing owner");
    console.error("Error voting..", error);
    throw error;
  }
};

export const registerUser = async (
  voterAddress: string,
  contractOwnwer: string
) => {
  try {
    const gasEstimate = await lotteryContract.methods
      .registerVoter(voterAddress)
      .estimateGas({
        from: contractOwnwer,
      });

    await lotteryContract.methods.registerVoter(voterAddress).send({
      from: contractOwnwer,
      gas: gasEstimate.toString(),
    });
  } catch (error) {
    console.error("Error registering voter:", error);
  }
};

export const destroyContract = async (ownerContract: string) => {
  try {
    const gasEstimate = await lotteryContract.methods.destroy().estimateGas({
      from: ownerContract,
    });

    await lotteryContract.methods.destroy().send({
      from: ownerContract,
      gas: gasEstimate.toString(),
    });
  } catch (error: any) {
    Alert.alert("Error changing owner");
    console.error("Error voting..", error);
    throw error;
  }
};

export const getAccountBalance = async (ownerContract: string) => {
  try {
    const gasEstimate = await lotteryContract.methods.destroy().estimateGas({
      from: ownerContract,
    });

    const balance = await lotteryContract.methods.getBalance().send({
      from: ownerContract,
      gas: gasEstimate.toString(),
    });

    console.log("balance = ", balance);
  } catch (error: any) {
    Alert.alert("Error changing owner");
    console.error("Error voting..", error);
    throw error;
  }
};
