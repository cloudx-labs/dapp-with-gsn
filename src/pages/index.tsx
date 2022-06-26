import type { NextPage } from 'next';
import { Flex, HStack, Heading } from '@chakra-ui/react';
import WalletConnector from 'components/wallet-connector';
import Counter from 'components/counter';
import { useGsn } from '@use-gsn';
import useCounter from 'hooks/useCounter';

const Home: NextPage = () => {
  const contractWithGsn = useGsn();
  const { onIncrement, onDecrement, counterState } = useCounter(contractWithGsn);

  return (
    <Flex p="2rem 20rem" flexDir="column" justify="center">
      <HStack>
        <WalletConnector />
      </HStack>
      <Heading
        as="h2"
        fontSize="2.25rem"
        mb={8}
        fontWeight={400}
        alignSelf="center"
        color="green.500"
      >
        meta-tx using EIP 2771
      </Heading>
      <Counter onIncrement={onIncrement} onDecrement={onDecrement} value={counterState} />
    </Flex>
  );
};

export default Home;
