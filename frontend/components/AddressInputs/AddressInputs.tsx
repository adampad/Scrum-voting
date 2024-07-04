import React, { useState } from "react";
import { styles } from "./AddressInputsStyles";
import { Box, Stack, Input, FormControl } from "native-base";

type AddressInputsProps = {
  ownerAddress: string;
  destroyContractState: boolean;
  currentAddress: string;
  handleChangeCurrentAddress: (currentAddress: string) => void;
};

const AddressInputs = ({
  ownerAddress,
  currentAddress,
  destroyContractState,
  handleChangeCurrentAddress,
}: AddressInputsProps) => {
  return (
    <Stack direction="row" style={styles.addressInputContainer}>
      <Box>
        <FormControl.Label>Owner's address</FormControl.Label>
        <Input
          width={400}
          type="text"
          size="lg"
          value={ownerAddress}
          isDisabled
        />
      </Box>

      <Box>
        <Input
          width={400}
          size="lg"
          type="text"
          defaultValue=""
          value={currentAddress}
          isDisabled={destroyContractState}
          onChangeText={handleChangeCurrentAddress}
          placeholder="Current address.."
        />
      </Box>
    </Stack>
  );
};

export default AddressInputs;
