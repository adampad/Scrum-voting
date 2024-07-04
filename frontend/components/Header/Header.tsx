import React from "react";
import { Heading, Stack, Text } from "native-base";
import { styles } from "./HeaderStyles";

type HeaderProps = {
  totalBalance: number;
  remainingVotes: number;
};

const Header = ({ totalBalance, remainingVotes }: HeaderProps) => {
  // TODO: totalBalance value should be replaced with the actual balance of a given address

  return (
    <section style={styles.header}>
      <Heading ml={40}>Scrum voting</Heading>

      <Stack display="flex" direction="row" mr={2}>
        <Text fontSize="1.5rem" style={styles.remainingVotesContainer}>
          Remaining votes: {remainingVotes}
        </Text>

        <Text fontSize="1.5rem" style={styles.totalBalaceContainer}>
          Balance: {totalBalance} ether
        </Text>
      </Stack>
    </section>
  );
};

export default Header;
