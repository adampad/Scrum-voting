import { REGEX_ADDRESS } from "./global-constants";

export const isInputValidAddress = (address: string): boolean => {
  // check if input address satisfy the regex
  if (REGEX_ADDRESS.test(address)) return true;

  // address do not satisfy the regex
  return false;
};
