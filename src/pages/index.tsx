import type { NextPage } from 'next';
import { Flex, HStack, Heading } from '@chakra-ui/react';
import Counter from 'components/counter';
import useCounter from 'hooks/useCounter';

const Home: NextPage = () => {
  const { onIncrement, onDecrement, counterValue } = useCounter();

  return (
    <Flex p="2rem 20rem" flexDir="column" justify="center">
      <Heading
        as="h2"
        fontSize="2.25rem"
        mb={8}
        mt={20}
        fontWeight={400}
        alignSelf="center"
        color="green.500"
      >
        meta-tx using EIP 2771
      </Heading>
      <Counter onIncrement={onIncrement} onDecrement={onDecrement} value={counterValue} />
    </Flex>
  );
};

export default Home;
