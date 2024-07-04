import React from "react";
import { Box, Stack, Text, Button } from "native-base";
import { styles } from "./ActionButtonsStyles";
import ChangeOwnerButton from "./components/ChangeOwnerButton/ChangeOwnersDialog";

type ActionButtonsProps = {
  isSmartContractOwner: boolean;
  ownerAddress: string;
  destroyContractState: boolean;
  handleWithDraw: () => void;
  handleReset: () => void;
  handleDeclareWinner: () => void;
  hadleDestroy: () => void;
  handleChangeOwnersAddress: (newOwnerAddress: string) => void;
};

const ActionButtons = ({
  ownerAddress,
  destroyContractState,
  isSmartContractOwner,
  handleReset,
  hadleDestroy,
  handleWithDraw,
  handleDeclareWinner,
  handleChangeOwnersAddress,
}: ActionButtonsProps) => {
  return (
    <>
      <Stack style={styles.actionContainer}>
        <Stack alignItems="center" direction="column" space={5}>
          <Button
            width="100%"
            size="lg"
            isDisabled={!isSmartContractOwner || destroyContractState}
            onPress={handleWithDraw}
          >
            Withdraw
          </Button>

          <Button
            width="100%"
            size="lg"
            isDisabled={!isSmartContractOwner || destroyContractState}
            onPress={handleDeclareWinner}
          >
            Declare Winner
          </Button>

          <Button
            width="100%"
            size="lg"
            isDisabled={!isSmartContractOwner || destroyContractState}
            onPress={handleReset}
          >
            Reset
          </Button>

          <ChangeOwnerButton
            currentOwnerAddress={ownerAddress}
            destroyContractState={destroyContractState}
            isSmartContractOwner={isSmartContractOwner}
            handleChangeOwnersAddress={handleChangeOwnersAddress}
          />

          <Button
            width="100%"
            size="lg"
            colorScheme="secondary"
            isDisabled={!isSmartContractOwner || destroyContractState}
            onPress={hadleDestroy}
          >
            Destroy
          </Button>
        </Stack>

        {/* History container */}
        <Stack direction="column">
          <Button mb="5">History</Button>

          {[1, 2, 3, 4, 5].map((item) => (
            <>
              <Box key={item} p={4} bg="white" rounded="md" shadow={4} mb="4.5">
                <Text bold>{item}, Elon, 124</Text>
              </Box>
            </>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ActionButtons;
