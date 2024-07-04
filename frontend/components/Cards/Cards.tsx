import {
  AspectRatio,
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Alert,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { ProposedCard, Voter } from "../../utils/global-types";
import {
  PROPOSED_CARDS_OPTIONS,
  TOTAL_VOTES,
} from "../../utils/global-constants";
import { GLOBAL_LABELS } from "../../utils/global-labels";

export type CardsProps = {
  proposedCards: ProposedCard[];
  totalVoterCount: number;
  isValidVoterAddress: boolean;
  isVotingFinished: boolean;
  isOwnerAddress: boolean;
  handleUserVote: (proposalId: string) => void;
};

const defaultProposalVotes = new Map<string, number>([
  [PROPOSED_CARDS_OPTIONS[0].cardName, 0],
  [PROPOSED_CARDS_OPTIONS[1].cardName, 0],
  [PROPOSED_CARDS_OPTIONS[2].cardName, 0],
]);

const Cards = ({
  proposedCards,
  isOwnerAddress,
  totalVoterCount,
  isVotingFinished,
  isValidVoterAddress,
  handleUserVote,
}: CardsProps) => {
  const toast = useToast();
  const [proposalVotes, setProposalVotes] = useState(defaultProposalVotes);
  const disableVotingButton =
    !isValidVoterAddress ||
    isVotingFinished ||
    isOwnerAddress ||
    totalVoterCount === TOTAL_VOTES;

  useEffect(() => {
    if (totalVoterCount === TOTAL_VOTES - 1)
      toast.show({
        title: GLOBAL_LABELS.GENERAL.RemainingVotes,
        placement: "top",
        description: GLOBAL_LABELS.Warning.OneVoteRemains,
        duration: 6000,
      });
  }, [totalVoterCount]);

  useEffect(() => {
    // reset back to default if the application is finished due to reset or declare winner or destroy
    setProposalVotes(defaultProposalVotes);
  }, [isVotingFinished]);

  const handleVoteProposal = (cardName: string, proposalId: number) => {
    const updateProposalVotesMap = new Map(proposalVotes);

    updateProposalVotesMap.set(
      cardName,
      (updateProposalVotesMap.get(cardName) || 0) + 1
    );

    setProposalVotes(updateProposalVotesMap);

    handleUserVote(proposalId.toString());
  };

  return (
    <>
      {proposedCards.map(({ cardName, imagePath }, index) => (
        <Box alignItems="center" mr={5}>
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
          >
            <Box>
              <AspectRatio w="100%">
                <Image
                  source={{
                    uri: imagePath,
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack
                space={2}
                direction="row"
                alignContent="center"
                justifyContent="space-evenly"
              >
                <Heading size="md" ml="-1">
                  {cardName}
                </Heading>
                <Heading size="md">{proposalVotes.get(cardName)}</Heading>
              </Stack>
              <Button
                isDisabled={disableVotingButton}
                width="300px"
                onPress={() => handleVoteProposal(cardName, index)}
              >
                Vote
              </Button>
            </Stack>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Cards;
