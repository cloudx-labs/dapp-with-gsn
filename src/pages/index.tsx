import type { NextPage } from 'next';
import { Flex, HStack, Heading } from '@chakra-ui/react';
import WalletConnector from 'components/wallet-connector';
import Counter from 'components/counter';
import useCounter from 'hooks/useCounter';

import { useGsn } from 'hooks/useGsn';
import { useContext } from 'react';
import { GlobalContext } from 'contexts/global';

const Home: NextPage = () => {
  const ctx = useContext(GlobalContext);
  const jeje = ctx && useGsn(ctx?.contractHandler);

  const { onIncrement, onDecrement, value } = useCounter();

  return (
    <Flex p="2rem 20rem" flexDir="column" justify="center">
      <HStack>
        {/* <GsnInfo /> */}
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
      <Counter onIncrement={onIncrement} onDecrement={onDecrement} value={value} />
    </Flex>
  );
};

export default Home;
