import { FormControl, Modal, Button, Input } from "native-base";
import React, { useState } from "react";
import { isInputValidAddress } from "../../../../utils/helpers";
import { changeOwner } from "../../../../api/requests";
import { Alert } from "react-native";

type ChangeOwnerButtonProps = {
  isSmartContractOwner: boolean;
  destroyContractState: boolean;
  currentOwnerAddress: string;
  handleChangeOwnersAddress: (newOwnerAddress: string) => void;
};

const ChangeOwnerButton = ({
  currentOwnerAddress,
  destroyContractState,
  isSmartContractOwner,
  handleChangeOwnersAddress,
}: ChangeOwnerButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newOwnersAddress, setNewOwnersAddress] = useState("");
  const [hasErrorMessage, setHasErrorMessage] = useState("");

  const inputIsInvalid = hasErrorMessage !== "";

  const handleChangeOwnerInput = (input: string) => {
    setNewOwnersAddress(input);
    setHasErrorMessage("");
  };

  const hadnleSubmitForm = () => {
    if (!isInputValidAddress(newOwnersAddress)) {
      setHasErrorMessage("Invalid address format..");
      return;
    }

    // make the request to the network
    changeOwner(newOwnersAddress, currentOwnerAddress);
    handleChangeOwnersAddress(newOwnersAddress);

    // reset to default the state
    setShowModal(false);
    setNewOwnersAddress("");
    setHasErrorMessage("");
  };

  const handleCancelModal = () => {
    // reset to default the state
    setShowModal(false);
    setNewOwnersAddress("");
    setHasErrorMessage("");
  };

  return (
    <>
      <Button
        width="100%"
        size="lg"
        isDisabled={!isSmartContractOwner || destroyContractState}
        onPress={() => setShowModal(true)}
      >
        Change Owner
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Change owner's address</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={inputIsInvalid}>
              <FormControl.Label>New owner's wallet address</FormControl.Label>
              <Input
                placeholder="new address.."
                type="text"
                value={newOwnersAddress}
                onChangeText={handleChangeOwnerInput}
              />
              {inputIsInvalid && (
                <FormControl.ErrorMessage>
                  {hasErrorMessage}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleCancelModal}
              >
                Cancel
              </Button>
              <Button isDisabled={inputIsInvalid} onPress={hadnleSubmitForm}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ChangeOwnerButton;
