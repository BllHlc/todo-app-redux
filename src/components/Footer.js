import React from 'react';
import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      w="100%"
      mt="auto"
      justifyContent="center"
      flexDirection={["column", "row"]}
      alignItems="center"
    >
      <Text fontSize="sm" color="gray.500" ml="3">
        Click to edit a todo
      </Text>
      <Text fontSize="sm" color="gray.500" ml="3">
        Created by{" "}
        <Link
          color="blue.500"
          href="https://www.linkedin.com/in/bilal-halici/"
          isExternal
        >
          Bilal Halici
        </Link>
      </Text>
      <Text fontSize="sm" color="gray.500" ml="3">
        Code on{" "}
        <Link color="blue.500" href="https://github.com/bllhlc" isExternal>
          Github
        </Link>
      </Text>
    </Flex>
  );
};

export default React.memo(Footer);