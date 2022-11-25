import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <Box maxW="container.lg" mx="auto" h="100vh" pb="20">
      <Flex alignItems="center" flexDirection="column" h="100%">
        <Header />
        <Content />
        <Footer />
      </Flex>
    </Box>
  );
}

export default App;
